<template>
  <div class="popup-wrap">
    <div class="header">
      <div class="title">{{ pkg.name }}</div>
      <div class="version">{{ pkg.version }}</div>
    </div>
    <div class="body">
      <div>这是一个屏蔽垃圾搜索结果的扩展程序，感谢你的安装。你可以通过如下方式添加规则：</div>
      <div>1. 屏蔽 *.example.com ，输入 example.com</div>
      <div>2. 屏蔽 prefix.example.com/* ，输入 prefix.example.com</div>
    </div>
    <div class="footer">
      <el-input class="footer-input" v-model="rule" placeholder="输入规则"></el-input>
      <el-button class="footer-btn" type="primary" @click="handlerNewRule">添加规则</el-button>
      <el-button class="footer-btn" type="info" @click="handlerClickConsole">控制面板</el-button>
    </div>
  </div>
</template>

<script>
import pkg from '../../package.json'
export default {
  data() {
    return {
      pkg,
      rule: ''
    }
  },
  methods: {
    handlerNewRule() {
      if (!this.rule) {
        console.log(1111)
      }
    },
    handlerClickConsole() {
      chrome.runtime.openOptionsPage(function () {})
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-wrap {
  width: 300px;
  padding: 8px;
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3em;
    .title {
      font-size: 2em;
      color: var(--el-color-primary);
    }
    .version {
      margin-left: 8px;
      display: inline-block;
      min-width: 10px;
      padding: 3px 7px;
      font-size: 12px;
      font-weight: 700;
      line-height: 1;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      background-color: #777;
      border-radius: 10px;
    }
  }
  .body {
    line-height: 2em;
    font-size: 1.2em;
    color: #333;
    margin: 1em 0;
    word-break: break-all;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    .footer-input {
      flex: 1 0 0;
      margin-right: 12px;
    }
    .footer-btn {
      font-size: 12px;
      padding: 0 8px;
    }
  }
}
</style>
