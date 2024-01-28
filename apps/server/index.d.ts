import Client from 'pocketbase'
import { CalendarService, EntryService, EmailService } from "./src/services";

declare global {
    namespace Express {
        interface Request {
            pb: Client
            adminPb: Client
            calendarService: CalendarService
            entryService: EntryService
            emailService: EmailService
            admin: {
                calendarService: CalendarService
                entryService: EntryService
            }
        }
    }
}

export {}