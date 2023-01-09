<template>
  <van-cell
    class="article-item"
    :to="{
      path: `/article/${article.art_id}`
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>

    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <van-image
          class="cover-wrap-item"
          fit="cover"
          v-for="(img, index) in article.cover.images"
          :key="index"
          :src="article.cover.images[0]"
        />
      </div>
      <div class="label-wrap">
        <span class="top" v-if="article.is_top">置顶</span>
        <span>{{article.aut_name}}</span>
        <span>{{article.common_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>

    <div slot="default" v-if="article.cover.type === 1">
      <van-image
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .article-item {
    .title {
      font-size: 14px;
      color: #3a3a3a;
    }
    /deep/ .van-cell__value {
      flex: unset;
      width: 116px;
      height: 73px;
      margin-left: 12px;
    }
    .van-cell__title {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .cover-wrap {
      margin-bottom: 10px;
      width: 100%;
      display: flex;
      .cover-wrap-item {
        height: 73px;
        flex: 1;
        &:not(:last-child) {
          margin-right: 4px;
        }
      }
    }
    .label-wrap {
      font-size: 11px;
      color: #b4b4b4;
      span {
        margin-right: 10px;
      }
      .top {
        color: #ee0a24;
        font-size: 14px;
      }
    }
    .right-cover {
      width: 116px;
      height: 73px;
    }
  }
</style>
