import "dotenv/config";
import { Resend } from "resend";

export const emailClient = new Resend(process.env.EMAIL_API_KEY!);
