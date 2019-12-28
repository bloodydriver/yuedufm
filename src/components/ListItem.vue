<template>
  <div class="list_item">
    <ul>
      <li v-for="(list, index) in lists" :key="index">
        <div class="channel-pic">
          <router-link :to="'/article/'+ list.id">
            <img :src="list.img_url.replace('yuedu.fm','yuedufm.com')" />
          </router-link>
        </div>
        <div class="channel-body">
          <div class="channel-title">
            <router-link :to="'/article/'+ list.id">
            {{ list.title | formattitle }}
            </router-link>
          </div>
          <div class="channel-meta">
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
              <i class="fa fa-headphones"></i>
              {{ list.play_time }}次
            </span>
          </div>
          <div class="channel-desc">{{ list.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import "font-awesome/css/font-awesome.min.css";
export default {
  name: "ListItem",
  props: {
    lists: {
      type: Array
    }
  },
  filters: {
    formattitle(value) {
      return value.length > 15 ? value.slice(0, 15) + "..." : value;
    }
  }
};
</script>
<style lang="scss">
.list_item {
  width: 620px;
}
.list_item li {
  display: flex;
  overflow: hidden;
  margin-bottom: 30px;
}
.channel-pic img {
  width: 210px;
  height: 210px;
}
.channel-body {
  background-color: #fff;
}
.channel-body {
  margin-left: 210px;
  padding: 30px;
  margin: 0;
}
.channel-title {
  font-size: 18px;
  margin-bottom: 10px;
}
.channel-desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.channel-meta {
  margin-bottom: 25px;
  color: #999;
}
.channel-meta span {
  display: inline-block;
  margin-right: 15px;
}
</style>
