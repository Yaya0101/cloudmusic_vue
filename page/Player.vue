<template>
  <div class="playerWrap">
    <div
      class="mb"
      :style="'background-image: url(' + musicMess.picUrl + ');'"
    ></div>
    <div class="musicName">{{ musicMess.name }}</div>
    <div class="userName">{{ musicMess.author }}</div>
    <img :src="musicMess.picUrl" alt="" />
    <!-- 拖动条 -->
    <div class="tdWrap">
      <div class="currentTime">{{ currentTime }}</div>
      <el-slider
        class="td"
        v-model="tdValue"
        :show-tooltip="false"
        @change="tdTimejump"
      ></el-slider>
      <div class="allTime">{{ allTime }}</div>
    </div>
    <!-- 控制区 -->
    <div class="contWrap">
      <div
        :class="
          'iconfont' +
          (isSuiJi ? ' icon-xunhuanbofang ' : ' icon-suijibofang ') +
          'suiji'
        "
        @click="checkSuiJi"
      ></div>
      <div
        class="iconfont icon-shangyishou shangyi"
        @click="toShangMusic"
      ></div>
      <div
        :class="
          'iconfont' + (isPlay ? ' icon-zanting ' : ' icon-bofang ') + 'bofang'
        "
        @click="playMusic"
      ></div>
      <div class="iconfont icon-xiayishou xiayi" @click="toXiaMusic"></div>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="iconfont icon-danlieliebiao liebiao"> </span>
        <el-dropdown-menu slot="dropdown" class="lieOut">
          <el-dropdown-item
            v-for="item in musicListMess"
            :key="item.id"
            :disabled="item.id === Number(musicId)"
            :command="item.id"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <audio
      @canplay="getMusicLonger"
      @timeupdate="getMusicRealMess"
      ref="bfq"
      :src="musicMess.url"
    ></audio>
  </div>
