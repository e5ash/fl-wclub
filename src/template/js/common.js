let wrap = document.querySelector('.wrap');


console.log(wrap);
class Services {
	constructor() {
		this.block   = document.querySelector('.services');
		if (!this.block) {
			return false
		}
		this.list    = this.block.querySelector('.services__list');
		this.items   = this.list.querySelectorAll('.service');
		this.y       = this.block.getBoundingClientRect().y;
		this.btnMoreWrap = this.block.querySelector('.services__more-wrap');
		this.btnMore = this.btnMoreWrap.querySelector('.services__more');
		this.hiddenList  = this.block.querySelector('.services__hidden');
		this.hiddenItems = this.hiddenList.querySelectorAll('.services__item');

		
		this.current = this.items[0];

		this.items.forEach((item, i)=>{
			this.initItem(item, i, this.items);
		});

		if (this.current == this.items[this.items.length - 1]) {
			this.current.prev.style.opacity = 1;
		}

		
		// if (this.y < 100 && this.y > -(window.innerHeight + 100)) {
		// 	window.scrollTo(0, this.block.offsetTop);
		// }


		// window.addEventListener('scroll', ()=>{
		// 	console.log('scroll', this.block.offsetTop, window.pageYOffset);
		// })
		// window.addEventListener('whell', ()=>{
		// 	console.log('whell', this.block.offsetTop, window.pageYOffset);
		// })
		

		window.addEventListener('scroll', (e)=>{
			if (window.innerWidth < 768) {
				return false;
			}

			this.y = this.block.getBoundingClientRect().y;

			console.log(e);
			if (this.y <= 150 && this.y >= -150) {
				window.scrollTo(0, this.block.offsetTop);
				if (e.wheelDeltaY < 0) {
					if (this.current.transform == 0) {
						if (this.current.next) {
							window.scrollTo(0, this.block.offsetTop);
							e.preventDefault();
							this.current = this.current.next;
						}
					} else {
						window.scrollTo(0, this.block.offsetTop);
						e.preventDefault();
						this.current.transform -= 10;
						this.current.style.transform = 'translateY('+this.current.transform+'%)';
						if (this.current.prev) {
							this.current.prev.bg.style.opacity = 10 / this.current.transform;
						}
					}
				} else {
					if (this.current.transform == 100) {
						if (this.current.prev) {
							e.preventDefault();
							this.current.prev.bg.style.opacity = 0;
							this.current = this.current.prev;
						}
					} else {
						if (this.current == this.items[0]) {
							return false;
						} else {
							e.preventDefault();
							this.current.transform += 10;
							this.current.style.transform = 'translateY('+this.current.transform+'%)';
							if (this.current.prev) {
								this.current.prev.bg.style.opacity = 10 / this.current.transform;
							}
						}
					}
				}
			}
		});

		if (this.btnMore) {
			this.btnMore.addEventListener('click', ()=>{
				this.btnMoreWrap.classList.add('--hidden');

				let lastItem = this.items[this.items.length - 1];
				lastItem.next = this.hiddenItems[0];
				lastItem.bg.style.opacity = 1;

				this.items.forEach((item, i)=>{
					lastItem.transform = 0;
					lastItem.style.transform = 'translateY('+lastItem.transform+'%)';
				});

				this.hiddenItems.forEach((item, i)=>{
					item.classList.remove('--hidden');
					this.list.append(item);
					if (i == 0) {
						this.initItem(item, i, this.hiddenItems, true);
					} else {
						this.initItem(item, i, this.hiddenItems);
					}
				});

				this.current = this.hiddenItems[0];
				this.current.prev = this.items[this.items.length - 1];

				if (window.innerWidth < 768) {
					this.current.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				} else {
					window.scrollTo(0, this.block.offsetTop);
				}
				
			});
		}
	}

	initItem(item, i, items) {
		item.prev = items[i - 1];
		item.next = items[i + 1];
		item.bg = document.createElement('div');
		item.bg.className = 'service__bg';
		item.append(item.bg);

		if (i == 0) {
			item.transform = 0;
		} else {
			item.transform = 100;	
		}

		item.style.transform = 'translateY('+item.transform+'%)';
	}

	scrollToBlock(){
		this.block.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}
}









document.addEventListener('DOMContentLoaded', ()=>{
	window.scrollTo(0, 0);
	new Services();
	
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


	// var cursor = document.querySelector('.cursor');

	// document.body.onmousemove = function(e) {
	// 	if (e.target.closest('.header') || e.target.closest('.footer')) {
	// 		cursor.classList.add('--hidden');
	// 		return false;
	// 	} else {
	// 		cursor.classList.remove('--hidden');
	// 	}
	// 	cursor.style.left= e.clientX+'px';
	//   cursor.style.top= e.clientY+'px';

	//   // document.body.style.setProperty('--x',(e.clientX)+'px');
 //  	// document.body.style.setProperty('--y',(e.clientY)+'px');
	 
	// }

	

	// let clubName = document.querySelector('.club-name');

	// document.addEventListener('scroll', (e)=>{
	// 	let y = clubName.getBoundingClientRect().y;
	// 	let hPercent = window.innerHeight / 100;
	// 	let yH = (y - (window.innerHeight / 2));

	// 	clubName.style.transform = 'translateX('+(yH / 10)+'%)';
	// });

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
		intro.classList.add('animated');
		wrap.classList.add('--z-index');
	}, 4500);
	setTimeout(()=>{
		lose.classList.add('animated');
	}, 7200);
});