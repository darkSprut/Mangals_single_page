const app = Vue.createApp(
    {
        delimiters: ['${', '}$'],
        methods: {
            submitMessage: function() {
                axios.defaults.headers.common['X-CSRFToken'] = this.getCookie('csrftoken');
                axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

                axios.post('submit/',  JSON.stringify({...this})

                ).then(response => {
                    if (!response.data.errors) {
                        this.name = ''
                        this.email = ''
                        this.tel = ''
                        this.message = ''
                        this.posted = true
                    } else {
                        this.name_err = response.data.errors.name ? response.data.errors.name.toLowerCase() : null;
                        this.email_err = response.data.errors.email ? response.data.errors.email.toLowerCase() : null;
                        this.tel_err = response.data.errors.tel ? response.data.errors.tel.toLowerCase() : null;
                        this.message_err = response.data.errors.message ? response.data.errors.message.toLowerCase() : null;
                        this.posted = false
                    }

                })                      

            },

            getCookie: function(key) {

                let cookies_data = {};
                let re = new RegExp('(?<key>.*)=(?<val>.*)')
                let cookies = document.cookie.split(';');

                for (let i = 0; i < cookies.length; i++) {

                    let elem = cookies[0];
                    let result = elem.match(re);
                    cookies_data[result.groups.key] = result.groups.val;
                }
                return cookies_data[key] ? cookies_data[key] : console.warn(`there are no values with this key: ${key}`);
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

                posted: false,
            }
        },

        // mounted() {
        //     this.nameErr = "hello world";
        // }


    }
).mount("#footer");