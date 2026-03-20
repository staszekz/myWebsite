"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staszek_ovh_form_to_sender = exports.staszek_ovh_form = void 0;
const functions = require("firebase-functions/v1");
const sendGridEmail = require("@sendgrid/mail");
const app_1 = require("firebase-admin/app");
(0, app_1.initializeApp)();
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY ?? "";
const TEMPLATE_ID = process.env.SENDGRID_TEMPLATE_ID ?? "";
const TEMPLATE_TO_SENDER = process.env.SENDGRID_TEMPLATE_TO_SENDER ?? "";
if (!SENDGRID_API_KEY || !TEMPLATE_ID || !TEMPLATE_TO_SENDER) {
    throw new Error("Missing SendGrid environment variables");
}
sendGridEmail.setApiKey(SENDGRID_API_KEY);
const isMessageData = (value) => {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const candidate = value;
    return (typeof candidate.name === "string" &&
        typeof candidate.email === "string" &&
        typeof candidate.location === "string" &&
        typeof candidate.message === "string");
};
exports.staszek_ovh_form = functions.firestore
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
exports.staszek_ovh_form_to_sender = functions.firestore
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
