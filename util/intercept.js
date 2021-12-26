import axios from "axios";
import store from "../store/index";
import router from "../router/index";


export default () => {
    //请求拦截
    axios.interceptors.request.use(config => {
        store.commit('getUserMess')
        // Do something before request is sent
        if(store.state.cookie){
            config.params.cookie = store.state.cookie
        }
        return config;
    }, error => {
        // Do something with request error
        return Promise.reject(error);
    });

    // 响应拦截
    axios.interceptors.response.use(response => {
        // Do something before response is sent
        if(response.status >= 200 && response.status < 300){
            const data = response.data
            if(data.code === 301){
                store.commit('getUserMess')
                //当cookie过期之后 跳转到login界面
                router.replace({path:'/login'})
            }
            return data
        }
        return response;
    }, error => {
        // Do something with response error
        // return Promise.reject(error);
        if(error.message === 'Request failed with status code 301'){
            alert("登陆过期,请重新登录")
            router.replace({path:'/login'})
        }
    });
}