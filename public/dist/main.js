"use strict";
const hamburger = document.querySelector('.hamburger');
const lines = document.querySelectorAll('.line');
const menuLinks = document.querySelector('.menu');
const links = document.querySelectorAll('.menu__item');
const navBar = document.querySelector('.navigation');
//włączanie i wyłączanie menu po kliknięciu w hamburger
const toggleHamburgerClasses = () => {
    menuLinks.classList.toggle('open');
    if ((document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) &&
        window.innerWidth > 769) {
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
const hero = document.querySelector('.hero');
const heroHeight = parseFloat(getComputedStyle(hero, null).height.replace('px', ''));
const myImage = document.querySelector('.aboutMe__pictureWrapper');
const aboutMeContent = document.querySelector('.aboutMe__content');
const slide = () => {
    if (window.scrollY > heroHeight / 2) {
        myImage.classList.add('fromLeft');
        aboutMeContent.classList.add('fromRight');
    }
};
//loading of skills icons
const skillsEl = document.querySelectorAll('.skills__listElement');
const skills = document.querySelector('.skills');
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
const date = new Date().getFullYear();
const footerDate = document.querySelector('.footer__date');
footerDate.innerText = date.toString();
///////////////////////////////// SNOW /////////////////////////////////////
const flakes = [
    './img/flakes/flake1.svg',
    './img/flakes/flake2.svg',
    './img/flakes/flake3.svg',
    './img/flakes/flake4.svg'
];
const renderSnow = () => {
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    document.body.appendChild(snowContainer);
    return snowContainer;
};
const renderFlake = (snowContainer) => {
    const flakeContainer = document.createElement('div');
    flakeContainer.classList.add('flake-container');
    flakeContainer.style.left = `${Math.random() * 100}%`;
    flakeContainer.style.transform = `scale(${Math.random()})`;
    const img = document.createElement('img');
    img.src = flakes[Math.floor(Math.random() * flakes.length)];
    flakeContainer.appendChild(img);
    snowContainer.appendChild(flakeContainer);
    setTimeout(renderFlake, 500, snowContainer);
};
const snowContainer = renderSnow();
// renderFlake(snowContainer);
//////////////////////// **contact form** /////////////////////////////
const form = document.querySelector('.form');
const submitBtn = document.querySelector('.form__btn');
const closeBtn = document.querySelector('.form__close');
const openForm = document.querySelector('#openForm');
const sendMessage = (e) => {
    e.preventDefault();
    console.log('submited', e);
};
const closeForm = (e) => {
    e.preventDefault();
    console.log('closed', e);
    form.classList.toggle('form__hide');
    form.classList.toggle('form__show');
};
submitBtn.addEventListener('click', sendMessage);
closeBtn.addEventListener('click', closeForm);
openForm.addEventListener('click', closeForm);
