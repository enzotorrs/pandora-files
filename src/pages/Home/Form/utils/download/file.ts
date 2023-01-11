import axios, { AxiosResponse } from "axios";
import config from "../../../../../config.json"

function donwloadFileFromAxios(response: AxiosResponse, fileName: string) {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', fileName);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
}

export function downloadFile(fileName: string, fileType: string, downloadUrl: string){
        axios({
                url: config["api-url"] + downloadUrl,
                method: 'GET',
                responseType: 'blob',
        }).then((response) => {
                const entireFileName = fileName + fileType;
                donwloadFileFromAxios(response, entireFileName);
        })
}

