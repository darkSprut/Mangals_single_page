document.addEventListener("DOMContentLoaded", function(){

        let element = document.querySelector('#exampleFormControlInput3');
        let digit_code = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] 

        // устранение автозаполнения из формы браузера

        element.addEventListener('change', function(event) {
            setTimeout(() => {
                element.value = '+7 '
            }, 400)
        })

        element.addEventListener('click', function(event) {
            if (element.value == '') {
                element.value = '+7 '
            }

        })

    element.addEventListener('keydown', function(event) {
        if (element.value == '+7 ' && event.code == 'Backspace') {
            event.preventDefault()
        } 
        if (element.value == '') {
            event.preventDefault()
            element.value += '+7 '
        }

        if (element.value.length >= 16 && event.code != 'Backspace') {
                event.preventDefault()
        }

        if (element.value.length == 6 && event.code != 'Backspace') {
            element.value += ' '
        } else if (element.value.length == 10 && event.code != 'Backspace') {
            element.value += ' '
        } else if (element.value.length == 13 && event.code != 'Backspace') {
            element.value += ' '
        }

        if (event.code != 'Backspace') {
            if (event.key in digit_code == false | event.code == 'Space') {
                event.preventDefault()
            }
        }
    })

})


