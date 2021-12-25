import axios from "axios"
import config from "./config"
import store from "../store/index";
import intercept from '../util/intercept'
axios.defaults.withCredentials = true
intercept()
export default (url, data = {}, method = "get") => {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: config.url + url,
            params: data,
        }).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        });
    })
}