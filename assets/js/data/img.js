let host = 'https://lc-vdtaziqw.cn-e1.lcfile.com'

let imgPaths = {
  searchIcon: '/380cd34fdd6a53444068/god_utils_search.png',
  homeHeader: '/f46958c978de7292f540/god_utils_header.png',
  vLineUrl: '/4575142956cc21460df2/god_utils_v_line.png',
  knowledge: '/b75d3713731bfe4029e4/god_utils_rubbish_test.png',
  check: '/0fdb91d831e62aeb8064/god_utils_rubbish_img.png',
  local: '/7ee4ba69622fa5cba9f6/local_blue.png',
  arrowDown: '/dc3ca034e9fccd2cdd3e/arrow_down_blue.png',
  
  // 天气图标，天气预报会自动带上后面文件名与格式
  'yin.png': '/4536d80bc9573b12b758/yin.png',
  'xue.png': '/673301fcbedd81bddfdb/xue.png',
  'qing.png': '/988f35ce5ab8096f665d/qing.png',
  'yu.png': '/c09bead3e5c2f8b02518/yu.png',
  'shachen.png': '/1a00fe86c390880e010f/shachen.png',
  'wu.png': '/aaedbd0de647fc254dfd/wu.png',
  'yun.png': '/18906b1bcacccf0c67ad/yun.png',
  'lei.png': '/0b4ac27cf71384f7c2f3/lei.png',
  'bingbao.png': '/fe79385fde2c8bd2c65d/bingbao.png',
  
  oilSubBg:'/db516815067d33674d58/oil_sub_bg.png',
}

for (let key in imgPaths) {
  if(imgPaths.hasOwnProperty(key)) {
    imgPaths[key] = host + imgPaths[key]
  }
}

export default imgPaths
