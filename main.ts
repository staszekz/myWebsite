interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
	recaptchaSiteKey: string;
}

interface FirestoreDb {
	collection: (name: string) => {
		add: (data: Record<string, string>) => Promise<unknown>;
	};
}

interface AppCheckNamespace {
	(): {
		activate: (
			provider: unknown,
			isTokenAutoRefreshEnabled: boolean,
		) => void;
	};
	ReCaptchaEnterpriseProvider: new (siteKey: string) => unknown;
}

declare const firebase: {
	initializeApp: (config: FirebaseConfig) => void;
	firestore: () => FirestoreDb;
	appCheck: AppCheckNamespace;
};

type WindowWithFirebaseWebConfig = Window & {
	__FIREBASE_WEB_CONFIG__?: FirebaseConfig;
};

function getFirebaseWebConfig(): FirebaseConfig {
	const c = (window as WindowWithFirebaseWebConfig).__FIREBASE_WEB_CONFIG__;
	if (!c) {
		throw new Error(
			'Missing Firebase web config. Run `npm run build` with FIREBASE_WEB_* in .env, or load dist/firebase-config.js before main.js.',
		);
	}
	return c;
}

const firebaseWebConfig = getFirebaseWebConfig();
firebase.initializeApp(firebaseWebConfig);
firebase
	.appCheck()
	.activate(
		new firebase.appCheck.ReCaptchaEnterpriseProvider(
			firebaseWebConfig.recaptchaSiteKey,
		),
		true,
	);
const db = firebase.firestore();

// Footer year
const yearEl = document.querySelector('#year') as HTMLSpanElement;
yearEl.textContent = String(new Date().getFullYear());

// Contact form panel (slide-in)
const formOverlay = document.querySelector('#formOverlay') as HTMLDivElement;
const contactForm = document.querySelector('#contactForm') as HTMLFormElement;
const formStatus = document.querySelector('#formStatus') as HTMLDivElement;
const submitButton = contactForm.querySelector(
	'.form-panel__submit',
) as HTMLButtonElement;

let closeTimeout: number | undefined;

const openForm = (event: Event): void => {
	event.preventDefault();
	window.clearTimeout(closeTimeout);
	formOverlay.classList.add('is-open');
};

const closeForm = (): void => {
	formOverlay.classList.remove('is-open');
};

document.querySelectorAll('.js-open-form').forEach(el => {
	el.addEventListener('click', openForm);
});

document.querySelectorAll('.js-close-form').forEach(el => {
	el.addEventListener('click', closeForm);
});

document.addEventListener('keydown', event => {
	if (event.key === 'Escape') {
		closeForm();
	}
});

const setStatus = (message: string, isError: boolean): void => {
	formStatus.textContent = message;
	formStatus.classList.toggle('form-panel__status--error', isError);
};

const showSentAndClose = (): void => {
	setStatus('✓ message sent — thank you!', false);
	contactForm.reset();
	closeTimeout = window.setTimeout(() => {
		closeForm();
		setStatus('', false);
	}, 3500);
};

contactForm.addEventListener('submit', async event => {
	event.preventDefault();
	const data = new FormData(contactForm);

	// Honeypot: humans never see the "company" field, bots fill it.
	// Pretend success so the bot moves on, but write nothing.
	if (String(data.get('company') ?? '').trim() !== '') {
		showSentAndClose();
		return;
	}

	const message = {
		name: String(data.get('name') ?? '').trim(),
		email: String(data.get('email') ?? '').trim(),
		location: String(data.get('location') ?? '').trim(),
		message: String(data.get('msg') ?? '').trim(),
	};

	submitButton.disabled = true;
	setStatus('sending…', false);
	try {
		await db.collection('mails').add(message);
		showSentAndClose();
	} catch (error) {
		console.error('Failed to send message:', error);
		setStatus('✗ something went wrong — try again or email me directly.', true);
	} finally {
		submitButton.disabled = false;
	}
});
