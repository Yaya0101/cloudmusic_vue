<template>
  <div class="myLikeMusicWrap">
    <div class="listPage">
      <div class="listPageItem" v-for="item in musciMess" :key="item.id">
        <img v-lazy="item.al.picUrl" alt="我喜欢的音乐图片" :key="item.al.picUrl"/>
        <div class="listMess">
          <div class="listItemName">{{ item.al.name }}</div>
          <div class="listItemUpdate">{{ item.ar[0].name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myAxios from "../util/myAxios";
export default {
  name: "ILikeMusic",
  data() {
    return {
      musicId: [],
      musciMess: [],
    };
  },
  methods: {
    // 获取喜欢的音乐信息
    async getMyLikeMusicId() {
      let musicId = await myAxios("/likelist", {
        uid: this.$store.state.userId,
      });
      this.musicId = musicId.ids;

      let ids = "";
      // 获取音乐详细信息
      for (let i = 0; i < musicId.ids.length; i++) {
        if (i === musicId.ids.length - 1) {
          ids += musicId.ids[i];
        } else {
          ids += musicId.ids[i] + ",";
        }
      }

      let musicMess = await myAxios("/song/detail", {
        ids: ids,
      });

      this.musciMess = musicMess.songs;
    },
  },
  mounted() {
    this.getMyLikeMusicId();
  },
};
</script>
<style lang="less" scoped>
// 我喜欢的音乐
.myLikeMusicWrap {
  width: 100%;
  height: 100%;
  .listPage {
    width: 100%;
    height: 100%;
    .listPageItem {
      display: flex;
      align-items: center;
      background-color: #faecd8;
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
