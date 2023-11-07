var yourNameSpace = window.yourNameSpace || {};
yourNameSpace.informaParallax = yourNameSpace.informaParallax || (function ($, window, document) {
    const self = {};
    self.parallaxEl = () => document.getElementById("parallax");
    const itemClass = "parallax-items";
    self.imageSet = window.yourNameSpace.parallaxSet;
    self.images = window.yourNameSpace.parallaxImages;
    /**
   * This is for Randomizing the image and jump between the sets for specific breakpoints
   */
    self.pickSet = function () {
        const breakpoint = window.matchMedia("(max-width: 600px)").matches
            ? "mobile"
            : "desktop";
        const imageElements = Object.entries(self.images[breakpoint]);
        let imageItems =
            imageElements[Math.floor(Math.random() * imageElements.length)][1];
        if(self.imageSet) {
            imageItems = imageElements[self.imageSet][1]
        }
        imageItems.forEach((item) => {
            let div = document.createElement("div");
            div.classList.add(itemClass);
            div.style.backgroundImage = `url(${item})`;
            self.parallaxEl().firstElementChild.append(div);
        });
    };
    /**
     * This is for capturing page height and setting it for absolutely positioned parallax items
     */
    self.getParallaxHeight = function () {
        const body = document.body,
            html = document.documentElement;
        return Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
    };
    self.getParallaxTop = function (container) {
        const bodyRect = document.body.getBoundingClientRect(),
            elemRect = container.getBoundingClientRect();
        return -1 * (elemRect.top - bodyRect.top);
    };
    self.onParallaxScroll = function (elements = [], parallaxHeight = 0, parallaxTop = 0) {
        const scrollTop = window.scrollY;
        [].slice.call(elements).forEach((element, index) => {
            const scrollRate = 0.25;
            if (element) {
                element.style.top = `${parallaxTop}px`;
                element.style.height = `${parallaxHeight}px`;
                element.style.transform = `translate3d(0px, -${scrollTop * (index + 1) * scrollRate}px, 0px)`;
            }
        });
    };
    /**
     * This is for initiating Prallax functionality
     */
    self.initParallax = function () {
        if (!window.parallaxInitiated) {
            const container = self.parallaxEl();
            const elements = document.getElementsByClassName(itemClass);
            self.pickSet(elements);
            const parallaxHeight = self.getParallaxHeight();
            const parallaxTop = self.getParallaxTop(container);
            if (!!container) {
                const root = document.body.firstElementChild;
                const holdingElement = !!root && root.firstElementChild;
                if (!!holdingElement) holdingElement.style.overflow = "hidden";
            }
            self.onParallaxScroll(elements, parallaxHeight, parallaxTop);
            window.onscroll = function () {
                self.onParallaxScroll(elements, parallaxHeight, parallaxTop);
            };
        }
        window.parallaxInitiated = true;
    };
    self.init = function () {
        self.initParallax();
    }

    return self;
})(null, window, document);



setTimeout(function () {
    yourNameSpace.informaParallax.init();
}, 200);