'use strict';

const nav = document.querySelector('body > footer > nav');

const setLinkItemWidths = function (nl) {
    nl.forEach(el => {
        el.style.setProperty('--item-width', el.scrollWidth + 'px');
    });
};

const getCurrentSlide = function () {
    return document.querySelector('body > footer nav a[aria-current]');
}

const prev = function () {
    const currentSlide = getCurrentSlide();

    if (!currentSlide) {
        return;
    }

    const prevSlide = currentSlide.closest('li').previousElementSibling;

    if (!prevSlide) {
        return;
    }

    prevSlide.querySelector('a').click();
};

const next = function() {
    const currentSlide = getCurrentSlide();

    if (!currentSlide) {
        return;
    }

    const nextSlide = currentSlide.closest('li').nextElementSibling;

    if (!nextSlide) {
        return;
    }

    nextSlide.querySelector('a').click();
};

if (nav) {
    let links = nav.querySelectorAll('li')
    setLinkItemWidths(links);

    window.addEventListener('resize', () => {
        setLinkItemWidths(links);
    });
}

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowRight':
        case 'Space':
            next();
            break;
        case 'ArrowLeft':
            prev();
            break;
    }
});

