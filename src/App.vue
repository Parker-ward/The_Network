<template>
  <header>
    <Navbar />
    <div v-for="a in ads">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 d-flex justify-content-center">
            <img :src="a.banner" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-6 justify-content-center">
          <div class="text-center">
            <h1>Search Posts</h1>
          </div>
          <form @submit.prevent="searchPosts()">
            <div class="input-group mb-3 me-3">
              <input v-model="editable.query" required type="text" class="form-control" placeholder="Search posts"
                aria-label="Search posts" aria-describedby="button-addon2">
              <button class="btn btn-outline-primary" type="submit" id="button-addon2">
                <i class="mdi mdi-magnify"></i>
              </button>
            </div>
          </form>
        </div>
        <!-- <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <button @click="changePage(currentPage - 1)" class="btn" :disabled="currentPage == 1"
              :class="{ 'btn btn-outline-primary': currentPage == 1, 'btn-outline-dark': currentPage > 1 }">Previous
              Page</button>
            <div class="fs-3 mx-4">{{ currentPage }} of {{ totalPages }}</div>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage == totalPages"
              :class="`btn ${currentPage == totalPages ? 'btn-outline-primary' : 'btn-outline-dark'} `">Next
              Page</button>
          </div>
        </div> -->
      </div>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { postsService } from './services/PostsService.js'
import { logger } from './utils/Logger.js'
import Pop from './utils/Pop.js'

export default {
  setup() {
    const editable = ref({})
    async function getAds() {
      try {
        await postsService.getAds()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }


    onMounted(() => {
      getAds()
    })
    return {
      editable,
      posts: computed(() => AppState.posts),
      currentPage: computed(() => AppState.currentPage),
      totalPages: computed(() => AppState.totalPages),
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads),

      async changePage(pageNumber) {
        try {
          logger.log('page number', pageNumber)
          // if (AppState.query) {
          //   await postsService.changePageWithQuery(pageNumber)
          // }
          // else {
          //   await postsService.changePage(pageNumber)
          // }
        }
        catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },
      async searchPosts() {
        try {
          let searchData = editable.value;
          await postsService.searchPosts(searchData);
          editable.value = {}
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
