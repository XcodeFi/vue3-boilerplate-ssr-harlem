<template>
  <div class="article-preview">
    <div class="article-meta">
      <AppLink name="profile" :params="{ username: article.author.email }">
        <img :src="article.author.profilePicUrl" />
      </AppLink>
      <div class="info">
        <AppLink
          name="profile"
          :params="{ username: article.author.email }"
          class="author"
        >
          {{ article.author.email }}
        </AppLink>
        <span class="date">{{
          new Date(article.createdAt).toDateString()
        }}</span>
      </div>

      <button
        :aria-label="
          article.favorited ? 'Unfavorite article' : 'Favorite article'
        "
        class="btn btn-sm pull-xs-right"
        :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
        :disabled="favoriteProcessGoing"
        @click="() => favoriteArticle()"
      >
        <i class="ion-heart" /> {{ article.favoritesCount }}
      </button>
    </div>

    <AppLink
      name="article"
      :params="{ slug: article.blogUrl }"
      class="preview-link"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          v-for="tag in article.tags"
          :key="tag._id"
          class="tag-default tag-pill tag-outline"
        >
          {{ tag.name }}
        </li>
      </ul>
    </AppLink>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useFavoriteArticle } from "../composable/useFavoriteArticle";

export default defineComponent({
  name: "ArticlesListArticlePreview",
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  emits: {
    update: (article: Article) => !!article.blogUrl,
  },
  setup(props, { emit }) {
    const { favoriteProcessGoing, favoriteArticle } = useFavoriteArticle({
      isFavorited: computed(() => props.article.favorited),
      articleSlug: computed(() => props.article.blogUrl),
      onUpdate: (newArticle: Article): void => emit("update", newArticle),
    });

    return {
      favoriteProcessGoing,
      favoriteArticle,
    };
  },
});
</script>
