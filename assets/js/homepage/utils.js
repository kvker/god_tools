import api from '../api'

export default [
  // 独立功能类型
  {
    path: '/pages/rubbish_categary/index',
    label: '独立功能',
    subs: [{
      label: '垃圾分类',
    }, ]
  },
  // 单参数搜索页面，key是传入请求参数
  {
    path: '/pages/search/index',
    label: '普通搜索',
    subs: [{
        label: '菜谱大全',
        url: api.CAI_PU,
        key: 'word',
        keys: ['cp_name', 'type_name', 'texing', 'tiaoliao', 'yuanliao', 'zuofa', 'tishi'],
      },
      {
        label: '实时油价',
        url: api.OIL_PRICE,
        key: 'prov',
        keys: ['p0', 'p89', 'p92', 'p95', 'p98', 'time'],
      },
      {
        label: '景区查询',
        url: api.SCENIC,
        key: 'word',
      },
      {
        label: '姓氏起源',
        url: api.NAME_FROM,
        key: 'xing',
        keys: ['content'],
      },
      {
        label: '唐诗大全',
        url: api.TANG_SHIS,
        key: 'word',
        hasPage: true,
        canRandom: true,
      },
      {
        label: '股市术语',
        url: api.GU_SHI_LANGUAGE,
        key: 'word',
        keys: ['content'],
      },
      {
        label: '网络梗来源',
        url: api.NET_GENG,
        key: 'word',
      },
      {
        label: '成语典故',
        url: api.CHENG_YU_DIAN_GU,
        key: 'word',
      },
      {
        label: '周公解梦',
        url: api.RESOLVE_DREAM,
        key: 'word',
        keys: ["title", "result"],
      },
      // {
      //   label: '实时股票',
      //   url: api.FINANCE,
      //   key: 'code',
      //   arrayOnly: true,
      // },
      {
        label: '汉字转拼音',
        url: api.HAN_ZI_PIN_YIN,
        key: 'text',
      },
    ],
  },

  // 固定筛选类型
  {
    path: '/pages/picker/index',
    label: '固定筛选',
    subs: [{
      label: '天气诗句',
      url: api.WEATHER_SHI_JU,
      key: 'tqtype',
      keys: ["source", "author", "content"],
      values: ["风", "云", "雨", "雪", "霜", "露", "雾", "雷", "晴", "阴"],
    }, ]
  },

  // 直接获取信息类型，keys是返回拼接参数列表，要按照顺序传
  {
    path: '/pages/info/index',
    label: '直接信息',
    subs: [{
      label: '神回复',
      url: api.GOD_REPLY,
      keys: ["title", "content"],
    }, {
      label: '顺口溜',
      url: api.SHUN_KOU_LIU,
      keys: ["content"],
    }, {
      label: '心灵鸡汤',
      url: api.DUAN_ZI,
      keys: ["author", "content"],
    }, {
      label: '简说历史',
      url: api.EASY_HISTORY,
      keys: ["content"],
    }, {
      label: '精美句子',
      url: api.NICE_JU_ZI,
      keys: ["author", "content"],
    }, {
      label: '优美诗句',
      url: api.NICE_SHI_JU,
      keys: ['source', "author", "content"],
    }, {
      label: '土味情话',
      url: api.TU_LOVE,
      keys: ["content"],
    }, {
      label: '英语一句',
      url: api.ONE_ENGLISH,
      keys: ["en", "zh"],
    }, {
      label: '歇后语',
      url: api.XIE_HOU_YU,
      keys: ["quest", "result"],
    }, {
      label: '网络起名',
      url: api.NET_NAME,
      keys: ["naming"],
    }, {
      label: '历史上今天',
      url: api.HISTORY_TODAY,
      key: 'date',
      keys: ["title", "lsdate"],
    }, {
      label: '脑筋急转弯',
      url: api.HEAD_BACK,
      key: 'date',
      keys: ["quest", "result"],
    }, {
      label: '名言警句',
      url: api.MING_YAN,
      key: 'date',
      keys: ["mrname", "content"],
    }, {
      label: '雷人笑话',
      url: api.FUNNY,
      keys: ["title", "content"],
    }, ]
  },
]
