<template>
  <div class="card" style="width: 30rem; ">
    <img :src="post.img" style="height: 15rem" class="card-img-top image-fluid" />
    <div class="card-body">
      <p class="card-text">{{ post.body }}</p>
      <div class="d-flex justify-content-between">
        {{ post.creator.name }}
        {{ post.createdAt }}
        <div>
          <i class="mdi mdi-thumb-up">{{ post.likes.length }}</i>
        </div>
        <!-- NOTE creator name and date to go here -->
        <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
          <img :src="post.creator.picture" :alt="post.creator.name" class="profile-picture"
            :title="`Go to ${post.creator.name}'s profile page! ;^)`">
        </router-link>
      </div>
      <div>
        <button @click="removePost(post.id)" v-if="account.id == post.creatorId" class="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {

  props: {
    post: {
      type: Post,
      required: true
    }
  },

  setup(props) {
    const route = useRoute()
    const postId = route.params.postId

    async function getPostsById() {
      try {
        await postsService.getPostsById(postId)
      } catch (error) {
        Pop.error(error, ' Get post by Id')
      }
    }
    return {
      account: computed(() => AppState.account),
      // post: computed(() => AppState.post),
      async removePost(postId) {
        try {
          await postsService.removePost(postId)
        } catch (error) {
          logger.error()
          Pop.error(error, 'Remove Post')
        }
      },
      setActivePost() {
        postsService.setActivePost(props.post)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-picture {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  box-shadow: 2px 2px 4px black;
}
</style>