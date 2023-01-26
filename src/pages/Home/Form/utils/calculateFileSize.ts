export function calculateFileSize(size: string, multiplier: string): number {
    if(multiplier === ''){
        return 1
    }
    const calculatedFileSize = Number(size) * Number(multiplier)
    return calculatedFileSize
}
