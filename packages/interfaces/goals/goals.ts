import { RecordModel } from 'pocketbase'

export type Goal = {
    title: string,
    owner: string,
    viewers: string[],
}

export type GoalRecord = RecordModel & Goal

export const isGoal = (obj: unknown): obj is Goal => {
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