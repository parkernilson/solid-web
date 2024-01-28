import express, { Express, NextFunction, Request, RequestHandler, Response } from "express";
import dotenv from "dotenv";
import Client from 'pocketbase'
import bodyParser from "body-parser";
import { CalendarService, EntryService, EmailService } from "./services";
import { calendarRouter, entryRouter, authRouter } from "./routers";
import { SESv2Client } from "@aws-sdk/client-sesv2";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const DEV_LOCAL = process.env.DEV_LOCAL === 'true'
const POCKETBASE_URL = DEV_LOCAL ? 'http://localhost' : 'http://pocketbase'

const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL as string
const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD as string

app.use(bodyParser.json())

/** Set up the request object by loading necessary data and services */
const setup: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  req.pb = new Client(`${POCKETBASE_URL}:8090`)
  req.adminPb = new Client(`${POCKETBASE_URL}:8090`)
  await req.adminPb.admins.authWithPassword(PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD) 

  req.calendarService = new CalendarService(req.pb)
  req.entryService = new EntryService(req.pb)

  req.admin = {
    calendarService: new CalendarService(req.adminPb),
    entryService: new EntryService(req.adminPb)
  }

  // AWS services
  // Authorize here with a key (environment variable)
  const awsConfig = {
    region: 'us-west-1'
  }
  const sesClient = new SESv2Client(awsConfig)
  req.emailService = new EmailService(sesClient)


  // try to authenticate the user from cookie
  req.pb.authStore.loadFromCookie(req.headers.cookie ?? '')
  
  // if an authorization header is present, 
  // treat it like a JWT token for pocketbase and authenticate the user with it
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    req.pb.authStore.save(token)
  }

  req.pb.authStore.onChange(() => {
    res.setHeader('set-cookie', req.pb.authStore.exportToCookie())
  })

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    if (req.pb.authStore.isValid) await req.pb.collection('users').authRefresh()
  } catch (_) {
    // clear the auth store on failed refresh
    req.pb.authStore.clear()
  }

  next()
}
app.use(setup)

app.use('/api/auth', authRouter)
app.use('/api/calendars', calendarRouter)
app.use('/api/entries', entryRouter)

app.all('*', (req: Request, res: Response) => {
  return res.status(404).json({ message: 'Not Found' })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});