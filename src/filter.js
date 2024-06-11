const host = window.location.host;
const isGoogle = () => {
  const regex = /www.google.com|www.google.co.jp|www.google.cn|www.google.com.hk/i;
  return regex.test(host);
};
const isBing = () => {
  const regex = /www.bing.com|cn.bing.com/i;
  return regex.test(host);
};
const isBaidu = () => {
  const regex = /www.baidu.com/i;
  return regex.test(host);
};

const GoogleFilter = (regex) => {
  const results = document.querySelectorAll('.g');
  results.forEach((result) => {
    const url = result.querySelector('.yuRUbf a').href;
    if (url.match(regex)) {
      result.style.display = 'none';
    }
  });
};
const BingFilter = (regex) => {
  const results = document.querySelectorAll('#b_results > .b_algo');
  results.forEach((result) => {
    const url = result.querySelector('.b_tpcn a').href;
    if (url.match(regex)) {
      result.style.display = 'none';
    }
  });
};
const BaiduFilter = (regex) => {
  const results = document.querySelectorAll('#content_left > .c-container');
  results.forEach((result) => {
    const url = result.getAttribute('mu');
    if (url.match(regex)) {
      result.style.display = 'none';
    }
  });
};
const observer = (regex) => {
  const MObserver =
    window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  const observer = new MObserver(() => {
    if (isGoogle()) {
      GoogleFilter(regex);
    } else if (isBing()) {
      BingFilter(regex);
    } else if (isBaidu()) {
      BaiduFilter(regex);
    }
  });
  const option = {
    childList: true
  };
  observer.observe(document.body, option);
};
const filter = () => {
  chrome.storage.sync.get('filter', function (data) {
    let regex;
    if (!data.filter) {
      regex = new RegExp('^$');
    } else {
      regex = new RegExp(data.filter);
    }
    observer(regex);
  });
};
filter();
