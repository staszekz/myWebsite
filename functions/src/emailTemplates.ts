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

const wrap = (bodyBg: string, cardBg: string, content: string): string => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="margin:0; padding:0; background-color:${bodyBg}; font-family:arial,helvetica,sans-serif; font-size:14px; color:#000000;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${bodyBg}">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;" bgcolor="${cardBg}">
            <tr>
              <td style="padding:24px 20px;">
                ${content}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export const adminEmail = (data: MessageData): EmailContent => ({
  subject: "New Message from staszek.ovh",
  html: wrap(
    "#f5d9b2",
    "#e6f0c4",
    `<h1 style="text-align:center; margin:0 0 18px 0;">
       <span style="color:#1d327d; font-size:18px; font-family:'trebuchet ms',helvetica,sans-serif;">Nowa wiadomość ze strony staszek.ovh</span>
     </h1>
     <hr style="border:none; border-top:1px solid #1d327d; margin:0 0 18px 0;">
     <p style="margin:0 0 8px 0;"><strong>Imię:</strong> ${escapeHtml(data.name)}</p>
     <p style="margin:0 0 8px 0;"><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
     <p style="margin:0 0 8px 0;"><strong>Lokalizacja:</strong> ${escapeHtml(data.location)}</p>
     <p style="margin:16px 0 4px 0;"><strong>Wiadomość:</strong></p>
     <p style="margin:0; white-space:pre-wrap;">${escapeHtml(data.message)}</p>`,
  ),
});

export const senderConfirmationEmail = (message: string): EmailContent => ({
  subject: "You just sent this message to Staszek Zajaczkowski",
  html: wrap(
    "#bbf79e",
    "#d3e090",
    `<h3 style="text-align:center; margin:0 0 18px 0;">
       <span style="color:#080b77; font-family:'trebuchet ms',helvetica,sans-serif;">Message sent:</span>
     </h3>
     <p style="margin:0 0 18px 18px; white-space:pre-wrap;">${escapeHtml(message)}</p>
     <p style="margin:0; text-align:center;"><a href="https://staszek.ovh" style="color:#1188E6; text-decoration:none;">https://staszek.ovh</a></p>`,
  ),
});
