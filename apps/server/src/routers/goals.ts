import { Goal } from '@solid/interfaces/goals'
import { Request, Response, Router } from 'express'
import { shareRouter } from './share' 

const goalRouter = Router()
goalRouter.use('/share', shareRouter)

goalRouter.put('/', async (req: Request, res: Response) => {
    const { goalService } = req
    const { goal } = req.body as { goal: Partial<Goal> }
    const { title, viewers } = goal
    
    if (!title || title.length < 3) return res.status(400).json({ message: "Title must be at least 3 characters long" })
    
    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })
    
    try {
        const record = await goalService.create({
            owner: req.pb.authStore.model.id as string,
            title: title,
            viewers: viewers ?? []
        })
        return res.status(201).json({ createdRecord: record })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }
})

goalRouter.get('/:id', async (req: Request, res: Response) => {
    const { goalService } = req
    const { id } = req.params

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const goalRecord = await goalService.get(id)
        return res.status(200).json({ goalRecord })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }

})

goalRouter.get('/', async (req: Request, res: Response) => {
    const { goalService } = req

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const goalList = await goalService.getList({ limit: 10 })
        return res.status(200).json(goalList)
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }

})

goalRouter.post('/:id', async (req: Request, res: Response) => {
    const { goalService } = req
    const { goal } = req.body as { goal: Partial<Goal> }
    const { id } = req.params
    const { title, viewers, owner } = goal

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const updatedRecord = await goalService.update(id, { title, viewers, owner })
        return res.status(201).json({ updatedRecord })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }

})

goalRouter.delete('/:id', async (req: Request, res: Response) => {
    const { goalService } = req
    const { id } = req.params

    if (!req.pb.authStore.model?.id) return res.status(401).json({ message: "Unauthorized" })

    try {
        const deleted = await goalService.delete(id)
        return res.status(200).json({ deleted })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }
})

export {
    goalRouter
}