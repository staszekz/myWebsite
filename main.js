var hamburger = document.querySelector('.hamburger');
var lines = document.querySelectorAll('.line');
var menuLinks = document.querySelector('.menu');
var links = document.querySelectorAll('.menu__item');
var navBar = document.querySelector('.navigation');
//włączanie i wyłączanie menu po kliknięciu w hamburger
var toggleHamburgerClasses = function () {
    menuLinks.classList.toggle('open');
    if ((document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) &&
        window.innerWidth > 769) {
        menuLinks.classList.add('shortMenu');
    }
    links.forEach(function (link) {
        link.classList.toggle('fade');
    });
    lines.forEach(function (line) {
        line.classList.toggle('makeCross');
    });
};
//zamykanie menu po kliknięciu w link - obsługa
var closeMenu = function () {
    if (window.innerWidth < 769) {
        //żeby nie właczało się po kliknięciu w link na szerokim oknie
        menuLinks.classList.toggle('open');
        links.forEach(function (link) {
            link.classList.toggle('fade');
        });
        lines.forEach(function (line) {
            line.classList.toggle('makeCross');
        });
    }
};
//działający hamburger
hamburger.addEventListener('click', toggleHamburgerClasses);
//zamykanie menu po kliknięciu w link
links.forEach(function (link) {
    link.addEventListener('click', closeMenu);
});
//ładowanie w seksji aboutMe 
var hero = document.querySelector('.hero');
var heroHeight = parseFloat(getComputedStyle(hero, null).height.replace('px', ''));
var myImage = document.querySelector('.aboutMe__pictureWrapper');
var aboutMeContent = document.querySelector('.aboutMe__content');
var slide = function () {
    if (window.scrollY > heroHeight / 2) {
        myImage.classList.add('fromLeft');
        aboutMeContent.classList.add('fromRight');
    }
};
//ładowanie navbar po scrollu do innej sekcji
// const navBar = document.querySelector('.navigation') as HTMLElement;
if (window.scrollY >= heroHeight) {
    navBar.style.opacity = '1';
}
//loading of skills icons
var skillsEl = document.querySelectorAll('.skills__listElement');
var skills = document.querySelector('.skills');
var slideSkills = function () {
    if (window.scrollY > heroHeight + 200) {
        skillsEl.forEach(function (el) {
            el.classList.add('show');
        });
    }
};
var allOnScroll = function () {
    slide();
    slideSkills();
};
window.addEventListener('scroll', allOnScroll);
var date = new Date().getFullYear();
var footerDate = document.querySelector('.footer__date');
footerDate.innerText = date.toString();
///////////////////////////////// SNOW /////////////////////////////////////
// const flakes: string[] = [
// 	'./img/flakes/flake1.svg',
// 	'./img/flakes/flake2.svg',
// 	'./img/flakes/flake3.svg',
// 	'./img/flakes/flake4.svg'
// ]
// const renderSnow = () => {
// 	const snowContainer = document.createElement('div');
// 	snowContainer.id = 'snow-container';
// 	document.body.appendChild(snowContainer);
// 	return snowContainer;
// }
// const renderFlake = (snowContainer: HTMLElement) => {
// 	const flakeContainer = document.createElement('div');
// 	flakeContainer.classList.add('flake-container');
// 	flakeContainer.style.left = `${Math.random() * 100}%`;
// 	flakeContainer.style.transform = `scale(${Math.random()})`;
// 	const img = document.createElement('img');
// 	img.src = flakes[Math.floor(Math.random() * flakes.length)];
// 	flakeContainer.appendChild(img);
// 	snowContainer.appendChild(flakeContainer);
// 	setTimeout(renderFlake, 500, snowContainer);
// }
// const snowContainer = renderSnow();
// renderFlake(snowContainer);🔭 
//////////////////////// **contact form** ////////////////////////////
var config = {
    apiKey: "AIzaSyBi7I2rU9W1lrLwmQaJBilOn9X0IowDpK0",
    authDomain: "mywebsite-19aa3.firebaseapp.com",
    projectId: "mywebsite-19aa3",
    storageBucket: "mywebsite-19aa3.appspot.com",
    messagingSenderId: "998446798549",
    appId: "1:998446798549:web:939e8a7cb7b110b8e1b45c",
    measurementId: "G-7QLBHHESBS"
};
firebase.initializeApp(config);
var db = firebase.firestore();
var form = document.querySelector('.form');
var submitBtn = document.querySelector('.form__btn');
var closeBtn = document.querySelector('.form__close');
var openForm = document.querySelector('#openForm');
var formToReset = document.querySelector('#form');
var nameInput = document.querySelector('#name');
var emailInput = document.querySelector('#email');
var messageInput = document.querySelector('#msg');
var confirmation = document.querySelector('.form__sent');
var nameWarning = document.querySelector('.form__warning--name');
var emailWarning = document.querySelector('.form__warning--email');
var msgWarning = document.querySelector('.form__warning--message');
var clearFormWarnings = function () {
    nameInput.classList.remove('redBorder');
    emailInput.classList.remove('redBorder');
    messageInput.classList.remove('redBorder');
    nameWarning.innerText = '';
    emailWarning.innerText = '';
    msgWarning.innerText = '';
};
var closeForm = function (e) {
    e.preventDefault();
    form.classList.toggle('form__hide');
    form.classList.toggle('form__show');
    formToReset.reset();
    clearFormWarnings();
};
var checkValidity = function (name, email, message) {
    if (!name.length) {
        nameWarning.innerText = 'please enter a valid name';
        nameInput.classList.add('redBorder');
        return false;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        nameInput.classList.remove('redBorder');
        nameWarning.innerText = '';
        emailWarning.innerText = 'please enter a valid email address';
        emailInput.classList.add('redBorder');
        return false;
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
};
var showConfirmation = function () {
    confirmation.classList.add('showMsgSent');
    setTimeout(function () {
        confirmation.classList.remove('showMsgSent');
    }, 3000);
};
//save message to firebase
function saveMessage(name, email, location, message, e) {
    if (checkValidity(name, email, message)) {
        db
            .collection('mails')
            .add({
            name: name,
            email: email,
            location: location,
            message: message
        })
            .then(function () { return showConfirmation(); })
            .then(function () { return setTimeout(function () { return closeForm(e); }, 2000); });
    }
    ;
}
//to get form values
var getInputVal = function (id) {
    return document.querySelector(id);
};
//sending form
var submitForm = function (e) {
    e.preventDefault();
    var name = getInputVal('#name').value;
    var email = getInputVal('#email').value;
    var location = getInputVal('#location').value;
    var message = getInputVal('#msg').value;
    saveMessage(name, email, location, message, e);
};
// form.addEventListener('keydown', checkValidity);
submitBtn.addEventListener('click', submitForm);
closeBtn.addEventListener('click', closeForm);
openForm.addEventListener('click', closeForm);
