<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="body" class="form-label">Body</label>
      <textarea name="body" v-model="editable.body" class="form-control" id="body" rows="3"></textarea>
    </div>

    <div class="mb-3">
      <label for="img" class="form-label">img</label>
      <input required type="text" v-model="editable.imgUrl" class="form-control" id="img" placeholder="img..."
        name="imgUrl">
    </div>

    <!-- NOTE delete Button Below-->
    <div>
      <button type="submit" class="btn btn-primary">
        {{ editable.id ? 'Save Changes' : 'Submit' }}
      </button>
    </div>

  </form>
</template>


<script>
import { ref } from 'vue';
import { router } from '../router.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          const post = editable.value.id
          // ? await postsService.editPost(editable.value)
          await postsService.createPost(editable.value)
          editable.value = {}
          if (post?.id) {
            router.push({ name: 'Post', params: { postId: post.id } })
          }
        } catch (error) {
          Pop.error(error, '[Submit Post]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>