import { useState } from "react"
import axios from "axios"

import Select from "react-select"

import style from './Form.module.scss'
import { isValideSize } from "./utils/validate/fileSize"
import { Option } from "./types/option"
import { calculateFileSize } from "./utils/calculateFileSize"
import { useSnackbar } from "notistack"
import { downloadFile } from "./utils/download/file"

export function Form() {
    const fileTypeOptions: Option[] = [
        { value: ".txt", label: ".txt" },
        { value: ".jpeg", label: ".jpeg" },
        { value: ".mp4", label: ".mp4" },
        { value: ".mp3", label: ".mp3" }
    ]

    const quantitiesOptions: Option[] = [
        { value: "1", label: "MB" },
        { value: "1024", label: "GB" }
    ]

    const [fileName, setFileName] = useState<string>('')
    const [fileSize, setFileSize] = useState<string>('')
    const [downloadUrl, setDownloadUrl] = useState<string>('')
    const [fileType, setFileType] = useState<Option>(fileTypeOptions[0])
    const [quantitieSize, setQuantitieSize] = useState<Option>(quantitiesOptions[0])
    const { enqueueSnackbar } = useSnackbar();

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const calculetedFileSize = calculateFileSize(fileSize, quantitieSize.value)

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
            {downloadUrl && <button
                className={style.download_button}
                onClick={() => downloadFile(fileName, fileType.value, downloadUrl)}>download</button>}
            {!downloadUrl &&
                <form onSubmit={submitForm} className={style.form}>
                    <div className={style.wrapper}>
                        <div className={style.input_wrapper}>
                            <input
                                className={style.file_name_input}
                                value={fileName}
                                onChange={event => setFileName(event.target.value)}
                                type="text"
                                required
                                placeholder="Digite o nome do arquivo" />
                            <Select
                                value={fileType}
                                onChange={(option) => setFileType(option as Option)}
                                options={fileTypeOptions} />
                        </div>
                        <div className={style.input_wrapper}>
                            <input
                                type="number"
                                value={fileSize}
                                onChange={event => setFileSize(event.target.value)}
                                required
                                placeholder="Digite o tamanho do arquivo desejado" />
                            <Select
                                value={quantitieSize}
                                onChange={(option) => setQuantitieSize(option as Option)}
                                options={quantitiesOptions}
                            />
                        </div>
                    </div>
                    <div>
                        <button className={style.button} type="submit">Generate</button>
                    </div>
                </form>
            }
        </>
    )
}
