import 'normalize.css'
import { Button, ClickAwayListener, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';

import style from './Home.module.scss'
import { Header } from '../../components/Header'
import { Form } from './Form'
import { Loading } from './Loading';
import { Footer } from '../../components/Footer';
import { calculateFileSize } from './utils/calculateFileSize';
import { isValideSize } from './utils/validate/fileSize';
import config from "../../config.json"
import io from 'socket.io-client'

const socket = io(config["socket-server-url"])

export function Home() {
    useEffect(() => {
        socket.on("finish_process", (message) => {
            if (message.error) {
                enqueueSnackbar("An error occured in file process, please try again later", { variant: "error" })
                resetPage()
                return
            }
            setProcessing(false)
            setDownloadUrl(config["files-url"] + message.url)
            enqueueSnackbar("Your file has ben generated successfully!", { variant: "success" })
        })
    }, [])

    const [fileName, setFileName] = useState<string>('')
    const [fileSize, setFileSize] = useState<string>('')
    const [downloadUrl, setDownloadUrl] = useState<string>('')
    const [fileType, setFileType] = useState<string>('')
    const [valueSize, setValueSize] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [fileSizeError, setFileSizeError] = useState<boolean>(false)
    const [processing, setProcessing] = useState<boolean>(false)
    const { enqueueSnackbar } = useSnackbar();

    let calculatedFileSize: number

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        if (!fileSizeError) {
            axios.post(`${config["api-url"]}/generate`, {
                size: calculatedFileSize,
                file_name: fileName + fileType
            })
                .then(() => {
                    setLoading(false)
                    setProcessing(true)
                    enqueueSnackbar("Your file is being generated", { variant: "info" })
                })
                .catch(() => {
                    setLoading(false)
                    enqueueSnackbar("An error occured trying generate your file, please try again", { variant: "error" })

                })
        }
        else {
            enqueueSnackbar(`file size needs to be greater than 0 and less than ${config["file-size-limit-in-Gb"]}GB`, { variant: "error" })
            setLoading(false)
        }
    }

    const updateCalculatedFileSize = (newFileSize=fileSize, newValueSize=valueSize) => {
        const newCalculetedFileSize = calculateFileSize(newFileSize, newValueSize)
        calculatedFileSize = newCalculetedFileSize
        setFileSizeError(!isValideSize(calculatedFileSize))

    }

    const handleDownloadButton = () => {
        resetPage();
    }

    const resetPage = () => {
        setDownloadUrl('')
        setFileName('')
        setFileSize('')
        setFileType('')
        setValueSize('')
    }

    const handleOnChangeFileSize = (newFileSize: string) => {
        setFileSize(newFileSize)
        updateCalculatedFileSize(newFileSize=newFileSize)
    }

    const handleOnChangeValueSize= (newValueSize: string)=>{
        setValueSize(newValueSize)
        updateCalculatedFileSize(undefined, newValueSize=newValueSize)
    }

    return (
        <>
            <Header />
            <section className={style.container}>
                <Loading open={loading} />
                {downloadUrl &&
                    <ClickAwayListener onClickAway={() => { resetPage() }}>
                        <Button
                            href={downloadUrl}
                            sx={{ height: "12em", width: "20em", margin: "auto auto" }}
                            variant="contained"
                            onClick={handleDownloadButton}
                        >download
                        </Button>
                    </ClickAwayListener>}
                {!downloadUrl && !processing &&
                    <Form
                        submitForm={submitForm}
                        fileType={fileType}
                        fileName={fileName}
                        fileSize={fileSize}
                        valueSize={valueSize}
                        fileSizeError={fileSizeError}
                        setFileSize={handleOnChangeFileSize}
                        setFileName={setFileName}
                        setValueSize={handleOnChangeValueSize}
                        setFileType={setFileType}
                    ></Form>
                }
                {processing && <div className={style.process}>
                    <p>Processing</p>
                    <LinearProgress />
                </div>}
            </section>
            <Footer />
        </>
    )
}
