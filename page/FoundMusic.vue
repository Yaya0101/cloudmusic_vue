<template>
  <div class="foundMusicWrap">
    <!-- 轮播图 -->
    <el-carousel :interval="5000" class="bannerWrap">
      <el-carousel-item
        v-for="item in slideshow"
        :key="item.imageUrl"
        class="bannerItem"
      >
        <img :src="item.imageUrl" alt="轮播图" />
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <div class="recommendPlaylistTitle">
      推荐歌单
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="recommendPlaylist">
      <div
        class="playlistItem"
        v-for="item in playlistMess"
        :key="item.id"
        @click="toPlayListPage(item.id)"
      >
        <img v-lazy="item.picUrl" alt="" :key="item.picUrl" />
        <div class="playlistName">{{ item.name }}</div>
      </div>
    </div>

    <!-- 每日新音乐 -->
    <div class="recommendPlaylistTitle">
      最新音乐
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="recommendPlaylist">
      <div
        class="playlistItem"
        v-for="item in newMusicMess"
        :key="item.id"
        @click="toPlayer(newMusicMess,item.id)"
      >
        <img v-lazy="item.picUrl" alt="" :key="item.picUrl" />
        <div class="playlistName">{{ item.name }}</div>
      </div>
    </div>

    <!-- 推荐歌曲 -->
    <div class="recommendPlaylistTitle">
      推荐音乐
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="recommendPlaylist" style="margin-bottom: 20px">
      <div class="playlistItem" v-for="item in recommendSongs" :key="item.id" @click="toPlayer(recommendSongs,item.id)">
        <img v-lazy="item.al.picUrl" alt="" :key="item.id" />
        <div class="playlistName">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import myAxios from "../util/myAxios";
export default {
  name: "FoundMusic",
  data() {
    return {
      slideshow: [],
      playlistMess: [],
      newMusicMess: [],
      recommendSongs: [],
    };
  },

  methods: {
    // 获取轮播图数据
    async getBanner() {
      let bannerMess = await myAxios("/banner", {
        type: 0,
      });
      this.slideshow = bannerMess.banners;
    },

    // 获取推荐歌单
    async getRecommendPlaylist() {
      let playlistMess = await myAxios("/personalized", {
        limit: 10,
      });
      this.playlistMess = playlistMess.result;
    },

    // 获取最新推荐音乐
    async getNewRecommendMusic() {
      let musicMess = await myAxios("/personalized/newsong");
      this.newMusicMess = musicMess.result;
    },

    // 获取推荐歌曲
    async getRecommendSongs() {
      let recommendSongs = await myAxios("/recommend/songs");
      this.recommendSongs = recommendSongs.data.dailySongs;
    },

    // 跳转歌单界面
    toPlayListPage(mid) {
      this.$router.push({
        path: "/songListPage",
        query: {
          id: mid,
        },
      });
    },

    // 跳转播放器界面
    toPlayer(obj,mid) {
      let musicIds = [];
      for (let i = 0; i < obj.length; i++) {
        musicIds.push(obj[i].id);
      }

      // 将音乐列表本地存储
      localStorage.setItem('musicIds',JSON.stringify(musicIds))

      this.$router.push({
        path: "/player",
        query: {
          id: mid,
        },
      });
    },
  },

  mounted() {
    this.getBanner();
    this.getRecommendPlaylist();
    this.getNewRecommendMusic();
    this.getRecommendSongs();
  },
};
</script>
<style lang="less" scoped>
// 轮播图样式
.bannerWrap {
  .bannerItem {
    img {
      height: 100%;
      width: 100%;
    }
  }
}

// 推荐歌单
.recommendPlaylistTitle {
  font-size: 24px;
  margin-top: 40px;
  padding-left: 20px;
}
.recommendPlaylist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .playlistItem {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    cursor: pointer;
    img {
      height: 200px;
      width: 200px;
      border-radius: 20px;
    }

    .playlistName {
      width: 200px;
      font-size: 14px;
      height: 28px;
      margin-top: 10px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
