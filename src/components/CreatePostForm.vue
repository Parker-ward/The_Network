<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="description" class="form-label">description</label>
      <textarea name="description" v-model="editable.description" class="form-control" id="description"
        rows="3"></textarea>
    </div>

    <div class="mb-3">
      <label for="img" class="form-label">img</label>
      <input required type="text" v-model="editable.imgUrl" class="form-control" id="img" placeholder="img..."
        name="imgUrl">
    </div>

    <!-- NOTE delete Button Below-->
    <div>
      <button type="submit" class="btn btn-primary">
        {{ editable.id ? 'Save Changes' : 'Create Post' }}
      </button>
    </div>

  </form>
</template>


<script>
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
            ? await postsService.editPost(editable.value)
            : await postsService.createPost(editable.value)
        } catch (error) {
          Pop.error(error, '[Submit Post]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>