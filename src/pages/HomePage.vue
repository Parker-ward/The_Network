<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <!-- <form>
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
        </form> -->

        <CreatePostForm v-if="account.id" />
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-outline-dark w-20" :disabled="!previousPage"
          @click="changePage(previousPage)">Previous</button>

        <button class="btn btn-outline-dark w-20" :disabled="!nextPage" @click="changePage(nextPage)">Next</button>
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
import CreatePostForm from '../components/CreatePostForm.vue';
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
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),

      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  },
  components: { PostCard, CreatePostForm }
}
</script>

<style scoped lang="scss"></style>
