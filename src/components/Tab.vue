<template>
  <header>
    <div class="hd">
      <div class="logo">
        <router-link to="/" @click.native="clear">
          <div class="row clearfix">
            <span class="logo_icon" style="height: 18px;margin: 6px 4px 0 0;"></span>
            <span class="logo_icon" style="height: 28px;margin: 0 4px 0 0;"></span>
            <span class="logo_icon" style="height: 18px;margin: 6px 0 0 0"></span>
            <p style="margin-left: 15px;font-size: 14px;line-height: 30px;">悦读 FM</p>
          </div>
        </router-link>
      </div>
      <div class="menu">
        <router-link
          v-for="(list, index) in lists"
          :key="index"
          :to="'/channel/' + list.id"
          :class="{ light: id == list.id }"
          @click.native="sendTab(list.id)"
        >{{ list.type }}</router-link>
       
      </div>
      <form class="search">
        <input type="text" class="index_search" />
        <button type="submit" class="index_sub"></button>
      </form>
      <div class="user" ref="user_">
        <a href="javascript:void(0)" style="margin-left: 15px;" @click="login_box" ref="login_">登录</a>
        <a href="javascript:void(0)" @click="register_box" ref="register_">注册</a>
      </div>
      <div class="pop" id="login" style="display:none">
        <div class="pop-wp" style="left: 50%;" id="pop-wp-l">
          <a href="#" rel="nofollow" title="关闭" class="pop-close" @click="close">×</a>
          <div class="pop-title">登录</div>
          <form id="loginForm" method="POST" enctype="http://localhost:3000/api/user/login">
            <input type="hidden" />
            <div class="account-form">
              <input
                type="text"
                name="email"
                class="account-input"
                v-model="email"
                placeholder="邮箱"
                autocomplete
              />
              <div id="error_tip_remail" class="error-tip">
                <span id="remail-error" class="error" v-if="emailStatus">请输入邮箱</span>
              </div>
              <div id="error_tip_remail" class="error-tip">
                <span id="remail-error" class="error" v-if="eReg">请输入有效邮箱</span>
              </div>
              <div class="account-line"></div>
              <input
                type="password"
                name="password"
                class="account-input"
                v-model="password"
                placeholder="密码"
                autocomplete
              />
            </div>
            <div id="error_tip_rpassword" class="error-tip">
                <span id="rpassword-error" class="error" style="left: 14px;" v-if="passStatus">请输入密码</span>
            </div>
            <div class="account-line"></div>
            <div class="account-other">
              <span class="fr">
                <a href="javascript:void(0)" class="red-link" target="_blank">忘记密码</a>
              </span>
              <label>
                <input type="checkbox" value="1" />
                下次自动登录
              </label>
            </div>
            <button type="submit" class="account-btn" @click="sub_l">登 录</button>
          </form>
        </div>
      </div>
      <div class="pop" id="register" style="display:none">
        <div class="pop-wp" style="left: 50%;" id="pop-wp-r">
          <a href="#" rel="nofollow" title="关闭" class="pop-close" @click="close">×</a>
          <div class="pop-title">注册</div>
          <form id="registerForm" method="POST" action="http://localhost:3000/api/user">
            <div class="account-form">
              <input
                type="text"
                name="nikiname"
                class="account-input"
                placeholder="昵称"
                v-model.trim="nikiname"
                autocomplete
              />
              <div id="error_tip_rusername" class="error-tip">
                <span id="rusername-error" class="error" v-if="nikiStatus">请输入昵称</span>
              </div>
              <div class="account-line"></div>
              <input
                type="text"
                name="email"
                class="account-input"
                placeholder="邮箱"
                v-model.trim="email"
                autocomplete
              />
              <div id="error_tip_remail" class="error-tip">
                <span id="remail-error" class="error" v-if="emailStatus">请输入邮箱</span>
              </div>
              <div id="error_tip_remail" class="error-tip">
                <span id="remail-error" class="error" v-if="eReg">请输入有效邮箱</span>
              </div>
              <div class="account-line"></div>
              <input
                type="password"
                name="password"
                id="rpassword"
                class="account-input"
                placeholder="密码"
                v-model.trim="password"
                autocomplete
              />
              <div id="error_tip_rpassword" class="error-tip">
                <span id="rpassword-error" class="error" v-if="passStatus">请输入密码</span>
              </div>
              <div class="account-line"></div>
              <input
                type="password"
                class="account-input"
                ref="comfirm"
                placeholder="确认密码"
                autocomplete
              />
            </div>
            <div id="error_tip_repassword" class="error-tip">
              <span
                id="repassword-error"
                class="error"
                style="left: 15px;"
                v-if="repassStatus"
              >请再次输入密码</span>
            </div>
            <div id="error_tip_repassword" class="error-tip">
              <span id="repassword-error" class="error" style="left: 15px;" v-if="pTop">两次密码不一致</span>
            </div>
            <div class="account-other">
              <label>
                <input type="checkbox" id="angree" value="1" ref="check" />
                我已认真阅读并同意悦读FM的
                <a
                  href="/agreement/"
                  class="red-link"
                  target="_blank"
                >《使用协议》</a>
              </label>
              <div id="error_tip_angree" class="error-tip">
                <span
                  id="angree-error"
                  class="error"
                  style="left: 10px;top: 3px;"
                  v-if="checkStatus"
                >请阅读并同意悦读FM使用协议</span>
              </div>
            </div>
            <button type="submit" @click="sub_r" class="account-btn">注册</button>
          </form>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import axios from "axios";
