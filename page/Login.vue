<template>
  <div class="loginBoxWrap">
    <div id="formContainer" class="dwo" v-if="!getIsLogin">
      <div class="formLeft">
        <img src="../static/img/denglu.png" />
      </div>
      <div class="formRight">
        <!-- Login form -->
        <form id="login">
          <header>
            <h1>欢迎回来</h1>
            <p>请先登录</p>
          </header>
          <section>
            <label>
              <p>手机号</p>
              <input
                type="text"
                placeholder="请输入手机号"
                v-model="phoneNumer"
              />
              <div class="border"></div>
            </label>
            <label>
              <p>密码</p>
              <input
                type="password"
                placeholder="请输入密码"
                v-model="passWorld"
              />
              <div class="border"></div>
            </label>
            <div class="btn" @click="register">登 录</div>
          </section>
        </form>
      </div>
    </div>

    <div class="logout" v-else>
      <img :src="getUserMess.userImgUrl" alt="用户头像" />
      <h1>欢迎回来</h1>
      <h2 class="userName">{{ getUserMess.userName }}</h2>
      <el-button class="logoutBtn" type="danger" round @click="deletUserMess"
        >注销</el-button
      >
    </div>
  </div>
</template>

<script>
import myAxios from "../util/myAxios";
export default {
  name: "Login",
  data() {
    return {
      phoneNumer: "",
      passWorld: "",
    };
  },
  methods: {
    async register() {
      let res = await myAxios("/login/cellphone", {
        phone: this.phoneNumer,
        password: this.passWorld,
      });

      if (res.code === 200) {
        //   存储用户cookie
        let cookies = res.cookie.split(";;");
        for (let i = 0; i < cookies.length; i++) {
          document.cookie = cookies[i].trim();
        }
        //   存储用户tooken
        localStorage.setItem("token", res.token);
        localStorage.setItem("userMess", JSON.stringify(res.profile));

        this.$store.commit("getUserMess");
        this.$router.replace({
          path: "/foundMusic",
        });
        this.$notify({
          title: "提示",
          message: "登陆成功",
          type: 'success'
        });
      } else if (res.code === 502) {
        this.$notify({
          title: "提示",
          message: "密码错误",
          type: 'warning'
        });
      } else if (res.code === 400) {
        this.$notify({
          title: "提示",
          message: "手机号错误",
          type: 'warning'
        });
      } else {
        this.$notify.error({
          title: "提示",
          message: "出错了,请稍后再试",
        });
      }
    },

    deletUserMess() {
      localStorage.removeItem("userMess");
      localStorage.removeItem("token");
      // 删除所有cookie
      var keys = document.cookie.match(/[^ =;]+(?==)/g);
      if (keys) {
        for (var i = keys.length; i--; ) {
          document.cookie =
            keys[i] + "=0;path=/;expires=" + new Date(0).toUTCString(); // 清除当前域名下的,例如：m.ratingdog.cn
          document.cookie =
            keys[i] +
            "=0;path=/;domain=" +
            document.domain +
            ";expires=" +
            new Date(0).toUTCString(); // 清除当前域名下的，例如 .m.ratingdog.cn
          document.cookie =
            keys[i] +
            "=0;path=/;domain=ratingdog.cn;expires=" +
            new Date(0).toUTCString(); // 清除一级域名下的或指定的，例如 .ratingdog.cn
        }
      }
      this.$router.replace({
        path: "/foundMusic",
      });
    },
  },

  computed: {
    getIsLogin() {
      return this.$store.state.isLogin;
    },

    getUserMess() {
      let userMess = {
        userId: this.$store.state.userId,
        userName: this.$store.state.userName,
        userImgUrl: this.$store.state.userHeadPortraits,
      };

      return userMess;
    },
  },
};
</script>

<style lang="less" scoped>
* {
  outline-width: 0;
  font-family: "Nunito" !important;
}

