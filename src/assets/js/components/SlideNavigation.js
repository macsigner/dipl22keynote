export default class SlideNavigation {
    constructor() {
        this.animationTags = [
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'li',
            '.main-navigation',
        ];

        this._filterMainItems = this._filterMainItems.bind(this);
        this.mainItems = Array.from(document.querySelectorAll('main > *'))
            .reduce(this._filterMainItems, []);

        this.mainItems.push(document.querySelector('.main-navigation'));

        this.mainItems.forEach(el => el.classList.add('fade-in'));

        this.count = 0;

        window.addEventListener('keydown', (e) => this._keyListener(e));

        this.next();
    }

    next() {
        if (this.count < this.mainItems.length) {
            this.mainItems[this.count].classList.add('active');
            this.count++;

            if (this.count === this.mainItems.length - 1) {
                this.next();
                console.log('last');
                document.body.classList.add('done');
            }

        } else {
            const currentSlide = this.getCurrentSlide();

            if (!currentSlide) {
                return;
            }

            const nextSlide = currentSlide.closest('li').nextElementSibling;

            if (!nextSlide) {
                return;
            }

            nextSlide.querySelector('a').click();
        }
    }

    prev() {
        const currentSlide = this.getCurrentSlide();

        if (!currentSlide) {
            return;
        }

        const prevSlide = currentSlide.closest('li').previousElementSibling;

        if (!prevSlide) {
            return;
        }

        prevSlide.querySelector('a').click();
    }

    getCurrentSlide() {
        return document.querySelector('body > footer nav a[aria-current]');
    }

    _keyListener(e) {
        switch (e.code) {
            case 'ArrowRight':
            case 'Space':
                this.next();
                break;
            case 'ArrowLeft':
                this.prev();
                break;
        }
    }

    /**
     *
     * @param {Array} prev
     * @param {HTMLElement} current
     */
    _filterMainItems(prev, current) {
        if (this.animationTags.reduce((a, b) => a || current.matches(b), false)) {
            prev.push(current);
        }

        if (current.children.length) {
            let filtered = Array.from(current.children).reduce(this._filterMainItems, []);
            prev.push(...filtered);
        }

        return prev;
    }
}
