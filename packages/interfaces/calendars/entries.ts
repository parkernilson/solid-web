import { RecordModel } from 'pocketbase'

export type Entry = {
    title: string,
    calendar: string,
    text_content: string
}

export type EntryRecord = RecordModel & Entry

export const isEntry = (obj: unknown): obj is Entry => {
    return typeof obj === 'object'
        && obj !== null
        && 'title' in obj
        && typeof obj.title === 'string'
        && 'calendar' in obj
        && typeof obj.calendar === 'string'
        && 'text_content' in obj
        && typeof obj.text_content === 'string'
}