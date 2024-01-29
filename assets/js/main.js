const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add(time => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* swiper */

function resetSlideMotion() {
    gsap.set('.sc-visual .txt-box .word', { opacity: 0 });
    gsap.set('.sc-visual .txt-box .headline', { opacity: 0, x: -20 });
    gsap.set('.sc-visual .txt-box .more', { opacity: 0 });
}

function slideTextMotion(idx) {
    let titleTlBase = new gsap.timeline({
        defaults: {
            duration: 0.6,
            ease: 'expot.Out',
        },
    });
    titleTlBase.to($(`.sc-visual .swiper-slide:not(:eq(${idx}))`).find('.txt-box .word'), {
        opacity: 0,
    });
    titleTlBase.to($(`.sc-visual .swiper-slide:not(:eq(${idx}))`).find('.txt-box .headline'), {
        x: -20,
        opacity: 0,
    });
    titleTlBase.to($(`.sc-visual .swiper-slide:not(:eq(${idx}))`).find('.txt-box .more'), {
        opacity: 0,
    });

    let titleTl = new gsap.timeline({
        defaults: {
            duration: 0.6,
            ease: 'expot.Out',
        },
    });
    titleTl.to($('.sc-visual .swiper-slide').eq(idx).find('.txt-box .word'), {
        delay: 1,
        stagger: 0.2,
        opacity: 1,
    });
    titleTl.to($('.sc-visual .swiper-slide').eq(idx).find('.txt-box .headline'), {
        x: 0,
        opacity: 1,
    });
    titleTl.to($('.sc-visual .swiper-slide').eq(idx).find('.txt-box .more'), {
        opacity: 1,
    });
}

// main visual slide
const mainVisual = new Swiper('.sc-visual .swiper', {
    pagination: {
        el: '.pagination',
        clickable: true,
    },
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    // loop: true,
    speed: 1000,
    on: {
        init: function () {
            $(`.swiper-slide:eq(0) .img-box`).addClass('animove');
            resetSlideMotion();
            slideTextMotion(this.realIndex);
        },
        slideChangeTransitionStart: function () {
            $(`.swiper-slide .img-box`).removeClass('animove');
            $('.swiper-slide').eq(this.realIndex).find('.img-box').addClass('animove');

            slideTextMotion(this.realIndex);
        },
    },
});

// 비주얼 이미지 움직임 스크롤
gsap.to('.sc-visual .img-box', {
    scrollTrigger: {
        trigger: '.sc-visual',
        start: '0% 0%',
        end: '100% 0%',
        // markers: true,
        scrub: 0,
    },
    yPercent: 20,
    ease: 'none',
});

/* index */
// all-gnb
$('.header .btn-open').click(function () {
    openMenu();
});
$('.gnb-header .btn-close').click(function () {
    closeMenu();
});

let gnbTl = new gsap.timeline({
    default: {
        ease: 'expo.out',
    },
});
gnbTl.set('.all-gnb', { opacity: 1 }); //초기 설정
gnbTl.to('.gnb-bg > div', { duration: 0.6, height: '100vh', ease: 'power4.inOut', stagger: 0.15 });
gnbTl.from('.gnb-header .logo-area', { duration: 0.6, y: -140, opacity: 0 }, '-=.6');
gnbTl.from('.gnb-header .lang-area', { duration: 0.6, y: -20, opacity: 0, stagger: 0.1 }, '-=.3');
gnbTl.from('.gnb-header .appt-area', { duration: 0.6, y: -20, opacity: 0, stagger: 0.1 }, '-=.6');
gnbTl.from('.gnb-header .btn-close .svg', { duration: 0.6, opacity: 0, rotate: '90deg' }, '-=.45');
gnbTl.to('.gnb-list', { duration: 0.6, opacity: 1 }, '-=1.45');
gnbTl.from('.gnb-list > .gnb-item', { duration: 1, y: -140, opacity: 0, stagger: 0.02 }, '-=1.6');
gnbTl.from('.gnb-list > .gnb-item > *', { duration: 0.6, y: -20, opacity: 0, stagger: 0.03 }, '-=1');
gnbTl.pause(); //stop

let scaleTl = new gsap.timeline();
scaleTl.to('.scale-inner', { duration: 0.6, '--bg': 'rgba(0, 0, 0, .5)', scale: (0.9, 0.9) });
scaleTl.pause(); //stop

// toggleClass 클릭이벤트에 따로 뺐더니 타이밍이 살짝 어긋남
function openMenu() {
    $('.all-gnb').addClass('open');
    $('.scale-inner').css('--index', '3');
    $('body, html').addClass('hidden');
    // (참고)lenis로인해 body에만 주면 hidden클래스 안먹음
    lenis.stop();
    gnbTl.timeScale(1.1).play();
    scaleTl.play();
}

function closeMenu() {
    $('.all-gnb').removeClass('open');
    $('.scale-inner').css('--index', '0');
    $('body, html').removeClass('hidden');
    lenis.start();
    gnbTl.timeScale(2.2).reverse();
    scaleTl.reverse();
}

// header
let lastScroll = 0;
$(window).scroll(function () {
    current = $(this).scrollTop();
    visualH = $('.sc-visual').height();
    bottomScroll = $(document).height() - $(window).height();

    // visualH
    // 비주얼 높이 절반 기준
    if (current >= visualH / 2) {
        $('.header').addClass('updown');
    } else {
        $('.header').removeClass('updown');
    }

    // 비주얼 넘어가면 헤더 색상변경
    if (current >= visualH) {
        $('.header').addClass('white');
        // $('.appointment').removeClass('show');
    } else {
        $('.header').removeClass('white');
    }

    //스크롤 내리면 보이고, 올리면 숨기기
    if (current > lastScroll) {
        $('.header').addClass('updown');
    } else {
        $('.header').removeClass('updown');
    }
    lastScroll = current;

    if (Math.floor(current) + 1 >= bottomScroll) {
        // 스크롤 맨끝에 도달시, (오차 범위: 1)
        $('.header').removeClass('updown');
    }

    // 예약하기 조절
    if (Math.floor(current) > bottomScroll - Math.floor($(window).height() / 1.3)) {
        $('.appointment').addClass('show');
    } else {
        $('.appointment').removeClass('show');
    }
    if (current < visualH) {
        $('.appointment').addClass('show');
    }
});

// sc-shortcut, sc-banner - 콘텐츠에 맞는 폰트 반응형 자동조절
function adjustFontSize(section) {
    const txtBox = document.querySelectorAll(section);

    txtBox.forEach(content => {
        const textElement = content.querySelector('.headline');
        const contentWidth = content.clientWidth - 40; // 양쪽여백값
        const textWidth = textElement.scrollWidth;

        // 동적으로 최대 폰트 크기 계산
        const maxFontSize = (contentWidth / textWidth) * 60;
        const fontSize = Math.min(maxFontSize, 60); // 최대 60px

        textElement.style.fontSize = fontSize + 'px';
    });
}

// 페이지 로드 후 처음 한 번 실행
window.addEventListener('load', adjustFontSize('.sc-shortcut .txt-box'));
window.addEventListener('load', adjustFontSize('.sc-banner .txt-box'));

// 윈도우 크기가 변경될 때마다 디바운스를 적용한 실행
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        adjustFontSize('.sc-shortcut .txt-box');
        adjustFontSize('.sc-banner .txt-box');
    }, 250); // 250ms 디바운스
});
