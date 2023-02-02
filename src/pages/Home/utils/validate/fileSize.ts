import config from "../../../../config.json"

export function isValideSize(size: number) {
    console.log(size)
    const result = size > 0 && size <= config['file-size-limit-in-Gb'] * 1024
    return result
}

