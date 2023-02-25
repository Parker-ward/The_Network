<template>
  <div class="card" style="width: 30rem; ">
    <img :src="post.img" style="height: 15rem" class="card-img-top image-fluid" :alt="'image'">
    <div class="card-body">
      <p class="card-text">{{ post.body }}</p>
      <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
        <img :src="post.creator.picture" :alt="post.creator.name" class="profile-picture"
          :title="`Go to ${post.creator.name}'s profile page! ;^)`">
      </router-link>
    </div>
  </div>
</template>


<script>
import { Post } from '../models/Post.js';

export default {

  props: {
    post: {
      type: Post,
      required: true
    }
  },
  setup() {
    return {}
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