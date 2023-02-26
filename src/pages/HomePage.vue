<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form>
          <div class="mb-3">
            <div class="mb-3">
              <label for="description" class="form-label">description</label>
              <textarea name="description" class="form-control" id="description" rows="3"></textarea>
            </div>
            <div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row justify-content-center ">
      <div v-for="p in posts" class="col-md-8 mb-3 d-flex justify-content-center">
        <PostCard :post="p" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';


export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getPosts();
    });
    return {
      posts: computed(() => AppState.posts)
    };
  },
  components: { PostCard }
}
</script>

<style scoped lang="scss"></style>
