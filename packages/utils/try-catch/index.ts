export const tryCatch = async <T>(p: Promise<T>) => {
    try {
        return [await p, null] as const
    } catch (error) {
        return [null, error] as const
    }
}