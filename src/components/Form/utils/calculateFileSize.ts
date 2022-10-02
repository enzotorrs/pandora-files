export function calculateFileSize(size: string, multiplier: string): number {
    const calculatedFileSize = Number(size) * Number(multiplier)
    return calculatedFileSize
}
