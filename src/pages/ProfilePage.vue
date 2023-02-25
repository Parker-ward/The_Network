<template>
  <div>Hello in the profile page</div>

  <div v-if="profile" class="container-fluid">
    <div class="row">
      <div class="col-md-10">
        <img :src="profile.picture" alt="{{profile.name}}" class="profile-picture rounded-circle">
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { profilesService } from '../services/ProfilesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const route = useRoute()
    async function getProfileById() {
      try {
        const profileId = route.params.profileId
        logger.log("[profileId]", profileId)
        await profilesService.getProfileById(profileId)
      }
      catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }




    onMounted(() => {
      getProfileById()
    })
    return {
      profile: computed(() => AppState.profile)
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-picture {
  height: 20vh;
  width: 20vh;
  object-fit: cover;
}
</style>