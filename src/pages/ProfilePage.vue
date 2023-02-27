<template>
  <div v-if="profile" class="container">
    <div class="row mt-4">
      <div class="col-12 text-center">
        <img :src="profile.picture" alt="" class="profile-picture rounded-circle">
      </div>
      <div class="col-12 text-center">
        <img :src="profile.coverImg" alt="" class="img-fluid cover-image">
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3 d-flex justify-content-between align-items-baseline">
        <h1>
          <span>
            {{ profile.graduated ? 'Graduated' : '' }}
            {{ profile.name }}

          </span>
          <span v-if="profile.github">
            <a :href="profile.github" target="_blank">
              <i class="mdi mdi-github"></i>
            </a>
          </span>
        </h1>

        <div class="col-12">
          <p>{{ profile.bio }}</p>
        </div>
      </div>
      <div class="row">
        <div v-for="p in post" class="col-md-7 m-auto mb-5 d-flex justify-content-center">
          <PostCard class="elevation-5 border-bottom border-dark border-5" :post="p" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfilesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute()
    async function getProfileById() {
      try {
        const profileId = route.params.profileId
        // logger.log("[profileId]", profileId)
        await profilesService.getProfileById(profileId)
      }
      catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    async function getPostsByCreatorId() {
      try {
        const profileId = route.params.profileId;
        logger.log("profile id", profileId)
        await postsService.getPostsByQuery({ creatorId: profileId });
      }
      catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getProfileById()
      getPostsByCreatorId()
    })
    return {
      profile: computed(() => AppState.profile),
      post: computed(() => AppState.posts)
    }
  },
  components: { PostCard },

}
</script>


<style lang="scss" scoped>
.cover-image {
  height: 40vh;
  width: 100%;
  object-fit: cover;
  background-attachment: fixed;

}

.profile-picture {
  height: 30vh;
  width: 30vh;
  object-fit: cover;
}
</style>