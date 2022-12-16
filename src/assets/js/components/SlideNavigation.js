export default class SlideNavigation {
    constructor() {
        let animationTags = [
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'li',
            '.main-navigation',
        ]
        /**
         *
         * @param {Array} prev
         * @param {HTMLElement} current
         */
        const filterMainItems = (prev, current) => {
            if (animationTags.reduce((a, b) => a || current.matches(b), false)) {
                prev.push(current);
            }

            if (current.children.length) {
                let filtered = Array.from(current.children).reduce(filterMainItems, []);
                prev.push(...filtered);
            }

            return prev;
        }

        const mainItems = Array.from(document.querySelectorAll('main > *'))
            .reduce(filterMainItems, []);

        mainItems.push(document.querySelector('.main-navigation'));

        mainItems.forEach(el => el.classList.add('fade-in'));

        const getCurrentSlide = function() {
            return document.querySelector('body > footer nav a[aria-current]');
        }

        let count = 0;

        const prev = function() {
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
            if (count < mainItems.length) {
                mainItems[count].classList.add('active');
                count++;

                if (count === mainItems.length - 1) {
                    next();
                }

            } else {
                const currentSlide = getCurrentSlide();

                if (!currentSlide) {
                    return;
                }

                const nextSlide = currentSlide.closest('li').nextElementSibling;

                if (!nextSlide) {
                    return;
                }

                nextSlide.querySelector('a').click();
            }
        };

        window.addEventListener('keydown', (e) => {
            if (window.innerHeight + window.scrollY === document.documentElement.offsetHeight) {
                switch (e.code) {
                    case 'ArrowRight':
                    case 'Space':
                        next();
                        break;
                    case 'ArrowLeft':
                        prev();
                        break;
                }
            }
        });
    }
}