.logout {
  text-align: center;
  img {
    margin: 0 auto;
    display: block;
    width: 72px;
    border-radius: 50%;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  }

  h1 {
    margin-top: 20px;
    font-size: 34px;
    color: white;
  }

  h2 {
    margin-top: 20px;
    font-size: 26px;
    color: white;
  }

  .logoutBtn {
    margin-top: 20px;
    width: 160px;
  }
}

.loginBoxWrap {
  height: 100%;
  width: 100%;
  background: url("../static/img/loginBack.jpg");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#formContainer {
  display: flex;
  transition: 0.2s ease;
  height: 342.5px;
  transition-delay: 0.3s;
}

#formContainer.toggle {
  height: 480px;
  transition-delay: 0s;
}

.formLeft {
  background: #fff;
  border-radius: 5px 0 0 5px;
  padding: 0 35px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.formLeft img {
  display: block;
  width: 72px;
  border-radius: 50%;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
}

.formRight {
  position: relative;
  overflow: hidden;
  border-radius: 0 5px 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.formRight:before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  /*background: url("../images/bg.jpg") center/cover fixed;*/
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.5);
  filter: blur(5px);
}

.formRight form {
  position: relative;
  width: 350px;
  padding: 25px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
}

.formRight form header {
  color: #fff;
  text-align: center;
  margin-bottom: 15px;
}

.formRight form header h1 {
  margin: 0;
  font-weight: 400;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.formRight form header p {
  margin: 5px 0 0;
  opacity: 0.5;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.formRight form section label {
  display: block;
  margin-bottom: 15px;
  position: relative;
}

.formRight form section label p {
  color: #fff;
  margin: 0 0 10px 0;
  font-weight: 600;
  font-size: 12px;
  opacity: 0.5;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.formRight form section label input {
  width: 100%;
  display: block;
  border: none;
  background: transparent;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 0 10px;
  box-sizing: border-box;
  font-weight: 600;
}

.formRight form section label input:focus ~ .border {
  transform: scale(1, 1);
}

.formRight form section label input:not(:-moz-placeholder-shown) ~ .border {
  transform: scale(1, 1);
}

.formRight form section label input:not(:-ms-input-placeholder) ~ .border {
  transform: scale(1, 1);
}

.formRight form section label input:not(:placeholder-shown) ~ .border {
  transform: scale(1, 1);
}

.formRight form section label .border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #fff;
  transform: scale(0, 1);
  transition: 0.2s ease;
}

.formRight form section label:last-child {
  margin-bottom: 0;
}

.formRight form section .btn {
  text-align: center;
  background: #00897b;
  border: none;
  width: 100%;
  padding: 10px 0;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
}

.formRight form section .btn:hover {
  background: #007f72;
}

.formRight form footer {
  margin-top: 15px;
  display: flex;
}

.formRight form footer .btn {
  background: transparent;
  padding: 0;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  flex: 1;
  opacity: 0.5;
}

.formRight form footer .btn:hover {
  opacity: 1;
}

.formRight form.otherForm {
  top: 0;
  left: 0;
  position: absolute;
  background: #fff;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 0;
  padding: 25px 0;
  transition: 0.2s ease;
  transition-delay: 0.2s;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.formRight form.otherForm header {
  color: #000;
  opacity: 0;
  transition: 0.2s ease;
  transition-delay: 0s;
}

.formRight form.otherForm p {
  color: #000;
}

.formRight form.otherForm section {
  opacity: 0;
  transition: 0.2s ease;
  transition-delay: 0s;
}

.formRight form.otherForm footer {
  border-top-color: rgba(0, 0, 0, 0.1);
  opacity: 0;
}

.formRight form.otherForm footer .btn {
  color: #000;
}

.formRight form.otherForm input {
  border-color: rgba(0, 0, 0, 0.1);
  color: #000;
}

.formRight form.otherForm .border {
  background: #000;
}

.formRight form.otherForm.toggle {
  width: 100%;
  padding: 25px;
  transition-delay: 0s;
}

.formRight form.otherForm.toggle header,
.formRight form.otherForm.toggle section,
.formRight form.otherForm.toggle footer {
  opacity: 1;
  transition-delay: 0.3s;
}
</style>
