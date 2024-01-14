import express, { Express, NextFunction, Request, RequestHandler, Response } from "express";
import dotenv from "dotenv";
import Client from 'pocketbase'
import bodyParser from "body-parser";
import { CalendarService, EntryService } from "./services";
import { calendarRouter, entryRouter, authRouter } from "./routers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const DEV_LOCAL = process.env.DEV_LOCAL === 'true'
const POCKETBASE_URL = DEV_LOCAL ? 'http://localhost' : 'http://pocketbase'

app.use(bodyParser.json())

/** Set up the request object by loading necessary data and services */
const setup: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  req.pb = new Client(`${POCKETBASE_URL}:8090`)
  req.calendarService = new CalendarService(req.pb)
  req.entryService = new EntryService(req.pb)

  // load the store data from the request cookie string
  req.pb.authStore.loadFromCookie(req.headers.cookie ?? '')

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