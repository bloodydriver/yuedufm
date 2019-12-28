<template>
  <div class="main">
    <div class="left">
      <div class="media_box">
        <h2 class="content_tit">{{ list.title }}</h2>
        <div class="content_info">
          <span>
            <i class="fa fa-pencil">{{ list.author }}</i>
          </span>
          <span>
            <i class="fa fa-microphone"></i>
            {{ list.podcast }}
          </span>
          <span>
            <i class="fa fa-clock-o"></i>
            {{ list.duration }}
          </span>
          <span class="content_count"> 
            <span style="font-size:12px">播放</span>
             {{ list.play_time }}
             <span style="font-size:12px">次</span>
             </span>
        </div>
        <!-- <img :src="list.img_url.replace('yuedu.fm','yuedufm.com')"/> -->
        <img :src="list.img_url" alt />
        <div class="meadi_play">
          <i
            id="play_btn"
            @click="change_icon"
            :class="['fa', { 'fa-play': btn, 'fa-pause': !btn }]"
          ></i>
          <div class="line_box">
            <div class="play_line"></div>
            <div class="play_line_new" ref="line" style="width: 0"></div>
          </div>
          <div class="play_time" id="audioTime" v-if="status">00:00</div>
          <div class="play_time" id="audioTime" v-if="timeStatus">-{{ time }}</div>
        </div>
        <!-- <audio :src="list.mp3_url.replace('yuedu.fm','yuedufm.com')" id="audioTag" @play="p_music(list.duration)" @pause="z_music"></audio> -->
        <audio
          ref="audio"
          :src="list.mp3_url"
          id="audioTag"
          @timeupdate="press"
          @canplay="play"
          @ended="end"
        ></audio>
      </div>
      <div class="article_box">
        <div style="position:relative">
          <div id="article" v-html="list.content" :class="{ more: active }"></div>
          <span class="item-intro-hide"></span>
        </div>
        <a href="javscript:void(0)" id="article_more" @click="more">
          查看全文
          <i class="fa fa-angle-down"></i>
        </a>
      </div>
      <div class="enjoy_box">
        <span>标签:</span>
        <a href="#" v-for="(la, index) in label" :key="index">{{ la }}</a>
        <a class="enjoy_icon">
          <i class="en en-weibo"></i>
          <i class="en en-douban"></i>
          <i class="en en-qzone"></i>
          <i class="en en-wechat"></i>
        </a>
      </div>
      <div class="page_switch">
        <a
          href="javascript:void(0)"
          class="page_pre"
          v-show="list.id != 1"
          @click="prePage(list.id)"
        >
          <i class="fa fa-angle-left">上一篇</i>
        </a>
        <a
          href="javascript:void(0)"
          class="page_pre"
          v-show="list.id != 1025"
          @click="nextPage(list.id)"
        >
          <i class="fa">下一篇 &gt;</i>
        </a>
      </div>
      <div class="content_input_box">
        <textarea
          placeholder="说点什么吧!"
          class="content_input"
          style="resize: none;"
          v-model.trim="content"
        ></textarea>
        <button type="submit" class="content_sub" @click="sendContent">评论</button>
      </div>
      <div class="tab_switch">
        <div class="tab_tit">
          <a href="javascript:void(0)">最新评论({{ contents.length }})</a>
        </div>
        <div class="no-comment" v-if="contents.length == 0">暂无评论</div>
        <ul v-else class="conments">
          <li v-for="(c, index) in re" :key="index" style="position: relative;">
            <span
              style="position: absolute;right: 0;"
              v-if="localUser == c.nikiname"
              @click="removeComments(c.id)"
            >删除</span>
            <div class="comment-avatar fl">
              <router-link :to="'/user/' + c.id">
                <img :src="c.avatar.replace('yuedu.fm', 'yuedufm.com')" width="40" height="40" />
              </router-link>
            </div>
            <div class="comment-c">
              <div class="comment-meta">
                <router-link :to="'/user/' + c.id" class="comment-user">{{ c.nikiname }}</router-link>
                <span>个性签名</span>
                <span>{{ c.reply_time }}</span>
              </div>
              <div class="comment-p">{{ c.content }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="author">
        <div class="angel"></div>
        <div class="artist">
          <div class="artist_pic">
            <a href="javascript:void(0)">
              <img src="../assets/avatar.png" alt />
            </a>
          </div>
          <div class="artist_info">
            <p style="padding-bottom: 15px;">
              <span style="font-size: 16px;">{{ list.podcast }}</span>
              <i class="fa fa-microphone"></i>
            </p>
            <p>作品：31</p>
            <p>粉丝：119</p>
            <a href="javascript:void(0)" class="floow">关注</a>
          </div>
        </div>
        <div class="artist_staus">
          <a class="status_icon status-good" @click="like(),unlike()">
            <i class="fa fa-thumbs-up" :style="{color:liked?'red':''}"></i>
            <span class="hidden">赞</span>
            <span class="like" :style="{color:liked?'red':''}">{{ list.like_count }}</span>
          </a>
          <a class="status_icon status-mark" @click="tip">
            <i class="fa fa-heart"></i>
            <span class="hidden">收藏</span>
            <span class="collection">{{ list.collection_count }}</span>
          </a>
          <a class="status_icon staus_spc">
            <i class="fa">赏</i>
            <span class="hidden">打赏</span>
            <img src="../assets/money_qc.png" alt class="money" />
          </a>
        </div>
      </div>
      <div class="program_list">
        <div class="program_tit">
          <h2>其他相关节目</h2>
          <div class="list_icons">
            <button type="button" @click="left" id="left_icon" style="color:#ccc">
              <i class="fa fa-angle-left"></i>
            </button>
            <button type="button" @click="right" id="right_icon">
              <i class="fa fa-angle-right"></i>
            </button>
          </div>
        </div>
        <div
          class="related-list scroll-wp row"
          style="width:1650px;height:270px;transition: all 0.2s ease 0s;"
          id="img_list"
        >
          <ul>
            <li v-for="(pro, index) in prolist" :key="index" class="prolist">
              <router-link :to="'/article/' + pro.id">
                <img :src="pro.img_url.replace('yuedu.fm', 'yuedufm.com')" />
                <!-- <img :src="pro.img_url" alt /> -->
                <span>{{ pro.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="more_list">
        <div class="program_tit">
          <h2>{{ change }}频道其他节目</h2>
          <div class="list_icons">
            <router-link :to="'/channel/' + list.type_id">
              <span style="margin-left: 10px;">查看更多</span>
            </router-link>
            <a href="javascript:void(0)">
              <i class="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
        <ul>
          <li v-for="(f, index) in five" :key="index">
            <router-link :to="'/article/' + f.id">{{ f.title }}</router-link>
            <p>
              <span>文：{{ f.author }}</span>
              <span>主播：{{ f.podcast }}</span>
            </p>
          </li>
        </ul>
      </div>
      <a href="javascript:void(0)">
        <img src="../assets/item5.jpg" alt style="width: 360px;" />
      </a>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import bus from "../bus";
export default {
  name: "detail",
  data() {
    return {
      localUser: "",
      list: "",
      type: 0,
      five: [],
      count: false,
      id: 1,
      active: true,
      comments: null,
      show: true,
      prolist: [],
      n: 0,
      btn: true,
      time: "00:00",
      reviewStatus: 0,
      content: "",
      contents: "",
      percent: 0,
      status: true,
      timeStatus: false,
      liked: false
    };
  },
  methods: {
    end() {
      this.btn = !this.btn;
    },
    init() {
      const time = this.$refs.audio.duration;
      let m = Math.floor(this.$refs.audio.duration / 60);
      let s = Math.floor(this.$refs.audio.duration % 60);
      if (s < 10) {
        s = "0" + s;
      }
      this.time = m + ":" + s;
      const line = document.getElementsByClassName("play_line_new")[0];
      line.style.width = 0;
    },
    play() {
      this.time = this.list.duration;
      if (isNaN(this.time)) {
        this.time = "00:00";
        this.init();
      }
    },
    getVal(id) {
      axios
        .get("http://localhost:3000/api/article/" + id)
        .then(res => {
          this.list = res.data.res;
          this.getFive(this.list.type_id);
          document.title = this.list.title + "-悦读FM";
          this.swiper();
          this.liked  = res.data.res.isLiked;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getFive(type_id) {
      axios
        .get("http://localhost:3000/api/articles/" + type_id + "/rand")
        .then(res => {
          this.five = res.data.res;
          this.type = type_id;
          bus.$emit("sendType", this.type);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getComments(id) {
      axios
        .get("http://localhost:3000/api/comments/" + id + "/page/1")
        .then(res => {
          this.contents = [];
          if (res.data.res_code == 200) {
            this.id = id;
            this.contents = this.contents.concat(res.data.res);
          } else {
            this.contents = "";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    removeComments(id) {
      axios
        .delete("http://localhost:3000/api/comment/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token
          }
        })
        .then(res => {
          console.log(res);
          this.getComments(this.$route.params.id);
        })
        .catch(error => {
          console.log(error);
        });
    },
    press() {
      this.time = this.list.duration;
      var time = this.$refs.audio.duration - this.$refs.audio.currentTime;
      var mintus = Math.floor(time / 60);
      var seconds = Math.floor(time % 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (mintus == 0) {
        mintus = "0" + mintus;
      }
      this.time = mintus + ":" + seconds;
      this.percent =
        (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100;
      this.$refs.line.style.width = this.percent.toFixed(2) + "%";

      if (this.$refs.audio.currentTime == 0) {
        this.btn = true;
      }
    },
    like() {
      if (window.localStorage.userName) {
        if(!this.liked) {
          axios
          .post(
            "http://localhost:3000/api/article/" +
              this.$route.params.id +
              "/like",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token
              }
            }
          )
          .then(res => {
            this.getVal(this.$route.params.id);
          })
          .catch(error => {
            console.lohg(error);
          });
        }
      } else {
        alert("请登录");
      }
    },
    unlike() {
      if(this.liked) {
         axios.delete("http://localhost:3000/api/article/"+ this.$route.params.id +"/like",
      {
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token
          }
      },
      )
      .then(res => {
          this.getVal(this.$route.params.id);
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    swiper() {
      axios
        .get("http://localhost:3000/api/articles/rand")
        .then(res => {
          this.prolist = this.prolist.concat(res.data.res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    right() {
      var ul = document.getElementById("img_list");
      if (this.n <= -1320) {
        this.n = -1320;
      } else {
        this.n -= 330;
        ul.style.marginLeft = this.n + "px";
      }
    },
    left() {
      var ul = document.getElementById("img_list");
      if (this.n >= 0) {
        this.n = 0;
      } else {
        this.n += 330;
      }
      ul.style.marginLeft = this.n + "px";
    },
    more() {
      this.count = !this.count;
    },
    tip() {
      alert("请先登录");
    },
    nextPage() {
      this.id = ++this.$route.params.id;
      this.$router.replace({
        params: {
          id: this.id
        }
      });
    },
    prePage() {
      this.id = --this.$route.params.id;
      this.$router.push({
        path: '/article/' + this.id
      });
    },
    change_icon() {
      const audio = document.getElementsByTagName("audio")[0];
      this.btn = !this.btn;
      if (!this.btn) {
        audio.play();
        this.status = false;
        this.timeStatus = true;
      } else {
        audio.pause();
      }
    },
    sendContent() {
      if (this.content.length) {
        axios
          .post(
            "http://localhost:3000/api/comment",
            {
              article_id: this.$route.params.id,
              content: this.content
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.token
              }
            }
          )
          .then(res => {
            if (res.data.res_code == 200) {
              alert("评论成功");
              this.content = "";
              this.getComments(this.$route.params.id);
            }
            if (res.data.res_code == 401) {
              alert("请登录！！！");
              window.localStorage.clear();
              window.location.reload();
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("评论不能为空");
      }
    },
    reset() {
      const line = document.getElementsByClassName("play_line_new")[0];
      line.style.width = 0;
    }
  },
  computed: {
    label() {
      return (this.list.labels || "").split(",");
    },
    re() {
      return this.contents.reverse();
    },
    change() {
      return this.list.type_id == "1"
        ? "悦读"
        : this.list.type_id == "2"
        ? "情感"
        : this.list.type_id == "3"
        ? "连播"
        : this.list.type_id == "4"
        ? "校园"
        : this.list.type_id == "5"
        ? "音乐"
        : "Labs";
    }
  },
  watch: {
    $route: {
      handler: function(to) {
        if(this.$route.params.id === undefined) {
          this.$route.params.id = 1025;
        }
        if(to.params.id === undefined || to.params.id > 1025) {
          to.params.id = 1025;
        }
        this.getVal(to.params.id);
        this.getComments(to.params.id);
        this.prolist = [];
        this.status = true;
        this.timeStatus = false;
        this.count = false;
        this.percent = 0;
        (this.time = "00:00"),
        this.n = 0;
          this.$nextTick(function() {
            //页面加载完成后执行
            this.reset();
          });
        this.localUser = window.localStorage.userName;
      },
      immediate: true
    },
    "$router.path": {
      handler(to) {
        location.reload([true]);
      }
    },
    n() {
      var left_icon = document.getElementById("left_icon");
      var right_icon = document.getElementById("right_icon");
      if (this.n <= -1320) {
        right_icon.style.color = "#ccc";
        left_icon.style.color = "#666";
      } else {
        right_icon.style.color = "#666";
      }
      if (this.n == 0) {
        left_icon.style.color = "#ccc";
      } else {
        left_icon.style.color = "#666";
      }
    },
    count() {
      var hidden = document.getElementsByClassName("item-intro-hide")[0];
      var article_more = document.getElementById("article_more");
      if (this.count) {
        this.active = false;
        hidden.style.display = "none";
        article_more.innerHTML = `
        <a href="javscript:void(0)" id="article_more">
          收起
          <i class="fa fa-angle-up"></i>
        </a>`;
      } else {
        this.active = true;
        hidden.style.display = "block";
        article_more.innerHTML = `
        <a href="javscript:void(0)" id="article_more">
          查看全文
          <i class="fa fa-angle-down"></i>
        </a>`;
      }
    }
  }
};
</script>

<style lang="scss">
.main {
  display: flex;
  justify-content: space-around;
  width: 1010px;
  margin: 40px auto 0;
}

.left {
  width: 620px;
}

.media_box {
  padding: 30px;
  margin-bottom: 30px;
  background-color: #fff;
}
.comment-meta span {
  margin-left: 8px;
}
.item-intro-hide {
  display: block;
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, rgba(255, 255, 255, 0)),
    color-stop(1, #fff)
  );
}
.content_tit {
  margin-bottom: 8px;
  font-size: 24px;
  color: #707070;
}

.content_info {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.content_info > span {
  color: #999;
  margin-right: 20px;
}

.no-comment {
  text-align: center;
  padding: 30px 0;
  font-size: 16px;
  background: #fff;
}

.content_info .content_count {
  font-size: 16px;
  margin: 0 0 0 auto;
}

.fa-play,
.fa-pause {
  font-size: 20px !important;
  color: #ee5044;
  cursor: pointer;
}
.comment-avatar {
  width: 40px;
  overflow: hidden;
}
.comment-c {
  margin-left: 55px;
}
.comment-meta {
  margin-bottom: 5px;
  color: #999;
  line-height: 22px;
}
.comment-p {
  margin-bottom: 15px;
}
.meadi_play {
  display: flex;
  align-items: center;
  padding-top: 30px;
}

.line_box {
  position: relative;
  width: 480px;
  height: 20px;
  margin: 0 10px;
}

.play_line {
  position: absolute;
  width: 100%;
  height: 1px;
  top: 10px;
  background-color: #f2f2f2;
}

.play_line_new {
  position: absolute;
  height: 1px;
  top: 10px;
  background-color: #f60;
  z-index: 99;
}
.play_time {
  font-size: 14px;
  color: #a8a8a8;
}

.article_box {
  padding: 20px 30px;
  margin-bottom: 30px;
  background-color: #fff;
}

#article {
  overflow: hidden;
  line-height: 22px;
  letter-spacing: 1px;
  height: auto;
  padding: 7px;
  text-align: justify;
}
.more {
  height: 280px !important;
}

#article_more {
  float: right;
}

.enjoy_box {
  display: flex;
  align-items: center;
  padding: 5px 30px;
  height: 28px;
  background: #fff;
  margin-bottom: 30px;
}

.enjoy_box > a {
  margin-right: 10px;
}

.enjoy_box .enjoy_icon {
  margin: 0 0 0 auto;
}

.en {
  margin: 6px 0 6px 6px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(../assets/icons.png) 0 0 no-repeat;
}

.en-weibo {
  background-position: 0 -104px;
}

.en-douban {
  background-position: 0 -467px;
}

.en-qzone {
  background-position: 0 -52px;
}

.en-wechat {
  background-position: 0 -1612px;
}

.page_switch {
  font-size: 14px;
  padding: 0 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}

.content_input_box {
  display: flex;
  margin-bottom: 30px;
}

.content_input {
  background: #fff;
  width: 530px;
  padding: 10px;
  height: 30px;
  line-height: 16px;
  border: none;
  font-size: 12px;
  overflow: auto;
}

.content_input::-webkit-input-placeholder {
  color: #555;
  letter-spacing: 1px;
}

.content_input:-moz-placeholder {
  color: #555;
  letter-spacing: 1px;
}

.content_inputt:-ms-input-placeholder {
  color: #555;
  letter-spacing: 1px;
}

.content_sub {
  background-color: #ee5044;
  color: #fff;
  border: none;
  outline: none;
  font-size: 12px;
  width: 70px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
}

.tab_switch .tab_tit a {
  display: inline-block;
  padding: 0 15px;
  color: #ee5044;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.conments {
  padding: 30px 30px 0;
  background-color: #fff;
  margin-bottom: 40px;
}

.conments > li {
  display: flex;
  align-items: center;
  border-bottom: 1px dashed #eee;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.avatar_img img {
  width: 40px;
  height: 40px;
}

.user_info {
  margin-left: 15px;
}

.user_meta {
  margin-bottom: 5px;
}

.user_name {
  font-size: 14px;
  font-weight: bold;
}

.send_time {
  margin-left: 10px;
  color: #999;
}

.right {
  width: 360px;
}

.author {
  position: relative;
  padding: 30px;
  margin-bottom: 30px;
  background-color: #fff;
}

.artist {
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px dashed #eee;
}

.artist_pic img {
  width: 80px;
  height: 80px;
}

.artist_info {
  padding-left: 20px;
}

.floow {
  position: absolute;
  right: 80px;
  bottom: 115px;
  padding: 0 15px;
  line-height: 30px;
  color: #fff;
  background-color: #ee5044;
}

.floow:hover {
  color: #fff;
  background-color: #d7382c;
}

.artist_staus {
  display: flex;
  justify-content: space-between;
}

.status_icon {
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid #acacac;
  line-height: 50px;
  text-align: center;
  color: #999;
  margin-right: 15px;
  border-radius: 50%;
  font-size: 18px;
  transition: none;
}

.hidden {
  position: absolute;
  display: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #fff;
}

.money {
  display: none;
  position: absolute;
  left: 75%;
  top: -220%;
  transform: translate(-50%, -50%);
}

.status_icon:hover {
  background-color: #acacac;
  cursor: pointer;
  color: #999;
}

.status_icon:hover > i {
  display: none;
}

.status_icon:hover .hidden {
  display: block;
}

.staus_spc:hover {
  border: 1px solid #d7382c !important;
  background: #d7382c !important;
}

.staus_spc:hover .money {
  display: block;
}

.like {
  position: absolute;
  right: -25px;
  font-size: 20px;
}
.prolist img {
  width: 135px;
  height: 84px;
}
.collection {
  position: absolute;
  right: -25px;
  font-size: 20px;
}

.program_list,
.more_list {
  padding: 30px;
  background: #fff;
  margin-bottom: 30px;
  overflow: hidden;
}

.program_tit {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.program_tit h2 {
  font-weight: 700;
  font-size: 14px;
  color: #707070;
  border-left: 3px solid #ee5044;
  padding-left: 8px;
  line-height: 16px;
}

.program_tit i {
  font-size: 16px;
  padding: 0 5px;
}

.program_imgs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.related-list li a {
  display: block;
}
.related-list li img {
  width: 100%;
  display: block;
}
.related-list li span {
  display: block;
  width: 100%;
  padding-top: 10px;
  line-height: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.related-list li {
  padding-top: 30px;
  width: 135px;
  margin-right: 30px;
  float: left;
}

.more_list ul {
  padding-top: 30px;
}

.more_list ul li {
  padding-bottom: 10px;
  border-bottom: 1px dashed #eee;
  margin-bottom: 10px;
  line-height: 20px;
}

.more_list ul li:last-child {
  border-bottom: none;
}

.more_list ul li span {
  margin-right: 20px;
}

.angel {
  position: absolute;
  top: 63px;
  left: -20px;
  border-right: 10px solid #fff;
  border-bottom: 10px solid transparent;
  border-left: 10px solid transparent;
  border-top: 10px solid transparent;
}

button {
  border: none;
  outline: none;
  background-color: #fff;
  cursor: pointer;
}
audio {
  width: 100%;
}
.tab_switch {
  margin-bottom: 60px;
}
</style>
