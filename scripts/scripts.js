// VARIABLES DECLARATIONS

const navBar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar__menu-list__item');
const navAnchors = document.querySelectorAll('.navbar-link');
const hamburger = document.querySelector('#hamburger');

const slides = document.querySelector('.header__slider__slides');
const slidesNavs = document.querySelectorAll('.header__slider__panel__nav');
const sliderButtons = document.querySelectorAll('.header__slider__panel__button');

const categoryFilters = document.querySelectorAll('.portofolio__projects-types-nav__selector');
const projectsCard = document.querySelectorAll('.portofolio__card');

// FUNCTIONS DECLARATIONS

const getElementOffsetTop = (domElement) => {
    const bodyRect = document.body.getBoundingClientRect(),
        refElementRect = domElement.getBoundingClientRect()

    return refElementRect.top - bodyRect.top;
}

const currentlyScrolling = (domElement) => {
    return (getElementOffsetTop(domElement) <= (window.scrollY + 150)) && ((getElementOffsetTop(domElement) + domElement.offsetHeight ) > (window.scrollY + 150))
}
const passedScrolled = (domElement, topFixed) => Math.round(window.scrollY) > ((topFixed ? 0 : getElementOffsetTop(domElement)) + domElement.offsetHeight);

const removeClassOnElements = (elements, classToRemove) => {
    return elements.forEach((element) => {
        element.classList.remove(classToRemove)
    })
}

const setClass = (element, classToAdd) => element.classList.add(classToAdd);

const resetActiveElement = (ElementsList, targetElement, activeClass) => {
    removeClassOnElements(ElementsList, activeClass);
    return setClass(targetElement, activeClass)
}


const navShrinkToggle = (toShrink) => toShrink ? navBar.classList.add('navbar--shrinked') : navBar.classList.remove('navbar--shrinked');

const displayFiltredCard = (filterValue, cardElement) => {
    if(filterValue === 'all') {
        setClass(cardElement, 'wrap-quarter');
        return cardElement.style.display = 'block'
    }
    filterValue === cardElement.dataset.category ? cardElement.style.display = 'block' : cardElement.style.display = 'none';
}

const sliding = (slide, xCoordonate) => {
    resetActiveElement(sliderButtons, slide, 'active');
    // slides witdth is at 200% because slides are divs, not image so 'translateX(-50%)' instead of 'translateX(-100%)'
    slides.style.transform = `translateX(${xCoordonate}%)`;
}


/* EVENTS LISTENERS */

sliderButtons.forEach((slide, i) => {
    let xPos = i === 0 ? 0 : -50;
    slide.addEventListener('click', () => {
        sliding(slidesNavs[i], xPos);
    })
})


categoryFilters.forEach((filter) => {
    
    filter.addEventListener('click', () => {
        
        resetActiveElement(categoryFilters, filter, '--active');
        let filterType = filter.value;

        projectsCard.forEach((card) => {
            displayFiltredCard(filterType, card);
        })
    })
})


window.onscroll = (e) => {
    
    // Navbar Shrinking
    
    navShrinkToggle(passedScrolled(navBar, 'TopFixed'));

    // NavBar active anchors class Managing
    navAnchors.forEach((anchor) => {
        
        let anchorTarget = document.querySelector(anchor.getAttribute("href"));

        if (currentlyScrolling(anchorTarget)) {
            resetActiveElement(navLinks, anchor.parentElement, 'navbar__menu-list__item--active');
        } 
    })
    
}

navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', () => {
        hamburger.checked = false;
    })
})

