import { useState } from "react"
import axios from "axios"

import style from './Form.module.scss'
import { isValideSize } from "./utils/validate/fileSize"
import { calculateFileSize } from "./utils/calculateFileSize"
import { useSnackbar } from "notistack"
import { downloadFile } from "./utils/download/file"
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"

export function Form() {
    const [fileName, setFileName] = useState<string>('')
    const [fileSize, setFileSize] = useState<string>('')
    const [downloadUrl, setDownloadUrl] = useState<string>('')
    const [fileType, setFileType] = useState<string>('')
    const [valueSize, setValueSize] = useState<string>('')
    const { enqueueSnackbar } = useSnackbar();

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const calculetedFileSize = calculateFileSize(fileSize, valueSize)

        if (isValideSize(calculetedFileSize)) {
            axios.post('http://localhost:3003/generate', {
                size: calculetedFileSize,
            })
                .then(response => {
                    setDownloadUrl(response.data.url)
                    enqueueSnackbar("file has successfully generated", { variant: "success" })
                })
        }
        else {
            enqueueSnackbar("file size needs to be greater than 0 and less than 10GB", { variant: "error" })
        }
    }

    return (
        <>
            {downloadUrl && <Button
                sx={{height: "50%", width: "50%", margin: "auto auto"}}
                variant="contained"
                onClick={() => downloadFile(fileName, fileType, downloadUrl)}>download</Button>}
            {!downloadUrl &&
                <form onSubmit={submitForm} className={style.form}>
                    <div className={style.wrapper}>
                        <div className={style.input_wrapper}>
                            <TextField
                                value={fileName}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFileName(event.target.value)}
                                label="File name"
                                required
                            />
                            <FormControl sx={{ minWidth: 80 }}>
                            <InputLabel id="fileTypeLabel">Type</InputLabel>
                            <Select
                                labelId="fileTypeLabel"
                                id="fileType"
                                value={fileType}
                                label="Type"
                                autoWidth
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
                                value={fileSize}
                                type="number"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFileSize(event.target.value)}
                                label="File size"
                                required
                            />
                            <FormControl sx={{ minWidth: 80 }}>
                            <InputLabel id="fileGLabel">Value</InputLabel>
                            <Select
                                labelId="fileGLabel"
                                id="fileG"
                                value={valueSize}
                                label="Value"
                                autoWidth
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
