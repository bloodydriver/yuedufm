<template>
  <div class="pro_item">
    <div class="side-sponsor">
      <img src="../assets/yueduwx_2.jpg" />
    </div>
    <div class="channel-item channel-top10">
      <h3>{{ type }} TOP10</h3>
      <ul class="channel-list">
        <li v-for="(list, index) in lists" :key="index">
          <router-link :to="'/article/'+list.id">{{ list.title }}</router-link>
          <div>
            <span>文：{{ list.author }}</span>
            <span>主播：{{ list.podcast }}</span>
          </div>
        </li>
      </ul>
    </div>
    <a class="side-sponsor">
      <img src="../assets/list_btm.jpg" />
    </a>
  </div>
</template>
<script>
import axios from "axios";
import bus from "../bus";
export default {
  name: "ProItem",
  data() {
    return {
      lists: [],
      type: null
    };
  },
  methods: {
    getVal(val) {
      axios
        .get("http://localhost:3000/api/articles/" + val + "/top10")
        .then(res => {
          this.lists = [];
          this.type =
            val == "1"
              ? "悦读"
              : val == "2"
              ? "情感"
              : val == "3"
              ? "连播"
              : val == "4"
              ? "校园"
              : val == "5"
              ? "音乐"
              : "Labs";
          this.lists = this.lists.concat(res.data.res.articles);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    bus.$on("changeType", function(data) {
      this.type = data;
    });
  },
  watch: {
    $route: {
      handler(to) {
        this.getVal(to.params.tab);
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss">
.pro_item {
  width: 360px;
}

.side-sponsor {
  width: 360px;
  height: 240px;
  overflow: hidden;
  margin-bottom: 30px;
}
.side-sponsor img {
  width: 100%;
}
.related-item,
.channel-item {
  padding: 30px;
  background: #fff;
  margin-bottom: 30px;
  overflow: hidden;
}
.side-sponsor {
  overflow: hidden;
  margin-bottom: 30px;
}
.channel-top10 li {
  border-bottom: 1px solid #eee;
  list-style: decimal;
  margin-left: 20px;
}
.channel-list li {
  padding-bottom: 10px;
  border-bottom: 1px dashed #eee;
  margin-bottom: 10px;
  line-height: 20px;
}
.channel-list li div span {
  margin-right: 20px;
}
.channel-list {
  padding-top: 30px;
}
.related-item h3,
.channel-item h3,
.my-list h3 {
  font-size: 14px;
  border-left: 3px solid #ee5044;
  padding-left: 8px;
  line-height: 16px;
}
</style>
