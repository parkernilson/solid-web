import { RecordModel } from 'pocketbase'

export type Entry = {
    title: string,
    calendar: string,
    textContent: string
}

export type EntryRecord = RecordModel & Entry