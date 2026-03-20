import * as functions from "firebase-functions/v1";
import * as sendGridEmail from "@sendgrid/mail";
import { initializeApp } from "firebase-admin/app";

initializeApp();

interface MessageData {
  name: string;
  email: string;
  location: string;
  message: string;
}

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY ?? "";
const TEMPLATE_ID = process.env.SENDGRID_TEMPLATE_ID ?? "";
const TEMPLATE_TO_SENDER = process.env.SENDGRID_TEMPLATE_TO_SENDER ?? "";

if (!SENDGRID_API_KEY || !TEMPLATE_ID || !TEMPLATE_TO_SENDER) {
  throw new Error("Missing SendGrid environment variables");
}

sendGridEmail.setApiKey(SENDGRID_API_KEY);

const isMessageData = (value: unknown): value is MessageData => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.location === "string" &&
    typeof candidate.message === "string"
  );
};

export const staszek_ovh_form = functions.firestore
  .document("/mails/{mailsId}")
  .onCreate(async (snap) => {
    const messageData = snap.data();

    if (!isMessageData(messageData)) {
      throw new Error("Invalid payload for staszek_ovh_form");
    }

    await sendGridEmail.send({
      to: "staszek.zajaczkowski@gmail.com",
      from: "ktulu.inc@gmail.com",
      templateId: TEMPLATE_ID,
      dynamicTemplateData: {
        name: messageData.name,
        email: messageData.email,
        location: messageData.location,
        message: messageData.message,
      },
    });
  });

export const staszek_ovh_form_to_sender = functions.firestore
  .document("/mails/{mailsId}")
  .onCreate(async (snap) => {
    const messageData = snap.data();

    if (!isMessageData(messageData)) {
      throw new Error("Invalid payload for staszek_ovh_form_to_sender");
    }

    await sendGridEmail.send({
      to: messageData.email,
      from: "ktulu.inc@gmail.com",
      templateId: TEMPLATE_TO_SENDER,
      dynamicTemplateData: {
        message: messageData.message,
      },
    });
  });
