<template>
  <div class="rankingWrap">
    <div class="listPage">
      <transition-group
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeInRight"
        leave-active-class="animate__fadeOutRight"
      >
        <div
          class="listPageItem"
          v-for="item in rankingList"
          :key="item.id"
          @click="toPlayListPage(item.id)"
        >
          <img
            v-lazy="item.coverImgUrl"
            alt="排行榜图片"
            :key="item.coverImgUrl"
          />
          <div class="listMess">
            <div class="listItemName">{{ item.name }}</div>
            <div class="listItemUpdate">{{ item.updateFrequency }}</div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import myAxios from "../util/myAxios";
export default {
  name: "Ranking",
  data() {
    return {
      rankingList: [],
    };
  },
  methods: {
    // 获取排行榜数据
    async getRankingList() {
      let rankingMess = await myAxios("/toplist");
      this.rankingList = rankingMess.list;
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
    this.getRankingList();
  },
};
</script>
<style lang="less" scoped>
// 排行榜
.rankingWrap {
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
