
import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
  async getPosts() {
    const res = await api.get('/api/posts')
    logger.log('[getting posts]', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
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

  // async editPost(postData) {
  //   const res = await api.put(/api/posts / + postData.id, postData)
  //   let i = AppState.posts.findIndex(p => p.id == postData.id)
  //   if (i == -1) {
  //     throw new Error('are you sure?')
  //   }
  //   AppState.posts.splice(i, 1, res.data)
  // }

  async getPostsById() {
    AppState.post = null
    const res = await api.get('/api/posts/', + postId)
    AppState.post = res.data
  }

  async removePost(postId) {
    const res = await api.delete('/api/posts/', + postId)
    let i = AppState.posts.findIndex(p => post.id == postId)
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
}


export const postsService = new PostsService()