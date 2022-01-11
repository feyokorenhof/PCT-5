import {PostType} from "./PostType";
export default class Post {
    type: PostType;
    image: any;
    footer: String;
    comments: any[];
    id: String;
    likes: String[];
    constructor(id: String, type: PostType, image: any, footer: String, likes: String[]) {
        this.id = id;
        this.type = type;
        this.image = image;
        this.footer = footer;
        this.comments = [];
        this.likes = likes;
    }
}
