import { RecordModel } from 'pocketbase'

export type Entry = {
    title: string,
    goal: string,
    text_content: string
}

export type EntryRecord = RecordModel & Entry

export const isEntry = (obj: unknown): obj is Entry => {
    return typeof obj === 'object'
        && obj !== null
        && 'title' in obj
        && typeof obj.title === 'string'
        && 'goal' in obj
        && typeof obj.goal === 'string'
        && 'text_content' in obj
        && typeof obj.text_content === 'string'
}