</template>
<script>
import myAxios from "../util/myAxios";
export default {
  name: "Player",
  data() {
    return {
      musicMess: {},
      tdValue: 0,
      isPlay: false,
      isSuiJi: false,
      // 总时长
      allTime: "00:00",
      // 当前时长
      currentTime: "00:00",
      // 当前音乐id
      musicId: 0,
      // 当前音乐index
      musicIndex: 0,
      // 音乐列表数据
      musicListMess: [],
    };
  },
  methods: {
    // 获取音乐url以及信息
    async getMusicMess() {
      let musciMess = await myAxios("/song/detail", {
        ids: this.$route.query.id,
      });

      let musciUrl = await myAxios("/song/url", {
        id: this.$route.query.id,
      });
      if (musciUrl.data[0].url === null) {
        this.$notify({
          title: musciMess.songs[0].name,
          message: "音乐资源丢失,默认继续播放上一首音乐",
          duration: 0,
        });
      }

      let musciLrc = await myAxios("/lyric", {
        id: this.$route.query.id,
      });

      this.musicId = this.$route.query.id;

      let musicData = {
        name: musciMess.songs[0].name,
        author: musciMess.songs[0].ar[0].name,
        picUrl: musciMess.songs[0].al.picUrl,
        url: musciUrl.data[0].url,
        lrc: musciLrc.lrc.lyric,
      };

      this.musicMess = musicData;
    },

    // 播放暂停音乐
    playMusic() {
      this.isPlay = !this.isPlay;
      let bfq = this.$refs.bfq;
      if (this.isPlay) {
        bfq.play();
      } else {
        bfq.pause();
      }
    },

    // 随机或循环播放
    checkSuiJi() {
      this.isSuiJi = !this.isSuiJi;
    },

    // 获取音乐时长
    getMusicLonger() {
      // 音乐总时长
      let bfq = this.$refs.bfq;
      // this.allTime = bfq.duration
      let fen = parseInt(bfq.duration / 60) + "";
      let miao = parseInt(bfq.duration % 60) + "";
      if (fen.length === 1) {
        fen = "0" + fen;
      }
      if (miao.length === 1) {
        miao = "0" + miao;
      }
      this.allTime = fen + ":" + miao;

      this.tdValue = 0;
      bfq.play();
      this.isPlay = true;
    },

    // 获取音乐实时信息
    getMusicRealMess() {
      let bfq = this.$refs.bfq;
      // 设置实时时间
      let fen = parseInt(bfq.currentTime / 60) + "";
      let miao = parseInt(bfq.currentTime % 60) + "";
      if (fen.length === 1) {
        fen = "0" + fen;
      }
      if (miao.length === 1) {
        miao = "0" + miao;
      }
      this.currentTime = fen + ":" + miao;

      // 设置实时拖动条位置
      this.tdValue = (bfq.currentTime / bfq.duration) * 100;

      // 是否播放完毕
      if (bfq.ended) {
        // 重置
        (this.currentTime = "00:00"), (this.isPlay = false), (this.tdValue = 0);
        // 随机或顺序播放
        if (this.isSuiJi) {
          this.musicIndex = parseInt(Math.random() * this.musicListMess.length);
          let id = this.musicListMess[this.musicIndex].id;

          this.$router.replace({
            path: "/player",
            query: {
              id: id,
            },
          });
          this.getMusicMess();
        } else {
          if (this.musicIndex === this.musicListMess.length - 1) {
            this.musicIndex = 0;
          } else {
            this.musicIndex = this.musicIndex + 1;
          }
          let id = this.musicListMess[this.musicIndex].id;
          this.$router.replace({
            path: "/player",
            query: {
              id: id,
            },
          });
          this.getMusicMess();
        }
      }
    },

    //拖动跳转时间
    tdTimejump() {
      let bfq = this.$refs.bfq;
      let jumpTime = bfq.duration * (this.tdValue / 100);
      bfq.currentTime = jumpTime;
    },

    // 显示音乐列表数据
    async showList() {
      this.musicId = this.$route.query.id;
      let ids = JSON.parse(localStorage.getItem("musicIds"));
      let idIndex = ids.indexOf(Number(this.$route.query.id));
      this.musicIndex = idIndex;
      let musicIdsStr = "";
      for (let i = 0; i < ids.length; i++) {
        if (i === ids.length - 1) {
          musicIdsStr = musicIdsStr + ids[i];
        } else {
          musicIdsStr = musicIdsStr + ids[i] + ",";
        }
      }
      let musicListStr = await myAxios("/song/detail", {
        ids: musicIdsStr,
      });
      let musicListObj = [];

      for (let j = 0; j < musicListStr.songs.length; j++) {
        let musicObj = {
          name: musicListStr.songs[j].name,
          id: musicListStr.songs[j].id,
        };
        musicListObj.push(musicObj);
      }
      this.musicListMess = musicListObj;
    },

    // 点击切换下一首
    toXiaMusic() {
      if (this.musicIndex === this.musicListMess.length - 1) {
        this.musicIndex = 0;
      } else {
        this.musicIndex = this.musicIndex + 1;
      }
      let mid = Number(this.musicListMess[this.musicIndex].id);

      let bfq = this.$refs.bfq;
      bfq.currentTime = 0
      bfq.pause()
      this.isPlay = false;

      this.$router.replace({
        path: "/player",
        query: {
          id: mid,
        },
      });

      this.getMusicMess();
    },

    // 点击播放上一首
    toShangMusic() {
      if (this.musicIndex === 0) {
        this.musicIndex = this.musicListMess.length - 1;
      } else {
        this.musicIndex = this.musicIndex - 1;
      }
      let mid = Number(this.musicListMess[this.musicIndex].id);

      let bfq = this.$refs.bfq;
      bfq.load();
      this.isPlay = false;

      this.$router.replace({
        path: "/player",
        query: {
          id: mid,
        },
      });

      this.getMusicMess();
    },

    // 点击列表切歌
    handleCommand(command) {
      this.$router.replace({
        path: "/player",
        query: {
          id: command,
        },
      });
      this.getMusicMess();
    },
  },
  mounted() {
    this.getMusicMess();
    this.showList();

  },
};
</script>
<style lang="less" scoped>
.playerWrap {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .mb {
    height: 100%;
    width: 100%;
    filter: blur(20px) brightness(40%);
    background-size: 100% 100%;
    transform: scale(1.2);
  }

  .musicName {
    position: absolute;
    top: 35px;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
    color: white;
    font-size: 34px;
    max-width: 1000px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .userName {
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
    color: white;
    font-size: 24px;
  }

  img {
    position: absolute;
    height: 300px;
    width: 300px;
    border-radius: 50%;
    top: 125px;
    left: 0;
    right: 0;
    margin: auto;
  }

  // 拖动条范围
  .tdWrap {
    position: absolute;
    bottom: 230px;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .td {
      width: 900px;
    }

    .currentTime {
      color: white;
      margin-left: 100px;
    }

    .allTime {
      color: white;
      margin-right: 100px;
    }
  }

  // 控制区域
  .contWrap {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #808080;

    div {
      font-size: 32px;
      color: white;
      cursor: pointer;
    }

    .liebiao {
      font-size: 32px;
      color: white;
      cursor: pointer;
    }

    .bofang {
      font-size: 50px;
    }
  }
}

.lieOut {
  height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  li {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
