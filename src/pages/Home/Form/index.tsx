import style from './Form.module.scss'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { FormEventHandler } from 'react'

type formProps = {
    submitForm: FormEventHandler,
    fileType: string,
    fileName: string,
    fileSize: string,
    valueSize: string
    setFileName: any,
    setFileType: any,
    setFileSize: any,
    setValueSize: any
}

export function Form(props: formProps) {
    return (
        <form onSubmit={props.submitForm} className={style.form}>
            <div className={style.wrapper}>
                <div className={style.input_wrapper}>
                    <TextField
                        sx={{ backgroundColor: "#fff" }}
                        value={props.fileName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setFileName(event.target.value)}
                        label="File name"
                        required
                    />
                    <FormControl size="small" sx={{ minWidth: 80 }}>
                        <InputLabel id="fileTypeLabel">Type</InputLabel>
                        <Select
                            sx={{ backgroundColor: "#fff" }}
                            labelId="fileTypeLabel"
                            id="fileType"
                            value={props.fileType}
                            label="Type"
                            autoWidth
                            required
                            onChange={(event: SelectChangeEvent) => props.setFileType(event.target.value)}
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
                        value={props.fileSize}
                        type="number"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setFileSize(event.target.value)}
                        label="File size"
                        required
                    />
                    <FormControl size="small" sx={{ minWidth: 80 }}>
                        <InputLabel id="fileGLabel">Value</InputLabel>
                        <Select
                            sx={{ backgroundColor: "#fff" }}
                            labelId="fileGLabel"
                            id="fileG"
                            value={props.valueSize}
                            label="Value"
                            autoWidth
                            required
                            onChange={(event: SelectChangeEvent) => props.setValueSize(event.target.value)}
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
    )
}
