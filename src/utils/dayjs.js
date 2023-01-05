// 初始化dayjs相关配置
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用相对时间
dayjs.extend(relativeTime)

// 配置中文语言包
dayjs.locale('zh-cn')

Vue.filter('relativeTime', value => {
  console.log(value)
  return dayjs(value).from(dayjs())
})
