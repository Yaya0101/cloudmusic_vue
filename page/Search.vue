<template>
  <div class="searchPageWrap">
    <div class="listPage">
      <transition-group
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeInRight"
        leave-active-class="animate__fadeOutRight"
      >
        <div
          class="listPageItem"
          v-for="item in searchMessList"
          :key="item.id"
          @click="toPlayer(searchMessList, item.id)"
        >
          <img v-lazy="item.al.picUrl" alt="搜索音乐图片" :key="item.id" />
          <div class="listMess">
            <div class="listItemName">{{ item.name }}</div>
            <div class="listItemUpdate">{{ item.ar[0].name }}</div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import myAxios from "../util/myAxios";
export default {
  name: "Search",
  data() {
    return {
      searchName: "",
      searchMessList: [],
    };
  },
  methods: {
    //   获取搜索列表
    async getSearchMusicList() {
      let searchMess = await myAxios("/cloudsearch", {
        keywords: this.searchName,
      });
      this.searchMessList = searchMess.result.songs;
    },

    // 跳转播放器界面
    toPlayer(obj, mid) {
      let musicIds = [];
      for (let i = 0; i < obj.length; i++) {
        musicIds.push(obj[i].id);
      }

      // 将音乐列表本地存储
      localStorage.setItem("musicIds", JSON.stringify(musicIds));

      this.$router.push({
        path: "/player",
        query: {
          id: mid,
        },
      });
    },
  },
  mounted() {
    this.searchName = this.$route.query.searchName;
    this.getSearchMusicList();
  },
};
</script>
<style lang="less" scoped>
// 搜索音乐
.searchPageWrap {
  width: 100%;
  height: 100%;
  .listPage {
    width: 100%;
    height: 100%;
    .listPageItem {
      display: flex;
      align-items: center;
      background-color: white;
      height: 200px;
      margin-top: 20px;
      margin-left: 20px;
      margin-right: 20px;
      border-radius: 20px;
      cursor: pointer;
      box-shadow: 0 0.4px 3.6px rgba(0, 0, 0, 0.004),
        0 1px 8.5px rgba(0, 0, 0, 0.01), 0 1.9px 15.7px rgba(0, 0, 0, 0.019),
        0 3.4px 28.2px rgba(0, 0, 0, 0.03), 0 6.3px 54.4px rgba(0, 0, 0, 0.047),
        0 15px 137px rgba(0, 0, 0, 0.07);
      img {
        height: 150px;
        width: 150px;
        border-radius: 20px;
        margin-left: 20px;
      }

      .listMess {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
        .listItemName {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .listItemUpdate {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
