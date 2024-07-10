const app = Vue.createApp(
    {
        methods: {
            submitMessage() {
                fetch('submit/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=utf-8', 'X-CSRFToken': this.getCookie('csrftoken') },
                    body: JSON.stringify(this.data),
                }      
            )
            },

            getCookie(key) {

                let cookies_data = {};
                let re = new RegExp('(?<key>.*)=(?<val>.*)')
                let cookies = document.cookie.split(';');

                for (let i = 0; i < cookies.length; i++) {

                    let elem = cookies[0];
                    let result = elem.match(re);
                    cookies_data[result.groups.key] = result.groups.val;

                }
                return cookies_data[key];
            }
        },

        mounted() {
            this.getCookie();
        },

        data() {
            return {
                data: {
                    email: '',
                    tel: '',
                    message: '',
                }
 
            }
        }

    }
).mount("#footer");


// app.config.errorHandler = function (err) {

// }