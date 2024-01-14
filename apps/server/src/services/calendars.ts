import Client from 'pocketbase'
import type { Calendar, CalendarRecord } from '@solid/interfaces/calendars'

type ListOptions = {
    limit?: number
}

export class CalendarService {
    private pb: Client

    constructor(pb: Client) {
        this.pb = pb
    }

    async create(calendar: Calendar) {
        return this.pb.collection('calendars').create<CalendarRecord>(calendar)
    }

    async get(id: string) {
        return this.pb.collection('calendars').getOne<CalendarRecord>(id)
    }

    async getList({ limit }: ListOptions) {
        return this.pb.collection('calendars').getList<CalendarRecord>(0, limit)
    }

    async update(id: string, calendar: Partial<Calendar>) {
        return this.pb.collection('calendars').update<CalendarRecord>(id, calendar)
    }

    async delete(id: string) {
        return this.pb.collection('calendars').delete(id)
    }
}