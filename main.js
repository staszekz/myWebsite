const hamburger = document.querySelector('.hamburger');
const lines = document.querySelectorAll('.line');
const menuLinks = document.querySelector('.menu');
const links = document.querySelectorAll('.menu__item');

//włączanie i wyłączanie menu po kliknięciu w hamburger
const toggleHamburgerClasses = () => {
	menuLinks.classList.toggle('open');
	links.forEach(link => {
		link.classList.toggle('fade');
	});
	lines.forEach(line => {
		line.classList.toggle('makeCross');
	});
};

//zamykanie menu po kliknięciu w link - obsługa
const closeMenu = () => {
	menuLinks.classList.toggle('open');
	links.forEach(link => {
		link.classList.toggle('fade');
	});
	lines.forEach(line => {
		line.classList.toggle('makeCross');
	});
};

//działający hamburger
hamburger.addEventListener('click', toggleHamburgerClasses);
//zamykanie menu po kliknięciu w link
links.forEach(link => {
	link.addEventListener('click', closeMenu);
});

//projects on hover

const projects = document.querySelectorAll('.project__title');

const onHover = project => {
	project.classList.toggle('project__onHover');
};
const onMouseLeave = project => {
	project.classList.toggle('project__onHover');
};

projects.forEach(project => {
	project.addEventListener('mouseover', () => onHover(project));
	project.addEventListener('mouseleave', () => onMouseLeave(project));
});
