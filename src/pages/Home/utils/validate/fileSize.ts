import config from "../../../../config"

export function isValideSize(size: number) {
    const result = size > 0 && size <= config['file-size-limit-in-Gb'] * 1024
    return result
}

