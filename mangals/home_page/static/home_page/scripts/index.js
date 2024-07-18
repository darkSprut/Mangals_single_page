import { app } from "./app.js";


const x = Vue.createApp(
    {
        delimiters: ['${', '}$'],
        components: app,
        methods: {
            submitMessage: function() {
                axios.defaults.headers.common['X-CSRFToken'] = app.methods.getCookie('csrftoken');
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
                axios.defaults.headers.common['X-CSRFToken'] = app.methods.getCookie('csrftoken');
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
                this.genEventChangeCards()
            })
            },

            genEventChangeCards: function() {
                setTimeout(() =>{
                    let event = new Event('change-cards', {
                        bubbles: true,
                    })
                    document.dispatchEvent(event);
                }, 300)
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
                let timer_created_at = app.methods.getCookie('timer_created_at');
                let now = this.timeNowInSeconds()
                let time = app.methods.getCookie('timer') ? Number(app.methods.getCookie('timer')) : null;
                if (time && time > 0) {
                    this.posted = true
                    this.timer_actual = time - (Number(now) - Number(timer_created_at))
                    this.startTimer()
                } else {
                    this.posted = false
                }
            },
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
                card_selector: '.card',
            }
        },

        mounted() {
            this.abilityToSend()
            this.getProducts()
            
        },
    }
).mount("#body");
