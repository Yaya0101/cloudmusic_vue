<template>
  <div class="navWrap">
    <div class="longInChooser" @click="toLogin(1)">
      <img
        :src="userMess.isLogin? userMess.userImgUrl : require('../../static/img/denglu.png')"
        alt="请登录"
      />
      <span :style="userMess.isLogin ? 'font-size: 12px' : ''">{{
        userMess.isLogin ? userMess.userName : "请登录"
      }}</span>
    </div>
    <div class="el-icon-search chooser" @click="toLogin(2)">发现音乐</div>
    <div class="el-icon-trophy chooser" @click="toLogin(3)">排行榜</div>
    <div class="el-icon-timer chooser" @click="toLogin(4)">最近播放</div>
    <div class="el-icon-headset chooser" @click="toLogin(5)">我喜欢的音乐</div>
    <div class="el-icon-star-off chooser" @click="toLogin(6)">收藏的歌单</div>
  </div>
</template>

<script>
// 主页左侧导航条
export default {
  name: "LeftNavigation",
  data() {
    return {
      userMess:{}
    };
  },
  methods: {
    // 跳转到登录界面
    toLogin(mess) {
      if (mess === 1) {
        this.$router.push({
          path: "/login",
        });
      } else if (mess === 2) {
        this.$router.push({
          path: "/foundMusic",
        });
      } else if (mess === 3) {
        this.$router.push({
          path: "/ranking",
        });
      } else if (mess === 4) {
        this.$router.push({
          path: "/recentPlay",
        });
      } else if (mess === 5) {
        this.$router.push({
          path: "/iLikeMusic",
        });
      } else if (mess === 6) {
        this.$router.push({
          path: "/collectionOfPlaylists",
        });
      }
    },
  },

  computed: {
    getUserMess() {
      let userMess = {
        userId:this.$store.state.userId,
        userName:this.$store.state.userName,
        isLogin:this.$store.state.isLogin,
        userImgUrl:this.$store.state.userHeadPortraits
      }

      return userMess;
    },
  },

  watch: {
    getUserMess: {
      handler(newValue) {
        this.userMess = newValue
      },
    },
  },
};
</script>

<style lang="less" scoped>
.navWrap {
  width: 100%;
  height: 100%;
  margin: 0;

  .longInChooser {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      width: 50px;
      height: 50px;
      margin-right: 20px;
      border-radius: 50%;
    }

    span {
      font-size: 18px;
      color: #3f3f3f;
    }
  }

  .chooser {
    color: #3f3f3f;
    height: 60px;
    width: 100%;
    text-align: center;
    line-height: 60px;
    font-size: 18px;
    cursor: pointer;
    margin-bottom: 30px;
  }

  .chooser:first-child {
    background-color: yellow;
  }
}
</style>
