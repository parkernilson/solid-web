import Client from "pocketbase";
import type { Calendar, CalendarRecord } from "@solid/interfaces/calendars";
import { generateRandomUrlSafeToken } from "@solid/utils";

type ListOptions = {
    limit?: number;
};

export class CalendarService {
    private pb: Client;

    constructor(pb: Client) {
        this.pb = pb;
    }

    async create(calendar: Calendar) {
        return this.pb.collection("calendars").create<CalendarRecord>(calendar);
    }

    async createShareRequest(calendarId: string, shareWithEmail: string) {
        const secretKey = generateRandomUrlSafeToken(32);
        return this.pb.collection("share_requests").create({
            calendar: calendarId,
            share_with_email: shareWithEmail,
            secret_key: secretKey,
        });
    }

    async acceptShareRequest(shareRequestId: string, secretKey: string) {
        const shareRequest = await this.pb
            .collection("share_requests")
            .getOne(shareRequestId);

        if (!shareRequest) throw new Error("Share request not found");

        if (shareRequest.secret_key !== secretKey)
            throw new Error("Invalid token");

        const calendar = await this.pb
            .collection("calendars")
            .getOne(shareRequest.calendar);

        if (!calendar) throw new Error("Calendar not found");

        const userToShareWith = await this.pb
            .collection("users")
            .getFirstListItem(`email = '${shareRequest.share_with_email}'`);

        if (!userToShareWith) throw new Error("User not found");

        calendar.viewers.push(userToShareWith.id);

        await this.pb.collection("calendars").update(calendar.id, calendar);
        await this.pb.collection("share_requests").delete(shareRequest.id);

        return calendar;
    }

    async get(id: string) {
        return this.pb.collection("calendars").getOne<CalendarRecord>(id);
    }

    async getList({ limit }: ListOptions) {
        return this.pb
            .collection("calendars")
            .getList<CalendarRecord>(0, limit);
    }

    async update(id: string, calendar: Partial<Calendar>) {
        return this.pb
            .collection("calendars")
            .update<CalendarRecord>(id, calendar);
    }

    async delete(id: string) {
        return this.pb.collection("calendars").delete(id);
    }
}
