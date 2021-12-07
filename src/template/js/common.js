document.addEventListener('DOMContentLoaded', ()=>{
	// let roundTexts = document.querySelectorAll('.round-text');
	// if (roundTexts) {
	// 	roundTexts.forEach((text)=>{
	// 		text.letters = text.innerText.split('');
	// 		text.innerText = '';

	// 		let w = text.offsetWidth;
	// 		let h = text.offsetHeight;
	// 		let radius = 70;
	// 		let circleLength = 2 * Math.PI * radius;
	// 		let angleRad = w/(2*radius);
	// 		let angle = 2 * angleRad * 180/Math.PI/text.letters.length;

	// 		console.log(angle, text.letters.length * angle / 2, text.letters.length * angle);
	// 		text.letters.forEach((letter, index)=>{
	// 			let l = document.createElement('i');
	// 			l.innerText = letter;


	// 			l.style.transform = `translate(${w/2}px,0px) rotate(${index * angle - text.letters.length * angle / 2}deg)`;

	// 			text.append(l);
	// 		});
	// 		console.log(text.letters);
	// 	});
	// }
	
	let btns = document.querySelectorAll('.btn.--colors-reverse');
	if (btns) {
		btns.forEach((btn)=>{
			btn.inner = btn.querySelector('.btn__inner');
			btn.inner.addEventListener('mouseover', ()=>{
				console.log(1);
				document.body.classList.add('colors-reverse');
			});
			btn.inner.addEventListener('mouseout', ()=>{
				document.body.classList.remove('colors-reverse');
			});
		});
	}

	let texts = document.querySelectorAll('.t');
	// if (texts) {
	// 	texts.forEach((t)=>{
	// 		t.textClone = document.createElement('span');
	// 		t.textClone.className = 'span-dobule';
	// 		t.textClone.innerText = t.innerText
	// 		t.append(t.textClone);
	// 	});
	// }

	var cursor = document.querySelector('.cursor');

	document.body.onmousemove = function(e) {
		if (e.target.closest('.header') || e.target.closest('.footer')) {
			cursor.classList.add('--hidden');
			return false;
		} else {
			cursor.classList.remove('--hidden');
		}
		cursor.style.left= e.clientX+'px';
	  cursor.style.top= e.clientY+'px';

	  document.body.style.setProperty('--x',(e.clientX)+'px');
  	document.body.style.setProperty('--y',(e.clientY)+'px');
	 
	}


	let servicesList = document.querySelectorAll('.services__list');
	if (servicesList) {
		servicesList.forEach((list)=>{
			list.items = list.querySelectorAll('.service');
			list.style.height = (list.items.length * window.innerHeight) + 'px';
		});
	}	

	let services = document.querySelectorAll('.service');
	if (services) {
		services.forEach((service, i)=>{
			service.bg = document.createElement('div');
			service.bg.className = 'service__bg';
			service.append(service.bg);

			service.style.top = window.innerHeight * i + 'px';
			service.style.height = window.innerHeight + 'px';

			service.inner = service.querySelector('.service__inner');
			if (services[i - 1]) {
				service.prev = services[i - 1];
			}

			service.y = service.getBoundingClientRect().y;
		});
	}

	document.addEventListener('scroll', (e)=>{
		e.preventDefault();

		let pWH = window.innerHeight / 100;
		services.forEach((service, i)=>{
			// if (service)
			// let yPercent = y / pWH;
			let y = service.getBoundingClientRect().y;

			if (i==0)
			console.log(service.y, window.pageYOffset);

			if (window.pageYOffset <= service.y) {
				service.inner.style.transform = 'translateY('+(y)+'px)';
			} else {
				service.inner.style.transform = 'translateY('+(-y)+'px)';
				// service.style.transform = 'translateY('+(-y)+'px)';
			}

			// if (yPercent>=0) {
			// 	service.style.transform = 'translateY('+(-yPercent)+'%)';
			// }

			// if (i == 0) {
			// 	console.log(-yPercent);
			// 	// console.log(yPercent, -1 / (100 - yPercent));
			// }
			
			// if (yPercent>=0) {
			// 	if (i == 0) return false;
			// 	// service.bg.style.opacity = -1 / (100 - yPercent);

			// 	// service.prev.inner.style.transform = 'translateY('+(yPercent)+'%)';
			// 	service.inner.style.transform = 'translateY('+yPercent+'%)';
			// } else {
			// 	service.bg.style.opacity = 1 / yPercent;
			// 	service.style.transform = 'translateY('+(-yPercent)+'%)';
			// 	// service.inner.style.transform = 'translateY('+0+'%)';
			// 	service.inner.style.transform = 'translateY('+0+'%)';
			// }

			
		});
	});
	
});