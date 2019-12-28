<template>
  <div class="page">
    <div class="pg">
        <span @click="prePage" v-show="active1">上一页</span>
      <span
        v-for="(page, index) in test"
        :key="index"
        :class="{light: id == page}"
        @click="change(page)"
        >
        {{ page }}
      </span>
       <span @click="nextPage(count)" v-show="active2">下一页</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import bus from "../bus";
export default {
  name: "page",
  data() {
    return {
      id : 1,
      page: 1,
      active1: false,
      active2: true,
      length: 1,
      arr: []
    };
  },
  props: ["count", "types"],
  methods: {
    change(page) {
      this.id = page;
      this.$router.push({
        name: "page",
        params: {
          page
        }
      });
    },
    nextPage() {
      this.page = ++this.$route.params.page;
      this.id = this.page
      this.$router.replace({
        name: "page",
        params: {
          page: this.page
        }
      });
    },
    prePage() {
      this.page = --this.$route.params.page;
      this.id = this.page
      this.$router.replace({
        name: "page",
        params: {
          page: this.page
        }
      });
    }
  },
  watch: {
    count: {
      handler(to) {
        this.length = Math.ceil(to / 10);
      },immediate:true
    },
    $route: {
      handler(to) {
        
        if(!to.params.page) {
          this.id = 1
        }else {
          this.id = to.params.page;
        }

        if (to.params.page <= 1) {
          this.active1 = false;
        } else {
          this.active1 = true;
        }
        if (to.params.page == this.length) {
          this.active2 = false;
        } else {
          this.active2 = true;
        }

        if (isNaN(to.params.page) && typeof to.params.page === "undefined") {
          to.params.page = 1;
          this.active1 = false;
        }
      },immediate: true
    },
    '$route.params.tab' (to) {
      this.id = 1;
    },immediate: true,
  },
  computed: {
   test() {
     let left;
     let right;
     let arr = [];
     if(Math.ceil(this._props.count / 10)> 8) {
       if(this.id >= 6 && this.id< Math.ceil(this._props.count / 10) - 3) {
         left = this.id - 4;
         right = Number(this.id) + 4;
       }else if(this.id < 8) {
         left = 1;
         right = 8;
       }else {
         right = Math.ceil(this._props.count / 10);
         left = Math.ceil(this._props.count / 10) - 4;
       }
     }else {
       left = 1;
       right = Math.ceil(this._props.count / 10)
     }
     while(left <= right) {
       arr.push(left);
       left++;
     }
     return arr;
   }
  },
  created() {
    bus.$on("sendCount", data => {
      this.length = Math.ceil(data / 10);
      if(this.$route.params.page == this.length ) {
        this.active2 = false;
      }else {
        this.active2 = true;
      }
    })
  }
};
</script>
<style lang="scss">
.light {
  color: #f30;
}
.pg {
  text-align: center;
  padding: 30px;
}
.pg a,
.pg span {
  padding: 3px 10px;
}
span {
  cursor: pointer;
}
</style>
