const menuButton = document.body.querySelector(".menu-button")
const visualNav = document.body.querySelector(".visual-nav")
const footer = document.body.querySelector("footer")
const loadingScreen = document.body.querySelector(".loading")
let visitLinks = document.body.querySelectorAll(".visit-link");
let playLinks = document.body.querySelectorAll(".play-link");
let createLinks = document.body.querySelectorAll(".create-link");

function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

onReady(function() {
	loadingScreen.classList.add("hide")

	setTimeout(function(){
		loadingScreen.remove()
	}, 1000)
});

if (menuButton) {
	menuButton.addEventListener("click", function(){
		ToggleVisualNav();
	})
}

function ToggleVisualNav() {
	visualNav.classList.toggle("visible")
	document.body.classList.toggle("no-scroll")
}

pageInit();

var mainContentSwiper = new Swiper('.main-content', {
    slidesPerView: 1,
    spaceBetween: 0,
    hashNavigation: {
    	replaceState: true
    },
    on: {
    	slideChange: function() {
    		UpdateMenus()
    	},
    },
    keyboard: {
    	onlyInViewport: true
    }
    // freeMode: true,
});

var visitSlider = new Swiper('#visit', {
    direction: 'vertical',
	slidesPerView: 1,
	mousewheel: true,
	pagination: {
        el: '.visit-swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    keyboard: {
    	onlyInViewport: true
    }
})

var playSlider = new Swiper('#play', {
    direction: 'vertical',
	slidesPerView: 1,
	mousewheel: true,
	pagination: {
        el: '.play-swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    keyboard: {
    	oonlyInViewport: true
    }
})

var createSlider = new Swiper('#create', {
    direction: 'vertical',
	slidesPerView: 1,
	mousewheel: true,
	pagination: {
        el: '.create-swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    keyboard: {
    	oonlyInViewport: true
    }
})


for(let link of visitLinks) {
	link.addEventListener("click", function(){
		mainContentSwiper.slideTo(0)
		if (link.parentElement == visualNav) {
			ToggleVisualNav();
		}
	})	
}

for(let link of playLinks) {
	link.addEventListener("click", function(){
		mainContentSwiper.slideTo(1)
		if (link.parentElement == visualNav) {
			ToggleVisualNav();
		}
	})	
}

for(let link of createLinks) {
	link.addEventListener("click", function(){
		mainContentSwiper.slideTo(2)
		if (link.parentElement == visualNav) {
			ToggleVisualNav();
		}
	})	
}

function UpdateMenus() {
	if (mainContentSwiper) {
		currentSlide = mainContentSwiper.activeIndex;

		let currentLink = document.body.querySelector(".current");
		let currentMenu = document.body.querySelector("div.pagination:not(.hidden)");
		if (currentLink) {
			currentLink.style.removeProperty("color");
			currentLink.classList.remove("current");
			currentMenu.classList.add("hidden")
		}

		let newCurrentLink = document.querySelector("h2[data-slide='" + currentSlide + "']");
		let newCurrentMenu = document.querySelector("div[data-slide='" + currentSlide + "']");

		console.log(newCurrentLink);
		newCurrentLink.classList.add("current");
		newCurrentMenu.classList.remove("hidden")

		switch(currentSlide) {
			case 0:
				newCurrentLink.style.color = "var(--visit)";
				footer.style.background = "var(--visit)";
				break;

			case 1:
				newCurrentLink.style.color = "var(--play)";
				footer.style.background="var(--play)";
				break;

			case 2:
				newCurrentLink.style.color = "var(--create)";
				footer.style.background="var(--create)";
				break;
		}

	}
}

function pageInit() {
	if (!footer.style.background) {
		let currentLink = document.body.querySelector(".current");
		if (!currentLink) {
			hash = window.location.hash.substring(1)
			if (hash) {
				let currentMenu = document.body.querySelector("div.pagination:not(.hidden)");
				if (currentMenu) {
					currentMenu.classList.add("hidden");
				}

				linkText = "footer ." + hash + "-link";
				let newCurrentMenu, newCurrentLink = document.querySelector(linkText);
				newCurrentLink.classList.add("current");
						
				switch (hash) {
					case "visit":
						newCurrentLink.style.color = "var(--visit)";
						footer.style.background = "var(--visit)";
						newCurrentMenu = document.querySelector("div[data-slide='0']");
						break;

					case "play":
						newCurrentLink.style.color = "var(--play)";
						footer.style.background = "var(--play)";
						newCurrentMenu = document.querySelector("div[data-slide='1']");
						break;

					case "create":
						newCurrentLink.style.color = "var(--create)";
						footer.style.background = "var(--create)";
						newCurrentMenu = document.querySelector("div[data-slide='2']");
						break;

					default:
						break;
				}

				console.log(hash)

				newCurrentMenu.classList.remove("hidden")
			} else {
				link = document.body.querySelector("footer .visit-link");
				link.classList.add("current");
				footer.style.background="var(--visit)";
			}
		}
	}
}


