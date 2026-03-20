"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staszek_ovh_form_to_sender = exports.staszek_ovh_form = void 0;
const sendGridEmail = require("@sendgrid/mail");
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-functions/v2/firestore");
const params_1 = require("firebase-functions/params");
(0, app_1.initializeApp)();
const SENDGRID_API_KEY = (0, params_1.defineSecret)("SENDGRID_API_KEY");
const TEMPLATE_ID = (0, params_1.defineString)("SENDGRID_TEMPLATE_ID");
const TEMPLATE_TO_SENDER = (0, params_1.defineString)("SENDGRID_TEMPLATE_TO_SENDER");
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
exports.staszek_ovh_form = (0, firestore_1.onDocumentCreated)({
    document: "mails/{mailsId}",
    secrets: [SENDGRID_API_KEY],
}, async (event) => {
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
});
exports.staszek_ovh_form_to_sender = (0, firestore_1.onDocumentCreated)({
    document: "mails/{mailsId}",
    secrets: [SENDGRID_API_KEY],
}, async (event) => {
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
});
