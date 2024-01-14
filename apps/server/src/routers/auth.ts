import { tryCatch } from '@solid/utils'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/login', async (req, res) => {
    const { pb } = req
    const { email, password } = req.body

    try {
        const result = await pb.collection('users').authWithPassword(email, password)
        return res.status(200).json({ authRecord: result.record })
    } catch (error) {
        // TODO: handle the login fail error cases
        return res.status(500).send({ message: (error as any)?.response ?? "Internal Server Error" })
    }
})

authRouter.post('/logout', async (req, res) => {
    const { pb } = req

    pb.authStore.clear()

    return res.redirect('/')
})

authRouter.post('/register', async (req, res) => {
    const { pb } = req
    const { email, password } = req.body

    try {
        const result = await pb.collection('users').create({ email, password, passwordConfirm: password })
        return res.status(201).json({ authRecord: result })
    } catch (error) {
        return res.status(500).send({ message: (error as any)?.response ?? "Internal Server Error" })
    }

})

export {
    authRouter
}