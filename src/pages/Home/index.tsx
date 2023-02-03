import 'normalize.css'
import { Button, ClickAwayListener } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
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
import { Processing } from './Processing';

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

    const [fileName, setFileName] = useState('')
    const [fileSize, setFileSize] = useState('')
    const [downloadUrl, setDownloadUrl] = useState('')
    const [fileType, setFileType] = useState('')
    const [valueSize, setValueSize] = useState('')
    const [loading, setLoading] = useState(false)
    const [fileSizeError, setFileSizeError] = useState(false)
    const [processing, setProcessing] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    const calculatedFileSize = useRef(0)

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (fileSizeError) {
            enqueueSnackbar(`file size needs to be greater than 0 and less than ${config["file-size-limit-in-Gb"]}GB`, { variant: "error" })
            setLoading(false)
            return
        }

        postFileRequest()

    }

    const postFileRequest = () => {
        setLoading(true)
        axios.post(`${config["api-url"]}/generate`, {
            size: calculatedFileSize.current,
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

    const updateCalculatedFileSize = (newFileSize = fileSize, newValueSize = valueSize) => {
        const newCalculetedFileSize = calculateFileSize(newFileSize, newValueSize)
        calculatedFileSize.current = newCalculetedFileSize
        setFileSizeError(!isValideSize(calculatedFileSize.current))

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
        updateCalculatedFileSize(newFileSize = newFileSize)
    }

    const handleOnChangeValueSize = (newValueSize: string) => {
        setValueSize(newValueSize)
        updateCalculatedFileSize(undefined, newValueSize = newValueSize)
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
                {processing && <Processing />}
            </section>
            <Footer />
        </>
    )
}
