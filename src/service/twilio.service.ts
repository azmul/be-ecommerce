import { Response } from "express";
import { Twilio } from "twilio";
import { TWILIO_ACCOUNT_SID , TWILIO_AUTH_TOKEN, TWILIO_VERIFICATION_SID} from "../environment";

export async function phoneVerify(phone: string, res: Response) {
    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    try {
        client.
        verify.
        services(TWILIO_VERIFICATION_SID).
        verifications.
        create({
            to: `+88${phone}`,
            channel: 'sms'
        }).then((data: any) => {
            res.status(200).send({status: data.status, to: data.to, valid: data.valid});
        });
    } catch (error: any) {
      throw new Error(error);
    }
  }