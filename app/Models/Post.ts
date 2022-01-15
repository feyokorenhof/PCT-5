import {PostType} from "./PostType";
export default class Post {
    type: PostType;
    image: any;
    footer: String;
    username: String;
    comments: any[];
    id: String;
    likes: String[];
    constructor(id: String, type: PostType, username: String, image: any, footer: String, likes: String[]) {
        this.id = id;
        this.type = type;
        this.username = username;
        this.image = image;
        this.footer = footer;
        this.comments = [];
        this.likes = likes;
    }
}
