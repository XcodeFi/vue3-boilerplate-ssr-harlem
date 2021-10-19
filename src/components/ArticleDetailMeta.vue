<template>
  <div class="article-meta">
    <AppLink
      name="profile"
      :params="{username: article.author.email}"
    >
      <img :src="article.author.profilePicUrl">
    </AppLink>

    <div class="info">
      <AppLink
        name="profile"
        :params="{username: article.author.email}"
        class="author"
      >
        {{ article.author.email }}
      </AppLink>

      <span class="date">{{ (new Date(article.createdAt)).toLocaleDateString() }}</span>
    </div>

    <button
      v-if="displayFollowButton"
      :aria-label="article.author.following ? 'Unfollow' : 'Follow'"
      class="btn btn-sm btn-outline-secondary space"
      :disabled="followProcessGoing"
      @click="toggleFollow"
    >
      <i class="ion-plus-round space" />
      {{ article.author.following ? "Unfollow" : "Follow" }} {{ article.author.email }}
    </button>

    <button
      :aria-label="article.favorited ? 'Unfavorite article' : 'Favorite article'"
      class="btn btn-sm space"
      :class="[article.favorited ? 'btn-primary':'btn-outline-primary']"
      :disabled="favoriteProcessGoing"
      @click="favoriteArticle"
    >
      <i class="ion-heart space" />
      {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Article
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>

    <AppLink
      v-if="displayEditButton"
      aria-label="Edit article"
      class="btn btn-outline-secondary btn-sm space"
      name="edit-article"
      :params="{slug: article.blogUrl}"
    >
      <i class="ion-edit space" /> Edit Article
    </AppLink>

    <button
      v-if="displayEditButton"
      aria-label="Delete article"
      class="btn btn-outline-danger btn-sm"
      @click="onDelete"
    >
      <i class="ion-trash-a" /> Delete Article
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import { deleteArticle } from '../services/article/deleteArticle'

import { useFavoriteArticle } from '../composable/useFavoriteArticle'
import { useFollow } from '../composable/useFollowProfile'

import { user, checkAuthorization } from '../store/user'

export default defineComponent({
  name: 'ArticleDetailMeta',
  props: {
    article: { type: Object as PropType<Article>, required: true },
  },
  emits: {
    update: (article: Article) => !!article.blogUrl,
  },
  setup (props, { emit }) {
    const router = useRouter()

    const { article } = toRefs(props)
    const displayEditButton = computed(() => checkAuthorization(user) && user.value.username === article.value.author.email)
    const displayFollowButton = computed(() => checkAuthorization(user) && user.value.username !== article.value.author.email)

    const { favoriteProcessGoing, favoriteArticle } = useFavoriteArticle({
      isFavorited: computed(() => article.value.favorited),
      articleSlug: computed(() => article.value.blogUrl),
      onUpdate: newArticle => emit('update', newArticle),
    })

    const onDelete = async () => {
      await deleteArticle(article.value.blogUrl)
      await router.push({ name: 'global-feed' })
    }

    const { followProcessGoing, toggleFollow } = useFollow({
      following: computed(() => article.value.author.following),
      username: computed(() => article.value.author.email),
      onUpdate: (author: Profile1) => {
        const newArticle = { ...article.value, author }
        emit('update', newArticle)
      },
    })

    return {
      displayEditButton,
      displayFollowButton,
      onDelete,
      favoriteProcessGoing,
      favoriteArticle,
      followProcessGoing,
      toggleFollow,
    }
  },
})
</script>

<style scoped>
.space {
  margin-right: 8px;
}
</style>
