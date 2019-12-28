<template>
<div>
  <div class="main">
    <list-item :lists="lists"></list-item>
    <pro-item></pro-item>
  </div>
  <page :count="count" :types="types"></page>
</div>
</template>
<script>
import axios from "axios";
import bus from "../bus";
import ListItem from "./ListItem";
import ProItem from "./ProItem";
import Page from "./Page";
export default {
  name: "list",
  components: {
    "list-item": ListItem,
    "pro-item": ProItem,
    "page": Page,
  },
  data() {
    return {
      lists: [],
      types: 1,
      page: 1,
      count: 0
    };
  },
  methods: {
    getVal(data,page) {
      axios
        .get(
          "http://localhost:3000/api/articles/" + this.types + "/page/" + this.page
        )
        .then(res => {
          this.lists = [];
          this.lists = this.lists.concat(res.data.res.articles);
          this.count = res.data.res.count;
          bus.$emit("sendCount",this.count);
          this.types = data; 
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  watch: {
    $route: {
      handler(to) {
        this.types = to.params.tab;
        this.page = to.params.page;
        if(typeof this.page ==="undefined") {
          this.page = 1
        }
        this.getVal(to.params.tab,to.params.page);
        bus.$emit("sendType",this.$route.params.tab)
      },
      immediate: true
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
</style>