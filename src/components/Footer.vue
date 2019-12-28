<template>
  <footer>
    <div class="footer_left">
      <div class="about_us">
        <a href="javascript:void(0)">关于我们</a>
        <span class="line">|</span>
        <a href="javascript:void(0)">加入我们</a>
      </div>
      <span class="copyright">© 2010-2016 Yuedu.fm All rights reserved 粤ICP备14076392号</span>
    </div>
    <div class="footer_icons">
      <a href="javascript:void(0)" class="footer_icon">捐</a>
      <a href="javascript:void(0)" class="footer_icon">
        <i class="fa fa-weixin"></i>
      </a>
      <a href="javascript:void(0)" class="footer_icon">
        <i class="fa fa-weibo"></i>
      </a>
    </div>
  </footer>
</template>
<script>
export default {
  name: "footers"
};
</script>
<style lang="scss">
footer {
  width: 1010px;
  margin: 0 auto;
  padding-bottom: 40px;
  display: flex;
  justify-content: space-between;
}

.about_us {
  color: #707070;
  padding-bottom: 8px;
}

.about_us span {
  padding: 10px;
  color: #aaa;
}

.copyright {
  color: #aaa;
}

.footer_icon {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: relative;
  border-radius: 50%;
  background: #ddd;
  font-size: 20px;
  display: inline-block;
  margin-left: 10px;
  color: #707070;
}

</style>