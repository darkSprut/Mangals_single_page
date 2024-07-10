const app = Vue.createApp(
    {
        methods: {
            submitMessage() {

                axios.defaults.headers.common['X-CSRFToken'] = this.getCookie('csrftoken');
                axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

                axios.post('submit/',  JSON.stringify({...this})      
            ).then((resp) => {
                console.log(resp.data)
            })
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
                return cookies_data[key] ? cookies_data[key] : console.warn(`there are no values with this key: ${key}`);
            }
        },

        mounted() {

        },

        data() {
            return {
                name: '',
                email: '',
                tel: '',
                message: '', 
            }
        }

    }
).mount("#footer");