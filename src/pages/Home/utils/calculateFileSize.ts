export function calculateFileSize(size: string, multiplier: string): number {
    if(Number(size) <= 0){
        return 0
    }
    if(multiplier === '' || size === ''){
        return 1
    }
    const calculatedFileSize = Number(size) * Number(multiplier)
    return calculatedFileSize
}
