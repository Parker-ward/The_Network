
import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
  async getPosts() {
    const res = await api.get('/api/posts')
    logger.log('[getting posts]', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.previousPage = res.data.newer
    AppState.nextPage = res.data.older
    // logger.log('posts', new Post)
  }

  async createPost(postData) {
    const res = await api.post('/api/posts', postData)
    logger.log('[My post]', res.data)
    let newpost = new Post(res.data)
    AppState.posts = [newpost, ...AppState.posts]
  }

  async getPostsByQuery(query) {
    const res = await api.get('api/posts', { params: query })
    logger.log('get posts by profile', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async getPostsById(postId) {
    AppState.post = null
    const res = await api.get('/api/posts/' + postId)
    AppState.post = res.data
  }

  async removePost(postId) {
    const res = await api.delete('/api/posts/' + postId)
    let i = AppState.posts.findIndex(p => p.id == postId)
    if (i != -1) {
      AppState.posts.splice(i, 1)
    }
  }

  clearPosts() {
    AppState.posts = []
  }

  setActivePost(post) {
    AppState.post = post
  }

  async getAds() {
    const res = await api.get('/api/ads')
    AppState.ads = res.data
  }

  async changePage(url) {
    const res = await api.get(url)
    logger.log('[page change]', res.data)
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
    AppState.posts = res.data.posts.map(p => new Post(p))
  }


  async changePageWithQuery(pageNumber) {
    const res = await api.get('api/posts', { params: { page: pageNumber, query: AppState.query } })
    logger.log('changing page', res.data)
    AppState.posts = res.data.results.map(p => new Post(p))
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.total_pages
  }
  async searchPosts(searchData) {
    const res = await api.get('api/posts', { params: searchData })
    logger.log('searching api', res.data)
    AppState.query = searchData.query
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.totalpages
  }
}


export const postsService = new PostsService()

