'use strict';
const hamburger = document.querySelector('.hamburger');
const lines = document.querySelectorAll('.line');
const menuLinks = document.querySelector('.menu');
const links = document.querySelectorAll('.menu__item');
const navBar = document.querySelector('.navigation');
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
	// menuLinks.classList.add('shortMenu');
	// shrinkMenu();
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
// const shrinkMenu = () => {
// 	if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
// 		navBar.classList.add('shortMenu');
// 		if (window.innerWidth > 768) {
// 			menuLinks.classList.add('shortMenu');
// 		} else {
// 			menuLinks.classList.remove('shortMenu');
// 		}
// 	} else {
// 		navBar.classList.remove('shortMenu');
// 		menuLinks.classList.remove('shortMenu');
// 	}
// };
// window.onresize = () => {
// 	if (window.innerWidth > 769) {
// 		menuLinks.classList.add('shortMenu');
// 	}
// };
// window.onscroll = () => shrinkMenu();
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
