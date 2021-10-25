<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="form.title"
                type="text"
                class="form-control form-control-lg"
                placeholder="Article Title"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="form.blogUrl"
                type="text"
                class="form-control form-control-lg"
                placeholder="Article Url"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="form.description"
                type="text"
                class="form-control form-control-lg"
                placeholder="What's this article about?"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                v-model="form.text"
                :rows="8"
                class="form-control"
                placeholder="Write your article (in markdown)"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="newTag"
                type="text"
                class="form-control"
                placeholder="Enter tags"
                @change="addTag"
                @keypress.enter.prevent="addTag"
              />
              <div class="tag-list">
                <span
                  v-for="tag in form.tags"
                  :key="tag._id"
                  class="tag-default tag-pill"
                >
                  <i class="ion-close-round" @click="removeTag(tag.name)" />
                  {{ tag }}
                </span>
              </div>
            </fieldset>
            <button
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit"
              :disabled="!(form.title && form.description && form.text)"
            >
              Publish Article
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { getArticle } from "../services/article/getArticle";
import { postArticle, putArticle } from "../services/article/postArticle";
import toSlug from "../utils/common";

interface FormState {
  title: string;
  blogUrl: string;
  description: string;
  text: string;
  tags: Tag[];
}

export default defineComponent({
  name: "EditArticlePage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const slug = computed<string>(() => route.params.slug as string);

    const form = reactive<FormState>({
      title: "",
      blogUrl: "",
      description: "",
      text: "",
      tags: [],
    });

    const newTag = ref<string>("");
    const addTag = () => {
      form.tags.push(newTag.value.trim());
      newTag.value = "";
    };
    const removeTag = (tag: string) => {
      form.tags = form.tags.filter((t) => t !== tag);
    };

    async function fetchArticle(slug: string) {
      const article = await getArticle(slug);

      // FIXME: I always feel a little wordy here
      form.title = article.title;
      form.description = article.description;
      form.text = article.text;
      form.tags = article.tags;
    }

    onMounted(() => {
      if (slug.value) fetchArticle(slug.value);
    });

    watch(
      computed(() => form.title),
      (val) => {
        form.blogUrl = slug.value ? slug.value : toSlug(val);
      }
    );

    const onSubmit = async () => {
      let article: Article;
      if (slug.value) {
        article = await putArticle(slug.value, form);
      } else {
        article = await postArticle(form);
      }
      return router.push({
        name: "article",
        params: { slug: article.blogUrl },
      });
    };

    return {
      form,
      onSubmit,
      newTag,
      addTag,
      removeTag,
    };
  },
});
</script>
