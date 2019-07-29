let host = 'https://lc-vdtaziqw.cn-e1.lcfile.com'

let imgPaths = {
  searchIcon: '/380cd34fdd6a53444068/god_utils_search.png',
  homeHeader: '/f46958c978de7292f540/god_utils_header.png',
  vLineUrl: '/4575142956cc21460df2/god_utils_v_line.png',
  knowledge: '/b75d3713731bfe4029e4/god_utils_rubbish_test.png',
  check: '/0fdb91d831e62aeb8064/god_utils_rubbish_img.png',
  local: '/7ee4ba69622fa5cba9f6/local_blue.png',
  arrowDown: '/dc3ca034e9fccd2cdd3e/arrow_down_blue.png',
  thunder: '/54b23cd226cc65b813a7/thunder_blue.png',
}

for (let key in imgPaths) {
  if(imgPaths.hasOwnProperty(key)) {
    imgPaths[key] = host + imgPaths[key]
  }
}

export default imgPaths
