// split JS
const headTxt = new SplitType('.font_up', { types: 'words, chars' });

// header
const headerTl = new gsap.timeline();
headerTl.from('.header .logo-area', {
    delay: 0.3,
    duration: 1.5,
    scale: 0,
    ease: 'power4.out',
});

headerTl.from(
    '.header .nav-area > ul > li',
    {
        duration: 1.5,
        y: -150,
        stagger: 0.1, //0.1초 간격으로
        ease: 'power4.out',
    },
    '-=1.2', //타임라인 종료 1.2초전
);

headerTl.from(
    '.header .btn-open .svgbox',
    {
        duration: 1,
        scaleX: 0,
        ease: 'power4.out',
    },
    '-=.7', //타임라인 종료 0.7초전
);

// visual word
const wordTl = new gsap.timeline({ repeat: -1, repeatDelay: 3 });
wordTl.from($('.sc-visual .font_up .char'), {
    duration: 0.6,
    // delay: 0,
    stagger: 0.105,
    y: -20,
    opacity: 0,
    ease: 'expot.Out',
});

wordTl.to($('.sc-visual .font_up .char'), {
    duration: 0.6,
    delay: 4,
    stagger: 0.105,
    y: 20,
    opacity: 0,
    ease: 'expot.Out',
});

// sc-shortcut(1&2) title
$('.sc-shortcut').each(function (i, el) {
    const headlineTl = new gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: 'top 65%',
            // markers: true,
        },
        defaults: { duration: 0.4, ease: 'expot.Out' },
    });
    headlineTl.from($(this).find('.headline'), { autoAlpha: 0, y: 70, stagger: 0.1 }, 'a');
    headlineTl.from($(this).find('.desc'), { autoAlpha: 0, delay: 0.2, stagger: 0.1 }, 'a+=0.3');
});

// sc-about strong title
const aboutTl = new gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-about',
        start: 'top 80%',
        // markers: true,
    },
    defaults: { duration: 0.45, ease: 'power2.out' },
});
aboutTl.from('.sc-about .item', { autoAlpha: 0, y: 50, stagger: 0.3 }, 'a');
aboutTl.from('.sc-about .item img', { autoAlpha: 0, scale: 0.8, delay: 0.1, stagger: 0.3 }, 'a');

// aboutTl.timeScale(1.5);

// sc-product scroll slide
ScrollTrigger.matchMedia({
    '(min-width: 768px)': function () {
        const prdTl = new gsap.timeline({
            scrollTrigger: {
                trigger: '.sc-product',
                start: '0% 100%',
                end: '100% 0%',
                scrub: true,
                // markers: true,
            },
        });
        prdTl.set('.sc-product .list', {
            xPercent: 20,
        });
        prdTl.to('.sc-product .list', {
            xPercent: -20, // 가로 스크롤할 거리
            ease: 'none', // 이징 효과(기본값: linear) 없앰
        });
    },
});

// sc-banner title
const bannerTl = new gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-banner',
        start: 'top 60%',
    },
});
bannerTl.from('.sc-banner .headline', { autoAlpha: 0, y: 50 }, 'b');
bannerTl.from('.sc-banner .desc', { autoAlpha: 0, delay: 0.2 }, 'b');
