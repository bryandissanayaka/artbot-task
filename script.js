class ProductCarousel {
    constructor() {
        this.currentIndex = 0;
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;
        
        this.ANIMATION_DURATION = 0.5;
        this.AUTO_PLAY_DELAY = 1500;
        
        this.products = [
            {
                image: 'assets/micro-bags@2x.png',
                title: 'Micro Bags'
            },
            {
                image: 'assets/mens-scarf-and-briefcase@2x.png',
                title: 'Small Check<br>Merino Wool Scarf'
            },
            {
                image: 'assets/mini-alexa@2x.png',
                title: 'Mini Alexa in<br>Amethyst'
            },
            {
                image: 'assets/lily@2x.png',
                title: 'Medium Lily in<br>Sapphire'
            }
        ];
        
        this.productImg = document.getElementById('product-img');
        this.productImgNext = document.getElementById('product-img-next');
        this.productTitle = document.getElementById('product-title');
        this.productTitleNext = document.getElementById('product-title-next');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startAutoPlay();
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.previousSlide(true);
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.nextSlide(true);
        });
    }
    
    updateSlide(index, instant = false) {
        const product = this.products[index];
        
        if (instant) {
            this.productImg.src = product.image;
            this.productTitle.innerHTML = product.title;
        } else {
            this.productImgNext.src = product.image;
            this.productTitleNext.innerHTML = product.title;
            
            gsap.to([this.productImgNext, this.productTitleNext], {
                opacity: 1,
                duration: this.ANIMATION_DURATION,
                ease: "power2.out"
            });
            
            gsap.to([this.productImg, this.productTitle], {
                opacity: 0,
                duration: this.ANIMATION_DURATION,
                ease: "power2.out",
                onComplete: () => {
                    this.productImg.src = product.image;
                    this.productTitle.innerHTML = product.title;
                    gsap.set([this.productImg, this.productTitle], { opacity: 1 });
                    gsap.set([this.productImgNext, this.productTitleNext], { opacity: 0 });
                    
                    if (this.isAutoPlaying) {
                        this.scheduleNextTransition();
                    }
                }
            });
        }
    }
    
    nextSlide(instant = false) {
        this.currentIndex = (this.currentIndex + 1) % this.products.length;
        this.updateSlide(this.currentIndex, instant);
    }
    
    previousSlide(instant = false) {
        this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
        this.updateSlide(this.currentIndex, instant);
    }
    
    startAutoPlay() {
        this.isAutoPlaying = true;
        this.scheduleNextTransition();
    }
    
    scheduleNextTransition() {
        if (this.autoPlayInterval) {
            clearTimeout(this.autoPlayInterval);
        }
        this.autoPlayInterval = setTimeout(() => {
            if (this.isAutoPlaying) {
                this.nextSlide();
            }
        }, this.AUTO_PLAY_DELAY);
    }
    
    stopAutoPlay() {
        this.isAutoPlaying = false;
        if (this.autoPlayInterval) {
            clearTimeout(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductCarousel();
});