import bus from "../bus";
export default {
  name: "tab",
  data() {
    return {
      id: 0,
      lists: [],
      email: "",
      nikiname: "",
      username: "",
      password: "",
      token: "",
      repassStatus: false,
      passStatus: false,
      checkStatus: false,
      emailStatus: false,
      nikiStatus: false,
      pTop: false,
      eReg: false
    };
  },
  methods: {
    clear() {
      this.id = 0;
    },
    getTab() {
      axios
        .get("http://localhost:3000/api/types")
        .then(res => {
          this.lists = this.lists.concat(res.data.res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    login_box() {
      var login = document.getElementById("login");
      var pop_l = document.getElementById("pop-wp-l");
      document.documentElement.style.overflow = "hidden";
      login.style.display = "block";
      pop_l.style.animation = "toMid 1s";
    },
    register_box() {
      var register = document.getElementById("register");
      var pop_r = document.getElementById("pop-wp-r");
      document.documentElement.style.overflow = "hidden";
      register.style.display = "block";
      pop_r.style.animation = "toMid 1s";
    },
    close() {
      var login = document.getElementById("login");
      var register = document.getElementById("register");
      var pop = document.getElementsByClassName("pop")[0];
      var pop_l = document.getElementById("pop-wp-l");
      var pop_r = document.getElementById("pop-wp-r");
      pop_l.style.animation = "toRight 1s";
      pop_l.style.animationFillMode = "forwards";
      pop_r.style.animation = "toRight 1s";
      pop_r.style.animationFillMode = "forwards";
      document.documentElement.style = "";
      setTimeout(function() {
        login.style.display = "none";
        register.style.display = "none";
      }, 800);
      this.repassStatus = false;
      this.passStatus = false;
      this.checkStatus = false;
      this.emailStatus = false;
      this.nikiStatus = false;
      this.pTop = false;
      this.eReg = false;
      this.email = "";
      this.nikiname = "";
      this.username = "";
      this.password = "";
    },
    setToken({ token }) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    sendTab(id) {
      this.id = id;
      bus.$emit("changeTab", id);
    },
    sub_r(e) {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      e.preventDefault();
      if (
        this.nikiname.length &&
        this.email.length &&
        this.password &&
        this.$refs.comfirm.value &&
        this.$refs.check.checked &&
        this.password == this.$refs.comfirm.value &&
        reg.test(this.email)
      ) {
        axios
          .post("http://localhost:3000/api/user", {
            email: this.email,
            password: this.password,
            nikiname: this.nikiname,
            username: this.nikiname
          })
          .then(res => {
            if (res.data.res_code == 400) {
              alert(res.data.res_msg);
              this.close();
            }
            if (res.data.res_code == 200) {
              alert(res.data.res);
              this.close();
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        if (!this.nikiname.length) {
          this.nikiStatus = true;
        } else {
          this.nikiStatus = false;
        }

        if (!this.email.length) {
          this.emailStatus = true;
        } else if (this.email.length && !reg.test(this.email)) {
          this.emailStatus = false;
          this.eReg = true;
        } else if (this.email.length && reg.test(this.email)) {
          this.eReg = false;
        } else {
          this.emailStatus = false;
        }

        if (!this.password.length) {
          this.passStatus = true;
        } else {
          this.passStatus = false;
        }

        if (!this.$refs.comfirm.value) {
          this.repassStatus = true;
        } else if (this.password != this.$refs.comfirm.value) {
          this.repassStatus = false;
          this.pTop = true;
        } else if (this.password == this.$refs.comfirm.value) {
          this.pTop = false;
        } else {
          this.repassStatus = false;
        }

        if (!this.$refs.check.checked) {
          this.checkStatus = true;
        } else {
          this.checkStatus = false;
        }
      }
    },
    sub_l(e) {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var user = document.getElementsByClassName("user")[0];
      e.preventDefault();
      if (this.email.length && this.password && reg.test(this.email)) {
        axios
          .post("http://localhost:3000/api/user/login", {
            email: this.email,
            password: this.password
          })
          .then(res => {
            if (res.data.res_code == 400) {
              alert(res.data.res_msg);
              this.close();
            }
            if (res.data.res_code == 200) {
              alert("欢迎回来 " + "用户：" + res.data.res.user.nikiname);
              this.close();
              this.setToken({ token: res.data.res.token });
              user.innerHTML = res.data.res.user.nikiname;
              localStorage.setItem("userStatus", 200);
              localStorage.setItem("userName", res.data.res.user.nikiname);
              location.reload();
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        if (!this.email.length) {
          this.emailStatus = true;
        } else if (this.email.length && !reg.test(this.email)) {
          this.emailStatus = false;
          this.eReg = true;
        } else if (this.email.length && reg.test(this.email)) {
          this.eReg = false;
        } else {
          this.emailStatus = false;
        }

        if (!this.password.length) {
          this.passStatus = true;
        } else {
          this.passStatus = false;
        }
      }
    },
    userInfo() {
      var username = window.localStorage.getItem("userName");
      var userstatus = window.localStorage.getItem("userStatus");
      if (userstatus == 200) {
        var login_user = this.$refs.login_;
        var clear = this.$refs.register_;
        var user_box = this.$refs.user_;
        user_box.children[0].outerHTML = `<a href="javascript:void(0)">${username}</a>`;
        user_box.children[1].outerHTML = `<a href="javascript:void(0)" onclick="window.localStorage.clear();location.reload();" >退出</a>`;
      }
    }
  },
  created() {
    this.getTab();
    bus.$on("sendType", data => {
      this.id = data;
    });
  },
  mounted() {
    this.userInfo();
  },
  watch: {
    $route: {
      handler(to) {
        if(to.params.tab > 6) {
          alert("禁止");
          this.$router.push({
            path: '/channel/' + 1
          });
          this.id = to.params.tab
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss">
@keyframes toMid {
  0% {
    left: -500%;
  }
  100% {
    left: 50%;
  }
}

@keyframes toRight {
  0% {
    left: 50%;
  }
  100% {
    left: 500%;
  }
}

.light {
  color: #f30;
}

header {
  height: 100px;
  background-color: #fff;
}

.hd {
  width: 1010px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

header > .hd > a {
  display: block;
}

.logo_icon {
  width: 4px;
  background: #ee5044;
  display: block;
  border-radius: 2px;
  float: left;
}

.row {
  display: flex;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.hd a {
  transition: all 0.5s;
}

.hd a:hover {
  color: #f30;
  text-decoration: none;
}

.menu {
  margin: 0 100px 0 120px;
  display: flex;
  align-items: baseline;
}

.menu > a {
  float: left;
  padding: 0 20px;
  font-size: 14px;
}

.search {
  font-size: 0;
}

.index_search {
  width: 130px;
  height: 20px;
  border: none;
  border-bottom: 1px solid #f2f2f2;
  box-sizing: border-box;
  vertical-align: middle;
  font-size: 12px;
  color: #707070;
}

.index_sub {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: none;
  outline: none;
  vertical-align: middle;
  margin-right: 20px;
}

.error-tip span {
  position: absolute;
  top: -5px;
  left: 0;
  padding: 2px 8px;
  background: rgba(238, 80, 68, 0.8);
  color: #fff;
  border-radius: 3px;
  display: block;
  font-size: 12px;
}

.error-tip span:before {
  position: absolute;
  top: -5px;
  left: 8px;
  display: inline-block;
  border-right: 5px solid transparent;
  border-bottom: 5px solid rgba(238, 80, 69, 0.8);
  border-left: 5px solid transparent;
  content: "";
}

.index_sub::after {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  background: #fff url("../assets/search_icon.png") 2px 4px no-repeat;
  background-size: 12px;
  border-right: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  box-sizing: border-box;
}

.user {
  float: right;
  border-left: 1px dotted #ccc;
}

.user > a {
  margin: 0 10px;
  color: #707070;
  font-size: 12px;
}
.pop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.pop-wp {
  background: #fff;
  padding: 30px 50px 50px;
  width: 280px;
  position: absolute;
  top: 120px;
  left: -50%;
  margin-left: -190px;
}
.pop-wp .pop-close:hover {
  background: #000;
  color: #fff;
}
.pop-close {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  background: #444;
  color: #ccc;
  font-size: 24px;
  border-radius: 50%;
}
.pop-title {
  font-size: 24px;
  margin-bottom: 20px;
  line-height: 24px;
}
.account-btn {
  width: 100%;
  height: 45px;
  border: none;
  background: #eb4235;
  color: #fff;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
}
.account-form {
  border: 1px solid #dcdcdc;
  padding: 0 15px;
}
.account-input {
  height: 20px;
  width: 100%;
  display: block;
  margin: 10px 0;
  border: none;
}
.error-tip {
  position: relative;
}
.account-line {
  width: 100%;
  height: 1px;
  background: #dcdcdc;
  overflow: hidden;
}
.account-other {
  padding: 15px 5px;
  font-size: 12px;
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.red-link {
  color: #ee5044;
}
</style>
