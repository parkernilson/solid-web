import Client from 'pocketbase'
import type { Entry, EntryRecord } from '@solid/interfaces/calendars'

export type ListOptions = {
    limit?: number,
    calendar?: string
}

export class EntryService {
    private pb: Client

    constructor(pb: Client) {
        this.pb = pb
    }

    async create(entry: Entry) {
        return this.pb.collection('entries').create<EntryRecord>(entry)
    }

    async get(id: string) {
        return this.pb.collection('entries').getOne<EntryRecord>(id)
    }

    async getList({ limit, calendar }: ListOptions) {
        return this.pb.collection('entries').getList<EntryRecord>(0, limit, { filter: `calendar = '${calendar}'` })
    }

    async update(id: string, entry: Partial<Entry>) {
        return this.pb.collection('entries').update<EntryRecord>(id, entry)
    }

    async delete(id: string) {
        return this.pb.collection('entries').delete(id)
    }
}