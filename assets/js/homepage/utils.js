import api from '../api'

export default [{
    label: '摇骰子',
    wxmpid: 'wx370aae98dc3ead4b',
  },
  // 独立功能类型
  {
    label: '快速数钱',
    single: true,
    path: '/pages/merge_money/index',
  },
  {
    label: '垃圾分类',
    single: true,
    path: '/pages/rubbish_categary/index',
  },
  // 单参数搜索页面，key是传入请求参数
  {
    label: '菜谱大全',
    url: api.CAI_PU,
    path: '/pages/search/index',
    params: {
      key: 'word',
      keys: ['cp_name', 'type_name', 'texing', 'tiaoliao', 'yuanliao', 'zuofa', 'tishi'],
    }
  },
  {
    label: '实时油价',
    url: api.OIL_PRICE,
    path: '/pages/search/index',
    params: {
      key: 'prov',
      keys: ['p0', 'p89', 'p92', 'p95', 'p98', 'time'],
    }
  },
  {
    label: '景区查询',
    url: api.SCENIC,
    path: '/pages/search/index',
    params: {
      key: 'word',
    }
  },
  {
    label: '姓氏起源',
    url: api.NAME_FROM,
    path: '/pages/search/index',
    params: {
      key: 'xing',
      keys: ['content'],
    }
  },
  {
    label: '唐诗大全',
    url: api.TANG_SHIS,
    path: '/pages/search/index',

    params: {
      key: 'word',
      hasPage: true,
      canRandom: true,
    }
  },
  {
    label: '股市术语',
    url: api.GU_SHI_LANGUAGE,
    path: '/pages/search/index',
    params: {
      key: 'word',
      keys: ['content'],
    }
  },
  {
    label: '网络梗来源',
    url: api.NET_GENG,
    path: '/pages/search/index',
    params: {
      key: 'word',
    }
  },
  {
    label: '成语典故',
    url: api.CHENG_YU_DIAN_GU,
    path: '/pages/search/index',
    params: {
      key: 'word',
    }
  },
  {
    label: '周公解梦',
    url: api.RESOLVE_DREAM,
    path: '/pages/search/index',
    params: {
      key: 'word',
      keys: ["title", "result"],
    }
  },
  {
    label: '汉字转拼音',
    url: api.HAN_ZI_PIN_YIN,
    path: '/pages/search/index',
    params: {
      key: 'text',
    }
  },

  // 固定筛选类型
  {
    label: '天气诗句',
    url: api.WEATHER_SHI_JU,
    path: '/pages/picker/index',
    params: {
      key: 'tqtype',
      keys: ["source", "author", "content"],
      values: ["风", "云", "雨", "雪", "霜", "露", "雾", "雷", "晴", "阴"],
    }
  },

  // 直接获取信息类型，keys是返回拼接参数列表，要按照顺序传
  {
    label: '神回复',
    url: api.GOD_REPLY,
    path: '/pages/info/index',
    params: {
      keys: ["title", "content"],
    }
  }, {
    label: '顺口溜',
    url: api.SHUN_KOU_LIU,
    path: '/pages/info/index',
    params: {
      keys: ["content"],
    }
  }, {
    label: '心灵鸡汤',
    url: api.DUAN_ZI,
    path: '/pages/info/index',
    params: {
      keys: ["author", "content"],
    }
  }, {
    label: '简说历史',
    url: api.EASY_HISTORY,
    path: '/pages/info/index',
    params: {
      keys: ["content"],
    }
  }, {
    label: '精美句子',
    url: api.NICE_JU_ZI,
    path: '/pages/info/index',
    params: {
      keys: ["author", "content"],
    }
  }, {
    label: '优美诗句',
    url: api.NICE_SHI_JU,
    path: '/pages/info/index',
    params: {
      keys: ['source', "author", "content"],
    }
  }, {
    label: '土味情话',
    url: api.TU_LOVE,
    path: '/pages/info/index',
    params: {
      keys: ["content"],
    }
  }, {
    label: '英语一句',
    url: api.ONE_ENGLISH,
    path: '/pages/info/index',
    params: {
      keys: ["en", "zh"],
    }
  }, {
    label: '歇后语',
    url: api.XIE_HOU_YU,
    path: '/pages/info/index',
    params: {
      keys: ["quest", "result"],
    }
  }, {
    label: '网络起名',
    url: api.NET_NAME,
    path: '/pages/info/index',
    params: {
      keys: ["naming"],
    }
  }, {
    label: '历史上今天',
    url: api.HISTORY_TODAY,
    path: '/pages/info/index',
    params: {
      key: 'date',
      keys: ["title", "lsdate"],
    }
  }, {
    label: '脑筋急转弯',
    url: api.HEAD_BACK,
    path: '/pages/info/index',
    params: {
      key: 'date',
      keys: ["quest", "result"],
    }
  }, {
    label: '名言警句',
    url: api.MING_YAN,
    path: '/pages/info/index',
    params: {
      key: 'date',
      keys: ["mrname", "content"],
    }
  }, {
    label: '古代情诗',
    url: api.LOVE_SHI,
    path: '/pages/info/index',
    params: {
      keys: ["source", "author", 'content'],
    }
  }, {
    label: '雷人笑话',
    url: api.FUNNY,
    path: '/pages/info/index',
    params: {
      keys: ["title", "content"],
    }
  },
]
