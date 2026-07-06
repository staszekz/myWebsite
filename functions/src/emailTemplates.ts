export interface MessageData {
  name: string;
  email: string;
  location: string;
  message: string;
}

export interface EmailContent {
  subject: string;
  html: string;
}

// Form values are interpolated into HTML; SendGrid templates escaped
// {{vars}} automatically, so we must do it ourselves now.
const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Palette mirrors the site (scss/variables.scss): $mainColor, $secondColor,
// $greenColor. Heebo falls back to Arial where the client lacks the font.
const BG = "#1c212b";
const CARD = "#252934";
const INSET = "#1f242e";
const TEXT = "#e6e6dc";
const MUTED = "#8b93a3";
const ACCENT = "#2ee59d";
const FONT = "Heebo, Arial, sans-serif";

const wrap = (title: string, content: string): string => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
  </head>
  <body style="margin:0; padding:0; background-color:${BG}; font-family:${FONT}; font-size:15px; color:${TEXT};">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BG}">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; background-color:${CARD}; border-radius:14px; overflow:hidden;">
            <tr>
              <td style="height:4px; background-color:${ACCENT}; font-size:0; line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 32px 0 32px;">
                <span style="color:${ACCENT}; font-family:${FONT}; font-size:13px; font-weight:bold; letter-spacing:3px; text-transform:uppercase;">staszek.ovh</span>
                <h1 style="margin:14px 0 0 0; color:${TEXT}; font-family:${FONT}; font-size:22px; font-weight:bold;">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px 32px;">
                ${content}
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 24px 32px;">
                <p style="margin:0; border-top:1px solid ${INSET}; padding-top:16px; color:${MUTED}; font-family:${FONT}; font-size:12px;">
                  <a href="https://staszek.ovh" style="color:${ACCENT}; text-decoration:none;">staszek.ovh</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const fieldRow = (label: string, value: string): string => `
  <tr>
    <td style="padding:6px 16px 6px 0; color:${MUTED}; font-family:${FONT}; font-size:13px; white-space:nowrap; vertical-align:top;">${label}</td>
    <td style="padding:6px 0; color:${TEXT}; font-family:${FONT}; font-size:15px;">${value}</td>
  </tr>`;

const messageBox = (message: string): string => `
  <div style="margin-top:16px; padding:16px 18px; background-color:${INSET}; border-left:3px solid ${ACCENT}; border-radius:0 8px 8px 0;">
    <p style="margin:0; color:${TEXT}; font-family:${FONT}; font-size:15px; line-height:1.6; white-space:pre-wrap;">${escapeHtml(message)}</p>
  </div>`;

export const adminEmail = (data: MessageData): EmailContent => ({
  subject: "New Message from staszek.ovh",
  html: wrap(
    "Nowa wiadomość ze strony",
    `<table cellpadding="0" cellspacing="0" border="0">
       ${fieldRow("Imię", escapeHtml(data.name))}
       ${fieldRow(
         "E-mail",
         `<a href="mailto:${escapeHtml(data.email)}" style="color:${ACCENT}; text-decoration:none;">${escapeHtml(data.email)}</a>`,
       )}
       ${fieldRow("Lokalizacja", escapeHtml(data.location))}
     </table>
     ${messageBox(data.message)}`,
  ),
});

export const senderConfirmationEmail = (message: string): EmailContent => ({
  subject: "You just sent this message to Staszek Zajaczkowski",
  html: wrap(
    "Message sent:",
    `${messageBox(message)}
     <p style="margin:18px 0 0 0; color:${MUTED}; font-family:${FONT}; font-size:13px; line-height:1.6;">
       Thanks for reaching out &mdash; I&#39;ll get back to you soon.
     </p>`,
  ),
});
