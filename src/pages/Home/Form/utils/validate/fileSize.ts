export function isValideSize(size: number) {
    const result = size > 0 && size <= 10240
    return result
}

