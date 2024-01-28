import {
    SESv2Client,
    SendEmailCommand,
    SendEmailCommandInput,
} from "@aws-sdk/client-sesv2";
import {
    EMAIL_ADDRESS_IDENTITY_ARN,
    NOREPLY_EMAIL,
} from "@solid/constants/email";

interface EmailSendResult {
    success: boolean;
    messageId?: string;
}

export class EmailService {
    private sesClient: SESv2Client;

    constructor(sesClient: SESv2Client) {
        this.sesClient = sesClient;
    }

    async sendEmail(
        toEmail: string,
        subject: string,
        body: string
    ): Promise<EmailSendResult> {
        const input: SendEmailCommandInput = {
            FromEmailAddress: NOREPLY_EMAIL,
            FromEmailAddressIdentityArn: EMAIL_ADDRESS_IDENTITY_ARN,
            Destination: {
                ToAddresses: [toEmail],
            },
            Content: {
                Simple: {
                    Subject: {
                        Data: subject,
                        Charset: "UTF8",
                    },
                    Body: {
                        Text: {
                            Data: body,
                            Charset: "UTF8",
                        },
                    },
                },
            },
        };

        const command = new SendEmailCommand(input);

        const response = await this.sesClient.send(command);

        return {
            success: response.$metadata.httpStatusCode === 200,
            messageId: response.MessageId,
        };
    }
}
