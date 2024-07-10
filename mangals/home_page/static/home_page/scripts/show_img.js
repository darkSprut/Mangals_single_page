let cards = document.querySelectorAll(".card");

cards.forEach(function(elem) {

    elem.addEventListener("click", function(event) {

        let parent = elem.parentNode;
        let wrap = parent.querySelector(".card-img-wrap")
        wrap.classList.add("card-img-wrap--on");
        let X = wrap.querySelector(".card-img-wrap--X");

        X.addEventListener("click", function(event) {
            wrap.classList.remove("card-img-wrap--on");
        })

    })

})
