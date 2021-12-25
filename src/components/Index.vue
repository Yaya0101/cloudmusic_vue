<template>
  <el-container class="indexWrap">
    <el-aside width="200px" class="leftWrap"><LeftNavigation></LeftNavigation></el-aside>
    <el-main class="rightWrap"><router-view></router-view></el-main>
  </el-container>
</template>

<script>
// 主页
import LeftNavigation from './LeftNavigation';

export default {
  name: "Index",
  components:{
      LeftNavigation,
  }
};
</script>

<style lang="less" scoped>
.indexWrap {
    height: 100%;

    .leftWrap{
      border-right: 1px solid #808080;
    }

    .rightWrap{
      padding: 0;
    }
}
</style>
