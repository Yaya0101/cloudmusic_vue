<template>
    <div class="musicPageWrap">
      <div class="listPage">
        <div class="listPageItem" v-for="item in playListMusic" :key="item.id">
          <img
            v-lazy="item.al.picUrl"
            alt="歌单音乐图片"
            :key="item.al.picUrl"
          />
          <div class="listMess">
            <div class="listItemName">{{ item.al.name }}</div>
            <div class="listItemUpdate">{{ item.ar[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import muAxios from "../util/myAxios";
export default {
  name: "SongListPage",
  data() {
    return {
      playListMusic: [],
    };
  },
  methods: {
    // 获取歌单内歌曲详情
    async getPlayListMusicMess() {
      let musicMess = await muAxios("/playlist/detail", {
        id: this.$route.query.id,
      });
      this.playListMusic = musicMess.playlist.tracks;
    },
  },
  mounted() {
    this.getPlayListMusicMess();
  },
};
</script>
<style lang="less" scoped>
// 歌单详情音乐
.musicPageWrap {
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
