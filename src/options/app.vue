<template>
  <div class="options-wrap">
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
      <el-input class="footer-input" size="large" v-model="rule" placeholder="输入规则"></el-input>
      <el-button class="footer-btn" size="large" type="primary" @click="handlerNewRule">
        添加规则
      </el-button>
    </div>
    <el-table class="options-rules" :data="tableData" stripe border empty-text="暂无数据">
      <el-table-column label="过滤规则">
        <template #default="scope">
          <span>{{ scope.row.replace('/{0,}.*?', '') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template #default="scope">
          <el-button class="rule-btn" type="primary" text @click="handlerRemoveRule(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import pkg from '../../package.json';
import { utilAddRule, utilRuleList, utilRuleRemove } from '../utils.js';
export default {
  data() {
    return {
      pkg,
      rule: '',
      tableData: []
    };
  },
  mounted() {
    this.getRuleList();
  },
  methods: {
    handlerNewRule() {
      utilAddRule(this.rule);
    },
    async getRuleList() {
      const rules = await utilRuleList();
      this.tableData = rules;
    },
    handlerRemoveRule(index) {
      utilRuleRemove(index);
    }
  }
};
</script>

<style lang="scss" scoped>
.options-wrap {
  width: 800px;
  padding: 8px;
  margin: 0 auto;
  .header {
    display: flex;
    align-items: center;
    height: 3em;
    .title {
      font-size: 3em;
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
    font-size: 1.5em;
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
      padding: 0 8px;
    }
  }
  .options-rules {
    width: 100%;
    margin-top: 24px;
    font-size: 16px;
    border-radius: 4px;
    .rule-btn {
      padding: 0;
    }
  }
}
:deep(.el-table thead) {
  font-weight: bold;
  color: #606c76;
  font-size: 16px;
}
</style>
