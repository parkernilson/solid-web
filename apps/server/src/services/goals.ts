import Client from "pocketbase";
import type { Goal, GoalRecord } from "@solid/interfaces/goals";
import { generateRandomUrlSafeToken } from "@solid/utils";

type ListOptions = {
    limit?: number;
};

export class GoalService {
    private pb: Client;

    constructor(pb: Client) {
        this.pb = pb;
    }

    async create(goal: Goal) {
        return this.pb.collection("goals").create<GoalRecord>(goal);
    }

    async createShareRequest(goalId: string, shareWithEmail: string) {
        const secretKey = generateRandomUrlSafeToken(32);
        return this.pb.collection("share_requests").create({
            goal: goalId,
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

        const goal = await this.pb
            .collection("goals")
            .getOne(shareRequest.goal);

        if (!goal) throw new Error("Goal not found");

        const userToShareWith = await this.pb
            .collection("users")
            .getFirstListItem(`email = '${shareRequest.share_with_email}'`);

        if (!userToShareWith) throw new Error("User not found");

        goal.viewers.push(userToShareWith.id);

        await this.pb.collection("goals").update(goal.id, goal);
        await this.pb.collection("share_requests").delete(shareRequest.id);

        return goal;
    }

    async get(id: string) {
        return this.pb.collection("goals").getOne<GoalRecord>(id);
    }

    async getList({ limit }: ListOptions) {
        return this.pb
            .collection("goals")
            .getList<GoalRecord>(0, limit);
    }

    async update(id: string, goal: Partial<Goal>) {
        return this.pb
            .collection("goals")
            .update<GoalRecord>(id, goal);
    }

    async delete(id: string) {
        return this.pb.collection("goals").delete(id);
    }
}
