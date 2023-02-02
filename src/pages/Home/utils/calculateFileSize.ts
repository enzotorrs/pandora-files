export function calculateFileSize(size: string, multiplier: string): number {
    if(multiplier === '' || size === ''){
        return 1
    }
    const calculatedFileSize = Number(size) * Number(multiplier)
    return calculatedFileSize
}
