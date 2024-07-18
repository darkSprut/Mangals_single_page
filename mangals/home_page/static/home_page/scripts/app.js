const app = {
    methods: {
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

        }
    }
}


export {app}
