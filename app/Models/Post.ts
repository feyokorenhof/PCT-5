import {PostType} from "./PostType";
export default class Post {
    type: PostType;
    header: String;
    image: any;
    footer: String;
    comments: any[];
    id: String;
    likes: Number;
    constructor(id: String, type: PostType, header: String, image: any, footer: String, likes: Number) {
        this.id = id;
        this.type = type;
        this.header = header;
        this.image = image;
        this.footer = footer;
        this.comments = [];
        this.likes = likes;
    }
}
