import { Router } from 'express'
import { generateRandomUrlSafeToken } from '@solid/utils'

const { BASE_URL } = process.env;

export const shareRouter = Router()

shareRouter.post('/send', async (req, res) => {
    const user = req.pb.authStore.model;
    const { calendarService, emailService } = req;
    const { calendarId, shareWithEmail } = req.body;

    if (!user) return res.status(401).json({ message: "Unauthorized" })

    try {
        const result = await calendarService.createShareRequest(calendarId, shareWithEmail);

        const link = `${BASE_URL}/api/calendars/share/accept?secret_key=${result.secret_key}&shareRequestId=${result.id}`

        const emailSendResult = await emailService.sendEmail(shareWithEmail, "Share Request", `Click this link to accept the share request: ${link}`)

        if (!emailSendResult.success) return res.status(500).json({ message: "Failed to send email" });

        return res.status(200).json({ message: "Share request sent" })

    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }
})

shareRouter.get('/accept', async (req, res) => {
    const { admin } = req
    const { secret_key: secretKey, shareRequestId } = req.query;

    if (!secretKey || !shareRequestId) return res.status(400).json({ message: "Missing token or share request id" })

    try {
        const result = await admin.calendarService.acceptShareRequest(shareRequestId as string, secretKey as string);

        return res.status(200).json({ message: "Share request accepted", calendar: result })
    } catch(error) {
        return res.status(500).json((error as any)?.response ?? {message: "Internal Server Error"})
    }
})