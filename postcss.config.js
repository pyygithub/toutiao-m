// postcss.config.js
module.exports = {
  plugins: {
    // 自动添加浏览器厂商声明前缀
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 用于将 px 单位转化为 rem 单位
    // 能够把所有元素的px单位转成Rem
    // rootValue: 转换px的基准值。
    //   1.正常情况下按照你的设计稿来
    //     750 宽的设计稿: 750 / 10 = 75
    //     375 宽的设计稿：375 / 10 = 37.5
    //     Vant 组件是基于 375 宽写的
    //     移动端页面一般都是以 iphone 6/7/8 为原型设计的
    //     Vant 组件库是基于逻辑像素 375 写的
    //     设计稿都是基于物理像素 750 设计的
    //     所以,如果设置为 75, 那么我们就可以在设计稿中测量多少写多少，
    //     但是此时Vant的样式就会小一半。

    //     所以，我们还必须设置为 37.5, 但是在测量设计稿时候，就需要把
    //     测量的值 / 2，这样才能全部适配。

    //     不用计算方案：将ps设计稿模板宽度改为 375 点
    // 编码时, 一个元素宽是75px，则换成rem之后就是2rem
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
