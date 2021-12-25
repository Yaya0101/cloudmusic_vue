<template>
  <div class="collectionOfPlaylistsWrap">
    <div class="listPage">
      <div
        class="listPageItem"
        v-for="item in collectionMess"
        :key="item.id"
        @click="toPlayListPage(item.id)"
      >
        <img
          v-lazy="item.coverImgUrl"
          alt="收藏的歌单图片"
          :key="item.coverImgUrl"
        />
        <div class="listMess">
          <div class="listItemName">{{ item.name }}</div>
          <div class="listItemUpdate">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myAxios from "../util/myAxios";
export default {
  name: "CollectionOfPlaylists",
  data() {
    return {
      collectionMess: [],
    };
  },
  methods: {
    // 获取歌单数据
    async getCollectionMess() {
      let collectionMess = await myAxios("/user/playlist", {
        uid: this.$store.state.userId,
      });
      let xCollectionMess = [];
      for (let i = 0; i < collectionMess.playlist.length; i++) {
        if (collectionMess.playlist[i].subscribed) {
          xCollectionMess.push(collectionMess.playlist[i]);
        }
      }
      this.collectionMess = xCollectionMess;
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
  },
  mounted() {
    this.getCollectionMess();
  },
};
</script>
<style lang="less" scoped>
// 收藏的歌单
.collectionOfPlaylistsWrap {
  width: 100%;
  height: 100%;
  .listPage {
    width: 100%;
    height: 100%;
    .listPageItem {
      display: flex;
      align-items: center;
      background-color: #f0f9eb;
      height: 200px;
      margin-top: 20px;
      margin-left: 20px;
      margin-right: 20px;
      border-radius: 20px;
      cursor: pointer;
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
          width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
