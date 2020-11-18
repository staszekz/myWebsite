const hamburger = document.querySelector('.hamburger');
const lines = document.querySelectorAll('.line');
const menuLinks = document.querySelector('.menu');
const links = document.querySelectorAll('.menu__item');
const navBar = document.querySelector('.navigation');

//włączanie i wyłączanie menu po kliknięciu w hamburger

const toggleHamburgerClasses = () => {
	menuLinks.classList.toggle('open');
	menuLinks.classList.toggle('shortMenu');
	if (
		(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) &&
		window.innerWidth < 769
	) {
		menuLinks.classList.remove('shortMenu');
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

const shrinkMenu = () => {
	if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
		navBar.classList.add('shortMenu');
		if (window.innerWidth > 768) {
			menuLinks.classList.add('shortMenu');
		}
	} else {
		navBar.classList.remove('shortMenu');
		if (window.innerWidth > 768) {
			menuLinks.classList.remove('shortMenu');
		}
	}
};

window.onscroll = () => shrinkMenu();
