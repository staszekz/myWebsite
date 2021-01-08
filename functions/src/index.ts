import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



// const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template
const sendGridEmail = require('@sendgrid/mail');

sendGridEmail.setApiKey(SENDGRID_API_KEY);
exports.staszek_ovh_form = functions.firestore.document('/mails/{mailsId}').onCreate((snap:any) => {
	const messageData = snap.data();
	const msg = {
		to: 'staszek.zajaczkowski@gmail.com',
		from: 'ktulu.inc@gmail.com',
		templateId: TEMPLATE_ID,
		dynamic_template_data: {
			name: messageData.name,
			email: messageData.email,
			location: messageData.location,
			message: messageData.message,
		},
	};
	return sendGridEmail
		.send(msg)
		.then(() => console.log('email sent'))
		.catch((error:Error) => { throw new Error(error.toString()) });
});
