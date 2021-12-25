//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {
	//执行加
	getUserMess(state) {
		// console.log('mutations中的JIA被调用了',state,value)
		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i].trim();
				if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
			}
			return "";
		}

		if (localStorage.getItem("userMess") && localStorage.getItem("token") && getCookie("MUSIC_U") != "") {
			state.userId = JSON.parse(localStorage.getItem("userMess")).userId
			state.userName = JSON.parse(localStorage.getItem("userMess")).nickname
			state.userHeadPortraits = JSON.parse(localStorage.getItem("userMess")).avatarUrl
			state.isLogin = true
			state.cookie = "MUSIC_U="+getCookie("MUSIC_U")
		} else {
			state.userId = 0
			state.userName = ''
			state.userHeadPortraits = ''
			state.isLogin = false,
			state.cookie = ''
		}

	}
}
//准备state对象——保存具体的数据
const state = {
	userId: 0,
	userName: '',
	userHeadPortraits: '',
	isLogin: false,
	cookie:''
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})