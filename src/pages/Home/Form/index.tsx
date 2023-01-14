import { useState } from "react"
import axios from "axios"
import config from "../../../config.json"

import style from './Form.module.scss'
import { isValideSize } from "./utils/validate/fileSize"
import { calculateFileSize } from "./utils/calculateFileSize"
import { useSnackbar } from "notistack"
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { Loading } from "./Loading"

export function Form() {
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
                fileName: fileName+fileType
            })
                .then(response => {
                    setLoading(false)
                    setDownloadUrl(config["api-url"]+response.data.url)
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
            <Loading open={loading} />
            {downloadUrl && <Button
                href={downloadUrl}
                sx={{ height: "12em", width: "20em", margin: "auto auto" }}
                variant="contained"
                onClick={handleDownloadButton}
                >download</Button>}
            {!downloadUrl &&
                <form onSubmit={submitForm} className={style.form}>
                    <div className={style.wrapper}>
                        <div className={style.input_wrapper}>
                            <TextField
                                sx={{ backgroundColor: "#fff" }}
                                value={fileName}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFileName(event.target.value)}
                                label="File name"
                                required
                            />
                            <FormControl size="small" sx={{ minWidth: 80 }}>
                                <InputLabel id="fileTypeLabel">Type</InputLabel>
                                <Select
                                    sx={{ backgroundColor: "#fff" }}
                                    labelId="fileTypeLabel"
                                    id="fileType"
                                    value={fileType}
                                    label="Type"
                                    autoWidth
                                    required
                                    onChange={(event: SelectChangeEvent) => setFileType(event.target.value)}
                                >
                                    <MenuItem value={".txt"}>.txt</MenuItem>
                                    <MenuItem value={".png"}>.png</MenuItem>
                                    <MenuItem value={".jpeg"}>.jpeg</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={style.input_wrapper}>
                            <TextField
                                sx={{ backgroundColor: "#fff" }}
                                value={fileSize}
                                type="number"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFileSize(event.target.value)}
                                label="File size"
                                required
                            />
                            <FormControl size="small" sx={{ minWidth: 80 }}>
                                <InputLabel id="fileGLabel">Value</InputLabel>
                                <Select
                                    sx={{ backgroundColor: "#fff" }}
                                    labelId="fileGLabel"
                                    id="fileG"
                                    value={valueSize}
                                    label="Value"
                                    autoWidth
                                    required
                                    onChange={(event: SelectChangeEvent) => setValueSize(event.target.value)}
                                >
                                    <MenuItem value={1}>MB</MenuItem>
                                    <MenuItem value={1024}>GB</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div>
                        <Button variant="contained" type="submit">Generate</Button>
                    </div>
                </form>
            }
        </>
    )
}
