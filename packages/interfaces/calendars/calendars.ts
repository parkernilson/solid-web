import { RecordModel } from 'pocketbase'

export type Calendar = {
    title: string,
    owner: string,
    viewers: string[],
}

export type CalendarRecord = RecordModel & Calendar