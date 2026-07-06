import { initializeApp } from "firebase-admin/app";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret } from "firebase-functions/params";
import {
  MessageData,
  adminEmail,
  senderConfirmationEmail,
} from "./emailTemplates";

initializeApp();

const BREVO_API_KEY = defineSecret("BREVO_API_KEY");

const SENDER = { name: "Formularz staszek.ovh", email: "kontakt@staszek.ovh" };

interface BrevoEmail {
  sender: { name: string; email: string };
  to: { email: string }[];
  replyTo?: { email: string };
  subject: string;
  htmlContent: string;
}

const sendBrevoEmail = async (
  apiKey: string,
  payload: BrevoEmail,
): Promise<void> => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Brevo API ${response.status}: ${await response.text()}`);
  }
};

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
    region: "europe-west1",
    secrets: [BREVO_API_KEY],
  },
  async (event) => {
    const messageData = event.data?.data();
    const apiKey = BREVO_API_KEY.value();

    if (!isMessageData(messageData)) {
      throw new Error("Invalid payload for staszek_ovh_form");
    }

    if (!apiKey) {
      throw new Error("Missing Brevo config for staszek_ovh_form");
    }

    const { subject, html } = adminEmail(messageData);

    await sendBrevoEmail(apiKey, {
      sender: SENDER,
      to: [{ email: "staszek.zajaczkowski@gmail.com" }],
      replyTo: { email: messageData.email },
      subject,
      htmlContent: html,
    });
  },
);

export const staszek_ovh_form_to_sender = onDocumentCreated(
  {
    document: "mails/{mailsId}",
    region: "europe-west1",
    secrets: [BREVO_API_KEY],
  },
  async (event) => {
    const messageData = event.data?.data();
    const apiKey = BREVO_API_KEY.value();

    if (!isMessageData(messageData)) {
      throw new Error("Invalid payload for staszek_ovh_form_to_sender");
    }

    if (!apiKey) {
      throw new Error("Missing Brevo config for staszek_ovh_form_to_sender");
    }

    const { subject, html } = senderConfirmationEmail(messageData.message);

    await sendBrevoEmail(apiKey, {
      sender: { name: "Staszek Zajaczkowski", email: SENDER.email },
      to: [{ email: messageData.email }],
      subject,
      htmlContent: html,
    });
  },
);
