(function () {
    "use strict";

    const select = (selector, all = false) => {
        selector = selector.trim();
        return all ? [...document.querySelectorAll(selector)] : document.querySelector(selector);
    };

    const listen = (event, target, callback, multiple = false) => {
        let elements = select(target, multiple);
        if (elements) {
            multiple
                ? elements.forEach((element) => element.addEventListener(event, callback))
                : elements.addEventListener(event, callback);
        }
    };

    const handleScroll = () => {
        let scrollPosition = window.scrollY + 200;
        let navbarLinks = select("#navbar .scrollto", true);

        navbarLinks.forEach((link) => {
            if (!link.hash) return;

            let targetElement = select(link.hash);

            if (targetElement) {
                if (
                    scrollPosition >= targetElement.offsetTop &&
                    scrollPosition <= targetElement.offsetTop + targetElement.offsetHeight
                ) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            }
        });
    };

    window.addEventListener("load", handleScroll);
    listen(document, "scroll", handleScroll);

    const scrollToTarget = (target) => {
        let headerHeight = select("#header").offsetHeight;
        let targetOffset = select(target).offsetTop;

        window.scrollTo({
            top: targetOffset - headerHeight,
            behavior: "smooth",
        });
    };

    let backToTopButton = select(".back-to-top");

    if (backToTopButton) {
        const handleScrollTopButton = () => {
            if (window.scrollY > 100) {
                backToTopButton.classList.add("active");
            } else {
                backToTopButton.classList.remove("active");
            }
        };

        window.addEventListener("load", handleScrollTopButton);
        listen(document, "scroll", handleScrollTopButton);
    }

    listen("click", ".mobile-nav-toggle", function (event) {
        select("#navbar").classList.toggle("navbar-mobile");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
    });

    listen(
        "click",
        ".navbar .dropdown > a",
        function (event) {
            if (select("#navbar").classList.contains("navbar-mobile")) {
                event.preventDefault();
                this.nextElementSibling.classList.toggle("dropdown-active");
            }
        },
        true
    );

    listen(
        "click",
        ".scrollto",
        function (event) {
            if (select(this.hash)) {
                event.preventDefault();

                let navbar = select("#navbar");

                if (navbar.classList.contains("navbar-mobile")) {
                    navbar.classList.remove("navbar-mobile");
                    let mobileNavToggle = select(".mobile-nav-toggle");
                    mobileNavToggle.classList.toggle("bi-list");
                    mobileNavToggle.classList.toggle("bi-x");
                }

                scrollToTarget(this.hash);
            }
        },
        true
    );

    window.addEventListener("load", () => {
        if (window.location.hash && select(window.location.hash)) {
            scrollToTarget(window.location.hash);
        }
    });

    new Swiper(".testimonials-slider", {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidesPerView: "auto",
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });

    window.addEventListener("load", () => {
        let portfolioContainer = select(".portfolio-container");

        if (portfolioContainer) {
            let isotope = new Isotope(portfolioContainer, {
                itemSelector: ".portfolio-item",
                layoutMode: "fitRows",
            });

            let portfolioFilters = select("#portfolio-flters li", true);

            listen("click", "#portfolio-flters li", function (event) {
                event.preventDefault();

                portfolioFilters.forEach((filter) => {
                    filter.classList.remove("filter-active");
                });

                this.classList.add("filter-active");

                isotope.arrange({
                    filter: this.getAttribute("data-filter"),
                });

                isotope.on("arrangeComplete", () => {
                    AOS.refresh();
                });
            }, true);
        }
    });

    GLightbox({
        selector: ".portfolio-lightbox",
    });

    new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
    });

    window.addEventListener("load", () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    });
})();
