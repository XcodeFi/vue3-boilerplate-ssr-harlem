<template>
  <div class="banner">
    <div class="container">
      <h1>{{ article.title }}</h1>

      <ArticleDetailMeta
        :article="article"
        @update="updateArticle"
      />
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <!-- eslint-disable vue/no-v-html  -->
      <div
        class="col-md-12"
        v-html="articleHandledBody"
      />
      <!-- eslint-enable vue/no-v-html  -->

      <!-- TODO: abstract tag list component-->
      <ul class="tag-list">
        <li
          v-for="tag in article.tags"
          :key="tag._id"
          class="tag-default tag-pill tag-outline"
        >
          {{ tag.name }}
        </li>
      </ul>
    </div>

    <hr>

    <div class="article-actions">
      <ArticleDetailMeta
        :article="article"
        @update="updateArticle"
      />
    </div>
  </div>
</template>

<script lang="ts">
import marked from 'src/plugins/marked'
import { getArticle } from 'src/services/article/getArticle'
import { computed, defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import ArticleDetailMeta from './ArticleDetailMeta.vue'

export default defineComponent({
  name: 'ArticleDetail',
  components: {
    ArticleDetailMeta,
  },
  async setup () {
    debugger
    const route = useRoute()
    const slug = route.params.slug as string
    const article = reactive<Article>(await getArticle(slug))

    const articleHandledBody = computed(
      () => article.text && marked(article.text),
    )

    const updateArticle = (newArticle: Article) => {
      Object.assign(article, newArticle)
    }

    return {
      article,
      articleHandledBody,
      slug,
      updateArticle,
    }
  },
})
</script>
