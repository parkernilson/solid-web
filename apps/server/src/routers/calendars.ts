import { Calendar } from '@solid/interfaces/calendars'
import { Request, Response, Router } from 'express'
import { shareRouter } from './share' 

const calendarRouter = Router()
calendarRouter.use('/share', shareRouter)

calendarRouter.put('/', async (req: Request, res: Response) => {
    const { calendarService } = req
    const { calendar } = req.body as { calendar: Partial<Calendar> }
    const { title, viewers } = calendar
    
    if (!title || title.length < 3) return res.status(400).json({ message: "Title must be at least 3 characters long" })
    
    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })
    
    try {
        const record = await calendarService.create({
            owner: req.pb.authStore.model.id as string,
            title: title,
            viewers: viewers ?? []
        })
        return res.status(201).json({ createdRecord: record })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }
})

calendarRouter.get('/:id', async (req: Request, res: Response) => {
    const { calendarService } = req
    const { id } = req.params

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const calendarRecord = await calendarService.get(id)
        return res.status(200).json({ calendarRecord })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }

})

calendarRouter.get('/', async (req: Request, res: Response) => {
    const { calendarService } = req

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const calendarList = await calendarService.getList({ limit: 10 })
        return res.status(200).json(calendarList)
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }

})

calendarRouter.post('/:id', async (req: Request, res: Response) => {
    const { calendarService } = req
    const { calendar } = req.body as { calendar: Partial<Calendar> }
    const { id } = req.params
    const { title, viewers, owner } = calendar

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const updatedRecord = await calendarService.update(id, { title, viewers, owner })
        return res.status(201).json({ updatedRecord })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }

})

calendarRouter.delete('/:id', async (req: Request, res: Response) => {
    const { calendarService } = req
    const { id } = req.params

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const deleted = await calendarService.delete(id)
        return res.status(200).json({ deleted })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }
})

export {
    calendarRouter
}