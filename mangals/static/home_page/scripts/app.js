const app = Vue.createApp(
    {
        delimiters: ['${', '}$'],
        methods: {
            submitMessage: function() {
                axios.defaults.headers.common['X-CSRFToken'] = this.getCookie('csrftoken');
                axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
                this.waiting_response = true
                axios.post('submit/',  JSON.stringify({...this})
                ).then(response => {
                    if (!response.data.errors) {
                        this.waiting_response = false
                        this.name = ''
                        this.email = ''
                        this.tel = ''
                        this.message = ''
                        this.name_err = null
                        this.tel_err = null
                        this.email_err = null
                        this.message_err = null
                        this.show_envelope = true
                        this.posted = true
                        this.timer_actual = this.timer_default
                        this.startTimer()
                    } else {
                        this.waiting_response = false
                        this.name_err = response.data.errors.name ? response.data.errors.name.toLowerCase() : null;
                        this.email_err = response.data.errors.email ? response.data.errors.email.toLowerCase() : null;
                        this.tel_err = response.data.errors.tel ? response.data.errors.tel.toLowerCase() : null;
                        this.message_err = response.data.errors.message ? response.data.errors.message.toLowerCase() : null;
                        this.posted = false
                    }

                })                      

            },
            getProducts: function() {
                axios.defaults.headers.common['X-CSRFToken'] = this.getCookie('csrftoken');
                axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
                this.waiting_response = true
                axios.get(`products/${this.count_products_in_page}/`,  JSON.stringify({...this})
            ).then(response =>{
                this.waiting_response = false
                this.products = response.data
                if (this.products.length == this.count_products_in_page) {
                    this.show_more = false
                } else {
                    this.count_products_in_page += 2
                }
            })
            },

            startTimer: function () {
                setInterval(() => {
                    if (this.timer_actual > 0) {
                        this.timer_actual--
                        document.cookie = `timer=${this.timer_actual}; max-age=${this.timer_actual}`
                        document.cookie = `timer_created_at=${this.timeNowInSeconds()}; max-age=${this.timer_actual}`
                    } else {
                        this.posted = false
                    }
                }, 1000)

            },

            timeNowInSeconds: function () {
                return (Date.now()/1000)>>0
            },

            abilityToSend: function () {
                let timer_created_at = this.getCookie('timer_created_at');
                let now = this.timeNowInSeconds()
                let time = this.getCookie('timer') ? Number(this.getCookie('timer')) : null;
                if (time && time > 0) {
                    this.posted = true
                    this.timer_actual = time - (Number(now) - Number(timer_created_at))
                    this.startTimer()
                } else {
                    this.posted = false
                }
            },

            getCookie: function(key_cookie) {
                let cookies_data = {};
                let re = new RegExp('(?<key>.*)=(?<val>.*)')
                let cookies = document.cookie.split('; ');

                for (let i = 0; i < cookies.length; i++) {

                    let elem = cookies[i];
                    let result = elem.match(re);
                    cookies_data[result.groups.key] = result.groups.val;
                }
                return cookies_data[key_cookie] ? cookies_data[key_cookie] : null;
            }
        },

        data() {
            return {
                name: '',
                email: '',
                tel: '',
                message: '',
                name_err: null,
                email_err: null,
                tel_err: null,
                message_err: null,
                products: null,
                count_products_in_page: 0,
                posted: false,
                timer_default: 30,
                timer_actual: null,
                show_envelope: false,
                show_more: true,
                waiting_response: false,
            }
        },

        mounted() {
            this.abilityToSend()
            this.getProducts()

        },


    }
).mount("#body");