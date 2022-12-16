'use strict';

import SlideNavigation from './components/SlideNavigation.js';

if(document.querySelector('.main-navigation')) {
    new SlideNavigation();
}

const nav = document.querySelector('body > footer > nav');

const setLinkItemWidths = function(nl) {
    nl.forEach(el => {
        el.style.setProperty('--item-width', el.scrollWidth + 'px');
    });
};

if (nav) {
    let links = nav.querySelectorAll('li')
    setLinkItemWidths(links);

    window.addEventListener('resize', () => {
        setLinkItemWidths(links);
    });
}
