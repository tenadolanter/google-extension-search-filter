import { ElMessage } from 'element-plus';
/**
 * 判断字符串是否在数组中
 */
export const isStringInArray = (str, arr) => {
  return arr.some((item) => item.includes(str));
};

/**
 * 判断字符串是否在数组中
 */
export const utilAddRule = (ruleValue) => {
  const rule = ruleValue?.trim();
  if (!rule) {
    ElMessage('请输入规则');
  } else {
    chrome.storage.sync.get('filter', (data) => {
      let filter = data?.filter?.split('|') ?? [];
      const filterItem = `${rule}/{0,}.*?`;
      if (!filter.length) {
        filter.push(filterItem);
      } else if (filter.length && !isStringInArray(rule, filter)) {
        filter.push(filterItem);
      }
      chrome.storage.sync.set({ filter: filter.join('|') });
      ElMessage('添加规则成功');
      window.location.reload(true);
    });
  }
};

/**
 * 打开配置页面
 */
export const utilOpenOptions = () => {
  chrome.runtime.openOptionsPage();
};

/**
 * 获取配置的规则列表
 */
export const utilRuleList = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('filter', (data) => {
      if (data?.filter?.length > 0) {
        let rs = data.filter.trim().split('|');
        resolve(rs);
      }
    });
  });
};

export const utilRuleRemove = (index) => {
  chrome.storage.sync.get('filter', (data) => {
    if (data?.filter?.length > 0) {
      let filter = data.filter.trim().split('|');
      filter.splice(index, 1);
      chrome.storage.sync.set({ filter: filter.join('|') });
    }
  });
  window.location.reload(true);
};
