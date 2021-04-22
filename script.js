//burger-menu
var x = document.getElementById("contain");
var y = document.querySelectorAll('.burger__nav__link');
x.addEventListener("click", myFunction);

function myFunction() {
  var element = document.getElementById("nav");
  element.classList.toggle("open");
  x.classList.toggle("change");
}
for (let anchor of y) {
  anchor.addEventListener('click', function (e) {
		var element = document.getElementById("nav");
  	element.classList.toggle("open");
  	x.classList.toggle("change");
  })
}

const anchors = document.querySelectorAll('a[href*="#"]')
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

//slider
var multiItemSlider = (function () {
  return function (selector, config) {
    var
      _mainElement = document.querySelector(selector), 
      _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), 
      _sliderItems = _mainElement.querySelectorAll('.slider__item'), 
      _sliderBtns = _mainElement.querySelectorAll('.slider__btn'),
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), 
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),    
      _positionLeftItem = 0,
      _transform = 0, 
      _step = _itemWidth / _wrapperWidth * 100, 
      _items = [];
		
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });
    var position = {
      getItemMin: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return _items[position.getItemMin()].position;
      },
      getMax: function () {
        return _items[position.getItemMax()].position;
      }
    }
    var _transformItem = function (direction) {
      var nextItem, ind;
      if (direction === 'right') {
        _positionLeftItem++;
        if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
					ind=nextItem;
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform -= _step;
      }
      if (direction === 'left') {
        _positionLeftItem--;
        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';	
        }
        _transform += _step;
      }
			_mainElement.style.background=_items[nextItem].item.style.background;
			document.getElementById("slider__line").style.background=_items[nextItem].item.style.background;
			document.getElementById("slider__line").style.background="rgba(0,0,0,.05)";
      _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';	
    }
        
    var _btnClick = function (e) {
      if (e.target.classList.contains('slider__btn')) {
        e.preventDefault();
        var direction = e.target.classList.contains('slider__btn_right') ? 'right' : 'left';
        _transformItem(direction);
      }
    };
    var _setUpListeners = function () { 
      _sliderBtns.forEach(function (item) {
        item.addEventListener('click', _btnClick);
      });
    }
        
    _setUpListeners();
    return {
      right: function () {
        _transformItem('right');
      },
      left: function () {
        _transformItem('left');
      }
    }
  }
}());
var slider = multiItemSlider('.slider')

//turn on/off phone
const imgs = document.querySelectorAll('img[id="slider__phone"]')
for (let img of imgs) {
  img.addEventListener('click', function () {
  img.classList.toggle("view");
});
}

//portfolio images borders
const imgs_portfolio = document.getElementsByClassName("portfolio__image");
for (let img of imgs_portfolio) {
	img.addEventListener('click', function () {
		for (let im of imgs_portfolio) {
		  im.style.boxShadow = 'none';
		}
		img.style.boxShadow = '0px 0px 0px 6px #F06C64';
  });
}

//portfolio items mix
const buttons_portfolio = document.getElementsByClassName("tag__item");
for (let btn of buttons_portfolio) {
	btn.addEventListener('click', function () {
		for (let bt of buttons_portfolio) {
		  bt.style.border = '1px solid rgb(102, 109, 137)';
			bt.style.color = 'rgb(102, 109, 137)';
		}
		btn.style.border = '1px solid white';
		btn.style.color = 'white';

		var portfolio__items = document.querySelector('.portfolio__items__container');
    var portfolio__items__images = portfolio__items.querySelectorAll('.portfolio__item');
		var mas=[3,9,1,6,8,4,11,10,2,5,7,0];
		for (var i = 0; i < portfolio__items__images.length; i++) {
      portfolio__items.appendChild(portfolio__items__images[mas[i]]);
    }
  });
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
		var button_close = document.getElementsByClassName("modal__close__btn")[0];
		var subject = document.getElementById('subject');
		var description = document.getElementById('description');
		subject.textContent = subj+elems[2].value;
		description.textContent = descr+elems[3].value;
		modal.style.display = "block";
		button_close.onclick = function() {
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

