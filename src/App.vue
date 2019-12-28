<template>
 <div id="app">
   <Tab></Tab>
    <router-view></router-view>
    <Footers></Footers>
  </div>
</template>
<script>
import Tab from './components/Tab';
import Footers from './components/Footer';
export default {
  name: "tab",
  components: {
    Tab,
    Footers
    }
}

</script>
<style lang="scss">
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
button,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}

body {
  background: #f5f5f5;
  color: #707070;
  font: 12px/1.5 "Open Sans", Arial, "Hiragino Sans GB", "Microsoft YaHei",
    "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;
  letter-spacing: 0.5px;
}

td,
th,
caption {
  font-size: 14px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
  font-size: 100%;
}

address,
caption,
cite,
code,
dfn,
em,
strong,
th,
var {
  font-style: normal;
  font-weight: normal;
}

a {
  color: #555;
  text-decoration: none;
  transition: all 0.5s;
}

a:hover {
  color: #f30;
  text-decoration: none;
}

form {
  font-size: 0;
}

img {
  border: none;
}

ol,
ul,
li {
  list-style: none;
}

input,
textarea,
select,
button {
  font: 14px Verdana, Helvetica, Arial, sans-serif;
  outline: none;
}

table {
  border-collapse: collapse;
}

html {
  overflow-y: scroll;
  background-color: #f5f5f5;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #ccc;
  font-size: 12px;
}

.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  *zoom: 1;
}

::selection {
  background: #f30;
  color: #fff;
}

::-moz-selection {
  background: #f30;
  color: #fff;
}

::-webkit-selection {
  background: #f30;
  color: #fff;
}
</style>
