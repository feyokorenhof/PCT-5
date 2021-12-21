import {MessageType} from "./MessageType";
export default class Message {
    type: MessageType;
    image: any;
    video: any;
    text: any;
    message_id: String;
    sender_id: string;
    receiver_id: string;
    constructor(id: String, type: MessageType, image: any, video: any, text: any, sender_id: string, receiver_id: string) {
        this.message_id = id;
        this.type = type;
        this.image = image;
        this.video = video;
        this.text = text;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
    }
}