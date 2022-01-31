let wrap = document.querySelector('.wrap');

document.addEventListener('DOMContentLoaded', ()=>{
	window.scrollTo(0, 0);
	
	let btns = document.querySelectorAll('.btn.--colors-reverse');
	if (btns) {
		btns.forEach((btn)=>{
			btn.inner = btn.querySelector('.btn__inner');
			btn.inner.addEventListener('mouseover', ()=>{
				document.body.classList.add('colors-reverse');
			});
			btn.inner.addEventListener('mouseout', ()=>{
				document.body.classList.remove('colors-reverse');
			});
		});
	}

	let services = document.querySelector('.services');
	if (services) {
		let swiperServices = new Swiper(services, {
			autoplay: {
				delay: 5000,
			},
			speed: 1000,
			loop: true,
			pauseOnMouseEnter: true
		});

		swiperServices.autoplay.stop();
		// services.addEventListener('mouseenter', ()=>{
		// 	swiperServices.autoplay.stop();
		// });
		// services.addEventListener('mouseleaver', ()=>{
		// 	swiperServices.autoplay.star();
		// })
		window.addEventListener('scroll', ()=>{
			let y = services.getBoundingClientRect().y;
			// if ()

			if (y < window.innerHeight) {
				swiperServices.autoplay.start();
			}
		});
	}

	let html = document.querySelector('html');
	let body = document.body;

	let ham = document.querySelector('.header__ham');
	let header = document.querySelector('.header');
	ham.addEventListener('click', ()=>{
		ham.classList.toggle('--toggle');
		header.classList.toggle('--toggle');
		html.classList.toggle('overflow-disabled');
		body.classList.toggle('overflow-disabled');
	});


	let intro = document.querySelector('.intro');
	let lose = document.querySelector('.lose');

	setTimeout(()=>{
		body.classList.add('load-prelouder');
	}, 500);
	
	setTimeout(()=>{
		window.scrollTo(0, 0);
		body.classList.add('loaded');
	}, 4000);

	setTimeout(()=>{
		if (intro) {
			intro.classList.add('animated');
		}
		wrap.classList.add('--z-index');
	}, 4500);
	setTimeout(()=>{
		if (lose) {
			lose.classList.add('animated');
		}
	}, 7200);

  let fields = document.querySelectorAll('.field');
  if (fields) {
    fields.forEach((field)=>{
      field.area = field.querySelector('.field__area');

      if (field.classList.contains('--phone')) {
        IMask(field.area, {
          mask: '+{7} (000) 000-00-00'
        })
      }
    });
  }
});
