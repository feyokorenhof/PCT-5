import {PostType} from "./PostType";
export default class Post {
    type: PostType;
    header: String;
    image: any;
    footer: String;
    constructor(type: PostType, header: String, image: any, footer: String) {
        this.type = type;
        this.header = header;
        this.image = image;
        this.footer = footer;
    }
}
