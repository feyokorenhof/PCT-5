import {MessageType} from "./MessageType";
export default class Message {
    type: MessageType;
    image: any;
    video: any;
    text: String;
    id: String;
    constructor(id: String, type: MessageType, image: any, video: any, text: String) {
        this.id = id;
        this.type = type;
        this.image = image;
        this.video = video;
        this.text = text;
    }
}