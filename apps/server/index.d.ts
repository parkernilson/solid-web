import Client from 'pocketbase'
import { CalendarService, EntryService } from "./src/services";

declare global {
    namespace Express {
        interface Request {
            pb: Client
            calendarService: CalendarService
            entryService: EntryService
        }
    }
}

export {}