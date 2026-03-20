import * as sendGridEmail from "@sendgrid/mail";
import { initializeApp } from "firebase-admin/app";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret, defineString } from "firebase-functions/params";

initializeApp();

interface MessageData {
  name: string;
  email: string;
  location: string;
  message: string;
}

const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const TEMPLATE_ID = defineString("SENDGRID_TEMPLATE_ID");
const TEMPLATE_TO_SENDER = defineString("SENDGRID_TEMPLATE_TO_SENDER");

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

export const staszek_ovh_form = onDocumentCreated(
  {
    document: "mails/{mailsId}",
    secrets: [SENDGRID_API_KEY],
  },
  async (event) => {
    const messageData = event.data?.data();
    const templateId = TEMPLATE_ID.value();
    const apiKey = SENDGRID_API_KEY.value();

    if (!isMessageData(messageData)) {
      throw new Error("Invalid payload for staszek_ovh_form");
    }

    if (!apiKey || !templateId) {
      throw new Error("Missing SendGrid config for staszek_ovh_form");
    }

    sendGridEmail.setApiKey(apiKey);

    await sendGridEmail.send({
      to: "staszek.zajaczkowski@gmail.com",
      from: "ktulu.inc@gmail.com",
      templateId,
      dynamicTemplateData: {
        name: messageData.name,
        email: messageData.email,
        location: messageData.location,
        message: messageData.message,
      },
    });
  },
);

export const staszek_ovh_form_to_sender = onDocumentCreated(
  {
    document: "mails/{mailsId}",
    secrets: [SENDGRID_API_KEY],
  },
  async (event) => {
    const messageData = event.data?.data();
    const templateToSender = TEMPLATE_TO_SENDER.value();
    const apiKey = SENDGRID_API_KEY.value();

    if (!isMessageData(messageData)) {
      throw new Error("Invalid payload for staszek_ovh_form_to_sender");
    }

    if (!apiKey || !templateToSender) {
      throw new Error("Missing SendGrid config for staszek_ovh_form_to_sender");
    }

    sendGridEmail.setApiKey(apiKey);

    await sendGridEmail.send({
      to: messageData.email,
      from: "ktulu.inc@gmail.com",
      templateId: templateToSender,
      dynamicTemplateData: {
        message: messageData.message,
      },
    });
  },
);
