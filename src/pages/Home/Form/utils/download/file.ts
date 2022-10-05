import axios, { AxiosResponse } from "axios";

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
                url: 'http://localhost:3003' + downloadUrl,
                method: 'GET',
                responseType: 'blob',
        }).then((response) => {
                const entireFileName = fileName + fileType;
                donwloadFileFromAxios(response, entireFileName);
        })
}

