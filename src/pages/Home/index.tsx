import 'normalize.css'
import { Button } from '@mui/material';
import { useState } from 'react';
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

export function Home() {
    const [fileName, setFileName] = useState<string>('')
    const [fileSize, setFileSize] = useState<string>('')
    const [downloadUrl, setDownloadUrl] = useState<string>('')
    const [fileType, setFileType] = useState<string>('')
    const [valueSize, setValueSize] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
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
                .then(response => {
                    setLoading(false)
                    setDownloadUrl(config["files-url"] + response.data.url)
                    enqueueSnackbar("file has successfully generated", { variant: "success" })
                })
        }
        else {
            enqueueSnackbar(`file size needs to be greater than 0 and less than ${config["file-size-limit-in-Gb"]}GB`, { variant: "error" })
            setLoading(false)
        }
    }

    const handleDownloadButton = () => {
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
                {!downloadUrl &&
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
            </section>
            <Footer />
        </>
    )
}
