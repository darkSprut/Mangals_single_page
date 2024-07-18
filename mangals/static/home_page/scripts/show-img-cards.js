import { swiperInit } from "./swiper_init.js"

function showImgCards() {
    let cards = document.querySelectorAll(".card")
    cards.forEach(function(elem) {
    elem.addEventListener("click", function(event) {
        let parent = elem.parentNode;
        let wrap = parent.querySelector(".card-img-wrap")
        wrap.classList.add("card-img-wrap--on");
        document.body.classList.add('body--block');
        let X = wrap.querySelector(".card-img-wrap--X");
        X.addEventListener("click", function(event) {
            wrap.classList.remove("card-img-wrap--on");
            document.body.classList.remove('body--block');
        })

    })

})
}

document.addEventListener('change-cards', () => {
    showImgCards()
    swiperInit()
})

document.addEventListener('DOMContentLoaded', () => {
    showImgCards()
    swiperInit()
})