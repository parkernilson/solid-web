import Client from 'pocketbase'
import { GoalService, EntryService, EmailService } from "./src/services";

declare global {
    namespace Express {
        interface Request {
            pb: Client
            adminPb: Client
            goalService: GoalService
            entryService: EntryService
            emailService: EmailService
            admin: {
                goalService: GoalService
                entryService: EntryService
            }
        }
    }
}

export {}