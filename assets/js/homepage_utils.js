import api from './api'

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
        label: '姓氏起源',
        url: api.NAME_FROM,
        key: 'xing',
      },
      {
        label: '实时油价',
        url: api.OIL_PRICE,
        key: 'prov',
      },
      {
        label: '景区查询',
        url: api.SCENIC,
        key: 'word',
      },
      {
        label: '唐诗三百',
        url: api.TANG_SHI,
        key: 'word',
        hasPage: true,
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
      values: ["风","云","雨","雪","霜","露","雾","雷","晴","阴"],
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
      label: '名人名言',
      url: api.PEOPLE_SAY,
      keys: ["author", "content"],
    }, {
      label: '土味情话',
      url: api.TU_LOVE,
      keys: ["content"],
    }, {
      label: '英语一句',
      url: api.ONE_ENGLISH,
      keys: ["en", "zh"],
    }, {
      label: '敬请期待', // 敬请期待，放个笑话
      url: api.FUNNY,
      keys: ["title", "content"],
    }, ]
  },
]
