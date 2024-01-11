import Client from 'pocketbase'
import type { Entry, EntryRecord } from '@solid/interfaces/calendars'

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

    async update(id: string, entry: Partial<Entry>) {
        return this.pb.collection('entries').update<EntryRecord>(id, entry)
    }

    async delete(id: string) {
        return this.pb.collection('entries').delete(id)
    }
}