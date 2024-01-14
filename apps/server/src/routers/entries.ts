import { Request, Response, Router } from 'express'
import { Entry } from '@solid/interfaces/calendars'

const entryRouter = Router()

entryRouter.put('/', async (req: Request, res: Response) => {
    const { entryService } = req
    const { entry } = req.body as { entry: Partial<Entry> }
    const { title, calendar, text_content } = entry

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    if (!title || title.length < 3) return res.status(400).json({ message: "Title must be at least 3 characters long" })
    if (!calendar) return res.status(400).json({ message: "Calendar must be specified" })
    if (!text_content) return res.status(400).json({ message: "Text Content must be specified" })

    try {
        const record = await entryService.create({
            title,
            calendar,
            text_content
        })
        return res.status(201).json({ createdRecord: record })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }
})

entryRouter.get('/:id', async (req: Request, res: Response) => {
    const { entryService } = req
    const { id } = req.params

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const entryRecord = await entryService.get(id)
        return res.status(200).json({ entryRecord })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }
})

entryRouter.get('/', async (req: Request, res: Response) => {
    const { entryService } = req
    const { limit, calendar } = req.query

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const entryList = await entryService.getList({ 
            limit: Number(limit), 
            calendar: calendar as string 
        })
        return res.status(200).json(entryList)
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }
})

entryRouter.post('/:id', async (req: Request, res: Response) => {
    const { entryService } = req
    const { entry } = req.body as { entry: Partial<Entry> }
    const { id } = req.params
    const { title, calendar, text_content } = entry

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const record = await entryService.update(id, {
            title,
            calendar,
            text_content
        })
        return res.status(200).json({ updatedRecord: record })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }
})

entryRouter.delete('/:id', async (req: Request, res: Response) => {
    const { entryService } = req
    const { id } = req.params

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const deleted = await entryService.delete(id)
        return res.status(200).json({ deleted })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }
})

export {
    entryRouter
}