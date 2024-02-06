import Client from 'pocketbase'
import type { Entry, EntryRecord } from '@solid/interfaces/goals'

export type ListOptions = {
    limit?: number,
    goal?: string
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

    async getList({ limit, goal }: ListOptions) {
        return this.pb.collection('entries').getList<EntryRecord>(0, limit, { filter: `goal = '${goal}'` })
    }

    async update(id: string, entry: Partial<Entry>) {
        return this.pb.collection('entries').update<EntryRecord>(id, entry)
    }

    async delete(id: string) {
        return this.pb.collection('entries').delete(id)
    }
}