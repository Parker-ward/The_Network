import { Profile } from "./Account.js"

export class Post {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.img = data.imgUrl
    this.creatorId = data.creatorId
    this.likeIds = data.likeIds
    this.likes = data.likes
    this.createdAt = new Date(data.createdAt).toLocaleDateString()
    this.creator = new Profile(data.creator)
  }
}

