//引入vue
import Vue from 'vue';
//引入vue-router
import VueRouter from 'vue-router';
//第三方库需要use一下才能用
Vue.use(VueRouter)
//引入路由组件

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
	routes: [
		{
			path: '/',
			redirect: '/foundMusic'
		},
		{
			path: '/login',
			component: resolve=>(require(["../page/Login.vue"],resolve))
		},
		{
			path: '/foundMusic',
			component: resolve=>(require(["../page/FoundMusic.vue"],resolve))
		},
		{
			path: '/ranking',
			component: resolve=>(require(["../page/Ranking.vue"],resolve))
		},
		{
			path: '/recentPlay',
			component: resolve=>(require(["../page/RecentPlay.vue"],resolve))
		},
		{
			path: '/iLikeMusic',
			component: resolve=>(require(["../page/ILikeMusic.vue"],resolve))
		},
		{
			path: '/collectionOfPlaylists',
			component: resolve=>(require(["../page/CollectionOfPlaylists.vue"],resolve))
		},
		{
			path: '/songListPage',
			component: resolve=>(require(["../page/SongListPage.vue"],resolve))
		},
		{
			path: '/player',
			component: resolve=>(require(["../page/Player.vue"],resolve))
		}
	]
})

//暴露router
export default router