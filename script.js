const anchors = document.querySelectorAll('a[href*="#"]')

//highlighting a menu item by block
var scrollTop;
window.addEventListener('scroll', function() { 
  scrollTop = window.scrollY;
  for (let anchor of anchors) {
		if(scrollTop>=document.getElementById(anchor.getAttribute('href').substr(1)).offsetTop) {
			for (let anch of anchors) {
				anch.style.color = 'white';
			}
			anchor.style.color='rgb(240, 108, 100)';
	  }
  }
});

//smooth transition to clicking on the menu
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
		for (let anch of anchors) {
		  anch.style.color = 'white';
		}
		e.preventDefault()
		anchor.style.color = 'rgb(240, 108, 100)';
    const blockID = anchor.getAttribute('href').substr(1)
    var hiddenElement = document.getElementById(blockID);
    hiddenElement.scrollIntoView({block: "start", behavior: "smooth"});
  })
}

//turn on/off phone
const imgs = document.querySelectorAll('img[id="slider__phone"]')
for (let img of imgs) {
  img.addEventListener('click', function () {
  img.classList.toggle("view");
});
}

//slider
var slideIndex = 1;
showSlides(slideIndex);
function plusSlide() {
  showSlides(slideIndex += 1);
}
function minusSlide() {
  showSlides(slideIndex -= 1);  
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slider__item");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
	document.getElementById("sldr").style.background=slides[slideIndex - 1].style.background;
	document.getElementById("slider__line").style.background=slides[slideIndex - 1].style.background;
	document.getElementById("slider__line").style.background="rgba(0,0,0,.05)";
}

//portfolio
const imgs_portfolio = document.querySelectorAll('img[class="portfolio__image"]');
for (let img of imgs_portfolio) {
	img.addEventListener('click', function () {
		for (let im of imgs_portfolio) {
		  im.style.outline = '0px';
		}
		img.style.outline = '5px solid #F06C64';
  });
}

const buttons_portfolio = document.querySelectorAll('button[class="tag__item"]');
for (let btn of buttons_portfolio) {
	btn.addEventListener('click', function () {
		for (let bt of buttons_portfolio) {
		  bt.style.border = '1px solid rgb(102, 109, 137)';
		}
		btn.style.border = '2px solid white';

		var images_portfolio = document.getElementsByClassName("portfolio__image");
		var items_arr = [0,1,2,3,4,5,6,7,8,9,10,11];
		var items_arr_new = shuffle(items_arr);
		var images = [];
		
		for(var i=0;i<images_portfolio.length; i++){
			images[i]=images_portfolio[items_arr_new[i]];
		}
 
// создаём ссылку на существующий элемент который будем заменять
var sp2 = document.getElementsByClassName("portfolio__image");
var parentDiv = sp2.parentNode;

// заменяем существующий элемент sp2 на созданный нами sp1
parentDiv.replaceChild(images, sp2);
 
/*for(var i=0; i<arr.length; i++){
  document.querySelectorAll('img[class="portfolio__image"]')[i].replaceChild(document.querySelectorAll('img[class="portfolio__image"]')[i],images[i]);
}*/

		
  });
}

/*
for (let btn of buttons_portfolio) {
	btn.addEventListener('click', function () {
		const items_portfolio = document.getElementsByClassName("portfolio__item");
		var items_new = [2,4,5];
		console.log(items_new);
    items_new = shuffle(items_portfolio);
		alert(items_portfolio);
		console.log(shuffle(items_portfolio));
    /*for (var i = 0; i < items_portfolio.length; i++) {
      items_portfolio[i]=items_new[i];
		}*/


 /* });
}*/

function shuffle(arr) {
	let result = [];
	while (arr.length > 0) {
		let random = getRandomInt(0, arr.length - 1);
		let elem = arr.splice(random, 1)[0];
		result.push(elem);
	}
	return result;
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



//get a quote
var btn = document.getElementById('submit');
btn.addEventListener('click', function (e) {
	e.preventDefault();

	var elems = window.document.getElementsByClassName("form__element");
	var name=elems[0].value, email=elems[1].value;
	var emailRegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
	if(name=='' || email=='') {
		alert('Fill in the required fields');
	} else if (emailRegExp.test(email)) {
		var subj = 'Subject: ', descr = 'Description: ';
		if(elems[2].value=='') {
			subj = 'No subject';
		}
		if(elems[3].value=='') {
			descr = 'No description'; 
		}
		var modal = document.getElementById('myModal');
		var span = document.getElementsByClassName("modal__close__btn")[0];
		var sbj = document.getElementById('subject');
		var dscr = document.getElementById('description');
		sbj.textContent = subj+elems[2].value;
		dscr.textContent = descr+elems[3].value;
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
			document.getElementById("form").reset();
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
				document.getElementById("form").reset();
			}
		}			
	} else {
		alert('Invalid email address');
	}
});

