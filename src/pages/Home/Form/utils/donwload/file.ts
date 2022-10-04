import { AxiosResponse } from "axios";

export function donwloadFileFromAxios(response: AxiosResponse, fileName: string) {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', fileName);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
}
