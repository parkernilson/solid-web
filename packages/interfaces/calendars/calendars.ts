import { RecordModel } from 'pocketbase'

export type Calendar = {
    title: string,
    owner: string,
    viewers: string[],
}

export type CalendarRecord = RecordModel & Calendar

export const isCalendar = (obj: unknown): obj is Calendar => {
    return typeof obj === 'object' 
        && obj !== null 
        && 'title' in obj 
        && typeof obj.title === 'string'
        && 'owner' in obj 
        && typeof obj.owner === 'string'
        && 'viewers' in obj
        && Array.isArray(obj.viewers)
        && (obj.viewers.length === 0 || obj.viewers.every(v => typeof v === 'string'))
}