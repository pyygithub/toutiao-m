<template>
  <div class="article-container">
     <!-- 顶部导航 -->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章标题 -->
    <h1 class="title">{{article.title}}</h1>

    <!-- 用户信息 -->
    <van-cell class="author-info" center>
      <div class="name" slot="title">{{article.aut_name}}</div>
      <van-image
        class="img"
        slot="icon"
        round
        fit="cover"
        :src="article.aut_photo"
      />
      <div class="pub-date" slot="label">
        {{ article.pubdate | relativeTime }}
      </div>
      <van-button
        class="follow-btn"
        size="small"
        :icon="article.is_followed ? '' : 'plus'"
        :type="article.is_followed ? 'default' : 'info'"
        round
      >
        {{article.is_followed ? '已关注' : '关注'}}
      </van-button>
    </van-cell>

    <!-- 文章内容 -->
    <div ref="article-content" class="content markdown-body" v-html="article.content"/>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticle } from '@/api/article'
import { ImagePreview } from 'vant'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      const { data } = await getArticle(this.articleId)
      console.log(data)
      this.article = data.data

      // 数据改变影响实体更新 - 不是立即的
      // 如果想立即获取到 dom 内容，需要时用下面方法
      this.$nextTick(() => {
        this.handlePreviewImage()
      })
      // 为所有的图片注册click事件
    },
    handlePreviewImage () {
      // 获取所有图片
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .article-container {
    .title {
      font-size: 20px;
      color: #3a3a3a;
      padding: 14px;
      background-color: #fff;
      margin: 0;
    }
    .author-info {
      .name {
        font-size: 12px;
        color: #333;
      }
      .img {
        width: 45px;
        height: 45px;
        margin-right: 8px;
      }
      .pub-date {
        color: #b4b4b4;
      }
      .follow-btn {
        width: 65px;
        height: 29px;
      }
    }

    .markdown-body {
      background-color: #fff;
      padding: 14px;
    }
  }
</style>
