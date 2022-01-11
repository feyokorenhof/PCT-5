import Message from "./Message";

export default class Chat{
    chat_id: string;
    sender_id: string;
    receiver_id: string;
    username: String;
    pfp_url: String;
    messages: Message[];
    last_message: String;
    message_time: String;

    constructor(chat_id: string, sender_id: string, receiver_id: string, username: String, pfp_url: String, messages: Message[], last_message: String, message_time: String){
        this.chat_id = chat_id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.username = username;
        this.pfp_url = pfp_url;
        this.messages = messages;
        this.last_message = last_message;
        this.message_time = message_time;
    }
}