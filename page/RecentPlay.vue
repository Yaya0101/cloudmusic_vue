<template>
  <div class="recentPlayWrap">
    <div class="listPage">
      <div class="listPageItem" v-for="item in recentMess" :key="item.song.id">
        <img v-lazy="item.song.al.picUrl" alt="最近播放音乐图片" :key="item.song.al.picUrl"/>
        <div class="listMess">
          <div class="listItemName">{{ item.song.ar[0].name }}</div>
          <div class="listItemUpdate">{{ item.song.alia[0] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myAxios from "../util/myAxios";
export default {
  name: "RecentPlay",
  data() {
    return {
      recentMess: [],
    };
  },
  methods: {
    // 获取排行榜数据
    async getRecentPlay() {
      let recentMess = await myAxios("/user/record", {
        uid: this.$store.state.userId,
        type: 1,
      });
      this.recentMess = recentMess.weekData;
    },
  },
  mounted() {
    this.getRecentPlay();
  },
};
</script>
<style lang="less" scoped>
// 最近播放
.recentPlayWrap {
  width: 100%;
  height: 100%;
  .listPage {
    width: 100%;
    height: 100%;
    .listPageItem {
      display: flex;
      align-items: center;
      background-color: #d9ecff;
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
