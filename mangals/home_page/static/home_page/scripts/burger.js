let burger = document.querySelector('.burger');
let nav = document.querySelector('.nav-m');
let main = document.querySelector('.main');
let X = document.querySelector('.X');
let links = document.querySelectorAll('.link-simple');

function removeClass() {
    nav.classList.remove('nav-m--on');
    burger.classList.remove('burger--on');
    main.classList.remove('main--block');
    document.body.classList.remove('body--block');
    header.classList.remove('header--block');
}

let header = document.querySelector('.header');

burger.addEventListener('click', function(event) {
    nav.classList.add('nav-m--on');
    burger.classList.add('burger--on');
    main.classList.add('main--block');
    document.body.classList.add('body--block');
    header.classList.add('header--block');
})

// можно закрыть свайпом влево

nav.addEventListener('touchstart', function(event) {
    let pos1 = event.changedTouches[0].clientX;
    nav.addEventListener('touchend', function(event) {
        let pos2 = event.changedTouches[0].clientX;
        if (pos2 < pos1) {
            removeClass()
        }
        pos1 = null;
        pos2 = null;
    })
})

X.addEventListener('click', function(event) {
    removeClass()
})

links.forEach(function(link) {
    link.addEventListener('click', function(event) {
        removeClass()
    })
})

