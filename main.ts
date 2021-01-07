
const hamburger = document.querySelector('.hamburger') as HTMLElement;
const lines: NodeListOf<Element> = document.querySelectorAll('.line');
const menuLinks = document.querySelector('.menu') as HTMLUListElement;
const links: NodeListOf<Element> = document.querySelectorAll('.menu__item');
const navBar = document.querySelector('.navigation') as HTMLElement;

//włączanie i wyłączanie menu po kliknięciu w hamburger

const toggleHamburgerClasses = () => {
	menuLinks.classList.toggle('open');
	if (
		(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) &&
		window.innerWidth > 769
	) {
		menuLinks.classList.add('shortMenu');
	}
	links.forEach(link => {
		link.classList.toggle('fade');
	});
	lines.forEach(line => {
		line.classList.toggle('makeCross');
	});

};

//zamykanie menu po kliknięciu w link - obsługa
const closeMenu = () => {
	if (window.innerWidth < 769) {
		//żeby nie właczało się po kliknięciu w link na szerokim oknie
		menuLinks.classList.toggle('open');
		links.forEach(link => {
			link.classList.toggle('fade');
		});
		lines.forEach(line => {
			line.classList.toggle('makeCross');
		});
	}
};

//działający hamburger
hamburger.addEventListener('click', toggleHamburgerClasses);
//zamykanie menu po kliknięciu w link
links.forEach(link => {
	link.addEventListener('click', closeMenu);
});


//ładowanie w seksji aboutMe 
const hero = document.querySelector('.hero') as HTMLElement;
const heroHeight: number = parseFloat(getComputedStyle(hero, null).height.replace('px', ''));
const myImage = document.querySelector('.aboutMe__pictureWrapper') as HTMLImageElement;
const aboutMeContent = document.querySelector('.aboutMe__content') as HTMLParagraphElement;

const slide = () => {
	if (window.scrollY > heroHeight / 2) {
		myImage.classList.add('fromLeft');
		aboutMeContent.classList.add('fromRight');
	}
};

//loading of skills icons
const skillsEl: NodeListOf<Element> = document.querySelectorAll('.skills__listElement');
const skills = document.querySelector('.skills') as HTMLElement;

const slideSkills = () => {
	if (window.scrollY > heroHeight + 200) {
		skillsEl.forEach(el => {
			el.classList.add('show');
		});
	}
};

const allOnScroll = () => {
	slide();
	slideSkills();
};

window.addEventListener('scroll', allOnScroll);


const date: number = new Date().getFullYear()
const footerDate = document.querySelector('.footer__date') as HTMLDataElement;
footerDate.innerText = date.toString();


///////////////////////////////// SNOW /////////////////////////////////////
const flakes: string[] = [
	'./img/flakes/flake1.svg',
	'./img/flakes/flake2.svg',
	'./img/flakes/flake3.svg',
	'./img/flakes/flake4.svg'
]

const renderSnow = () => {
	const snowContainer = document.createElement('div');
	snowContainer.id = 'snow-container';
	document.body.appendChild(snowContainer);
	return snowContainer;
}



const renderFlake = (snowContainer: HTMLElement) => {
	const flakeContainer = document.createElement('div');
	flakeContainer.classList.add('flake-container');

	flakeContainer.style.left = `${Math.random() * 100}%`;
	flakeContainer.style.transform = `scale(${Math.random()})`;

	const img = document.createElement('img');
	img.src = flakes[Math.floor(Math.random() * flakes.length)];

	flakeContainer.appendChild(img);

	snowContainer.appendChild(flakeContainer);

	setTimeout(renderFlake, 500, snowContainer);
}


const snowContainer = renderSnow();
// renderFlake(snowContainer);🔭 



//////////////////////// **contact form** ////////////////////////////
const config = {
	apiKey: "AIzaSyBi7I2rU9W1lrLwmQaJBilOn9X0IowDpK0",
	authDomain: "mywebsite-19aa3.firebaseapp.com",
	projectId: "mywebsite-19aa3",
	storageBucket: "mywebsite-19aa3.appspot.com",
	messagingSenderId: "998446798549",
	appId: "1:998446798549:web:939e8a7cb7b110b8e1b45c",
	measurementId: "G-7QLBHHESBS"
}

firebase.initializeApp(config);
const db = firebase.firestore()

const form = document.querySelector('.form') as HTMLElement;
const submitBtn = document.querySelector('.form__btn') as HTMLInputElement;
const closeBtn = document.querySelector('.form__close') as HTMLInputElement;
const openForm = document.querySelector('#openForm') as HTMLElement;
const formToReset = document.querySelector('#form') as HTMLFormElement;
const nameInput = document.querySelector('#name') as HTMLInputElement;
const emailInput = document.querySelector('#email') as HTMLInputElement;
const messageInput = document.querySelector('#msg') as HTMLInputElement;
const confirmation = document.querySelector('.form__sent') as HTMLElement;

const nameWarning = document.querySelector('.form__warning--name') as HTMLElement;
const emailWarning = document.querySelector('.form__warning--email') as HTMLElement;
const msgWarning = document.querySelector('.form__warning--message') as HTMLElement;

const clearFormWarnings = ():void =>{
	nameInput.classList.remove('redBorder');
	emailInput.classList.remove('redBorder');
	messageInput.classList.remove('redBorder');
	nameWarning.innerText = '';
	emailWarning.innerText = ''
	msgWarning.innerText = ''
}

const closeForm = (e: MouseEvent):void => {
	e.preventDefault();
	form.classList.toggle('form__hide');
	form.classList.toggle('form__show');
	formToReset.reset();
	clearFormWarnings();
}



const checkValidity = (name: string, email: string, message: string): boolean => {
	if (!name.length) {
		nameWarning.innerText = 'please enter a valid name'
		nameInput.classList.add('redBorder')
		return false
	}
	if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
		nameInput.classList.remove('redBorder')
		nameWarning.innerText = ''
		emailWarning.innerText = 'please enter a valid email address';
		emailInput.classList.add('redBorder');
		return false
	}
	if (!message) {
		emailInput.classList.remove('redBorder');
		emailWarning.innerText = '';
		msgWarning.innerText = 'please write something nice';
		messageInput.classList.add('redBorder');
		return false;
	}
	messageInput.classList.remove('redBorder');
	msgWarning.innerText = '';
	return true;
}

const showConfirmation = ():void =>{
	confirmation.classList.add('showMsgSent');
	setTimeout(()=>{
		confirmation.classList.remove('showMsgSent');
	}, 3000)
}
//save message to firebase
function saveMessage(name: string, email: string, location: string, message: string) {
	if (checkValidity(name, email, message)) {
		db
			.collection('mails')
			.add({
				name: name,
				email: email,
				location: location,
				message: message,
			})
			.then(() => showConfirmation())
			.then(() => clearFormWarnings())
			.then(() => formToReset.reset())
		};

}


//to get form values
const getInputVal = (id: string) => {
	return <HTMLInputElement>document.querySelector(id);
};

//sending form
const submitForm = (e: MouseEvent) => {
	e.preventDefault();

	const name = getInputVal('#name').value;
	const email = getInputVal('#email').value;
	const location = getInputVal('#location').value;
	const message = getInputVal('#msg').value;
	saveMessage(name, email, location, message);
};

// form.addEventListener('keydown', checkValidity);
submitBtn.addEventListener('click', submitForm);
closeBtn.addEventListener('click', closeForm);
openForm.addEventListener('click', closeForm);
