// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS
	stickyHeader()
	mobMenuToggle()
	aboutSlider()
	aboutVideo()
	smoothScroll()
	accordion('.accordion-item-js', {
		closeItem: false
	})
	testimonialsSlider()
	facilitiesCliser()
})
// мобильное меню
function mobMenuToggle() {
	let btn = document.querySelector('.header__navigation-btn-menu')
	let menu = document.querySelector(btn.dataset.toggle)
	let header = document.querySelector('.header')
	btn.addEventListener('click', function (e) {
		btn.classList.toggle('active')
		menu.classList.toggle('active')
		header.classList.toggle('active')
	})
	menu.addEventListener('click', function (e) {
		if (e.target.tagName === 'A') {
			btn.classList.remove('active')
			menu.classList.remove('active')
			header.classList.remove('active')
		}
	})
}

function stickyHeader() {
	let header = document.querySelector('.header')

	if (document.body.getBoundingClientRect().top < 0) {
		header.classList.add('sticky')
	} else {
		header.classList.remove('sticky')
	}

	document.addEventListener('scroll', function () {
		if (document.body.getBoundingClientRect().top < 0) {
			header.classList.add('sticky')
		} else {
			header.classList.remove('sticky')
		}

	})
}

function aboutSlider() {
	var swiper = new Swiper(".about-slider", {
		autoHeight: true,
		pagination: {
			el: ".about-pagination",
		},
	});
}

function aboutVideo() {
	let buttons = document.querySelectorAll('.about-slide__preview-play')
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function (e) {
			let videoId = e.currentTarget.dataset.id
			let frame = document.createElement('iframe')
			frame.classList.add('about-slide__frame')
			frame.src = "https://www.youtube.com/embed/" + videoId
			frame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
			frame.setAttribute('allowfullscreen', true)
			e.currentTarget.parentElement.replaceWith(frame)
		})
	}
}

function smoothScroll() {
	let linkNav = document.querySelectorAll('[href^="#"]')
	let headerHeight = document.querySelector('.header').getBoundingClientRect().height
	let V = 0.2;
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
			e.preventDefault(); //отменяем стандартное поведение
			let w = window.pageYOffset // производим прокрутка прокрутка
			let hash = this.href.replace(/[^#]*(.*)/, '$1');
			let tar = document.querySelector(hash) // к id элемента, к которому нужно перейти
			let t = tar.getBoundingClientRect().top - headerHeight
			let start = null;

			requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
			function step(time) {
				if (start === null) {
					start = time;
				}
				var progress = time - start,
					r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
				window.scrollTo(0, r);
				if (r != w + t) {
					requestAnimationFrame(step)
				} else {
					location.hash = hash // URL с хэшем
				}
			}
			if (t > 1 || t < -1) {
				requestAnimationFrame(step)
			}
		});
	}
}

function accordion(accordionItemSelector, mode) {
	let accordionElements = document.querySelectorAll(accordionItemSelector)
	let openedElement
	for (let i = 0; i < accordionElements.length; i++) {

		if (accordionElements[i].classList.contains('open')) {
			openedElement = accordionElements[i]
		}
		accordionElements[i].addEventListener('click', function (e) {
			if (mode.closeItem) {
				if (openedElement && openedElement !== e.currentTarget) {

					openedElement.classList.remove('open')
				}
				openedElement = e.currentTarget
				if (openedElement.classList.contains('open') && e.target.classList.contains(mode.closeTarget)) {
					openedElement.classList.remove('open')
				} else {
					openedElement.classList.add('open')
				}

			} else {
				if (openedElement) {
					openedElement.classList.remove('open')
				}
				openedElement = e.currentTarget
				openedElement.classList.add('open')
			}

		})
	}
}

function testimonialsSlider() {
	let swiper = new Swiper(".testimonials-slider", {
		slidesPerView: 1,
		spaceBetween: 40,
		navigation: {
			nextEl: ".testimonials-button-next",
			prevEl: ".testimonials-button-prev",
		},

		breakpoints: {
			991: {
				slidesPerView: 2,
				spaceBetweenSlides: 0
			},
		}
	});
}

function facilitiesCliser() {

	let swiper = new Swiper(".facilities-slider-thumb", {
		spaceBetween: 30,
		slidesPerView: 1,
		noSwiper: false,
		speed: 400,
	});
	let swiper2 = new Swiper(".facilities-slider", {
		slidesPerView: 1,
		noSwiper: false,
		speed: 400,
		autoHeight: true,
		navigation: {
			nextEl: ".facilities-button-next",
			prevEl: ".facilities-button-prev",
		},
		thumbs: {
			swiper: swiper,
		},
		pagination: {
			el: ".facilities-pagination",
			type: "fraction",
		},
	});

	let items = document.querySelectorAll('.facilities__hash-item')
	let activeHash
	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function () {
			swiper2.slideTo(i, 400)
		})
	}
	swiper2.on('slideChange', function () {
		document.querySelector('.facilities__hash-item.active').classList.remove('active')
		for (let i = 0; i < items.length; i++) {
			if (i === swiper2.activeIndex) {
				items[i].classList.add('active')
			}
		}
		swiper.slideTo(swiper2.activeIndex, 400)
	});
}