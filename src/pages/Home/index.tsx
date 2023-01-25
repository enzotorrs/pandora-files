import 'normalize.css'
import { Button, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';

import style from './Home.module.scss'
import { Header } from '../../components/Header'
import { Form } from './Form'
import { Loading } from './Form/Loading';
import { Footer } from '../../components/Footer';
import { calculateFileSize } from './Form/utils/calculateFileSize';
import { isValideSize } from './Form/utils/validate/fileSize';
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
    const [processing, setProcessing] = useState<boolean>(false)
    const { enqueueSnackbar } = useSnackbar();

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const calculetedFileSize = calculateFileSize(fileSize, valueSize)
        setLoading(true)

        if (isValideSize(calculetedFileSize)) {
            axios.post(`${config["api-url"]}/generate`, {
                size: calculetedFileSize,
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

    return (
        <>
            <Header />
            <section className={style.container}>
                <Loading open={loading} />
                {downloadUrl && <Button
                    href={downloadUrl}
                    sx={{ height: "12em", width: "20em", margin: "auto auto" }}
                    variant="contained"
                    onClick={handleDownloadButton}
                >download</Button>}
                {!downloadUrl && !processing &&
                    <Form
                        submitForm={submitForm}
                        fileType={fileType}
                        fileName={fileName}
                        fileSize={fileSize}
                        valueSize={valueSize}
                        setFileSize={setFileSize}
                        setFileName={setFileName}
                        setValueSize={setValueSize}
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
