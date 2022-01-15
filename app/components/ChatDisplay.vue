<template>
  <Page actionBarHidden="true">
    <!-- absolute layout for custom actiobar -->
    <AbsoluteLayout>
      <ScrollView width="100%" height="100%" marginTop="6%" ref="scrollView"> 
        <StackLayout>
          <Label height="20"/>
          <GridLayout v-for="msg in chat.messages" :key="msg.message_id">
            <GridLayout v-if="isSender(msg)" columns="*, auto" 
                orientation="horizontal"
                @tap="onMessageTap($event, msg)">
                <Label :text="`${msg.text}`" textWrap="true" fontSize="20" class="message right" textAlignment="right" horizontalAlignment="right" marginRight="4" marginLeft="4"/>
            </GridLayout>
            <GridLayout v-if="!isSender(msg)" columns="auto, *"                
                orientation="horizontal"
                @tap="onMessageTap($event, msg)">
                <Label :text="`${msg.text}`" textWrap="true" fontSize="20" class="message left" textAlignment="left" horizontalAlignment="right" marginLeft="4" marginRight="4"/>
            </GridLayout>
          </GridLayout>
          <Label height="120"/>
        </StackLayout>
      </ScrollView>
      <GridLayout rows="2*, 12*, *" height="100%" width="100%">
        <ActionBarTop row="0" />
      </GridLayout>
      <GridLayout rows="16*, 104*, 10*, 1*" columns="16*, 2*, 2, 2" height="100%" width="100%">
        <TextField row="2" width="82.5%" class="message-textfield" ref="Message" hint="Bericht" horizontalAlignment="left" returnKeyType="send" @returnPress="sendMsg($event)"></TextField>
        <Image
          src="~/Images/send_btn.png"
          row="2"
          col="1"
          marginBottom="5"
          @tap="sendMsg($event)"
        ></Image>
      </GridLayout>
      <GridLayout columns="60, 410, 60" rows="50, 720, 60">
        <Image
          src="~/Images/back_btn.png"
          row="0"
          col="0"
          marginTop="10"
          @tap="goBack"
        ></Image>
      </GridLayout>
    </AbsoluteLayout>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import ActionBarTop from "./ActionBars/ActionBarTop.vue";
import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";
import { Component, Prop } from "vue-property-decorator";
import { Button, EventData, GridLayout, ImageAsset, ScrollView, TapGestureEventData, TextField } from "@nativescript/core";
import { Screen } from "@nativescript/core/platform";
import Message from "@/Models/Message";
import Chat from "@/Models/Chat";
import {WriteFile, ReadFile, ReadFileSync} from "@/Models/FileSystemFunctions";
@Component({
  name: "ChatDisplay",
  components: {
    ActionBarTop,
    ActionBarBottom
  }
})
export default class ChatDisplay extends Vue {
  JSONString: string = "";
  @Prop() chat!: Chat;
  get GetSH() {
    return Screen.mainScreen.heightDIPs;
  }
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  isSender(msg: Message) {
    console.log(msg.sender_id == this.chat.sender_id);
    return msg.sender_id == this.chat.sender_id;
  }
  beforeMount() {
    console.log(`Loaded chat with id: ${this.chat.chat_id}`);
  }
  onMessageTap(args: TapGestureEventData, msg: Message) {
    console.log(msg.message_id);
  }
  goBack() {
    if (this.$modal) this.$modal.close();
  }
  sendMsg(event: TapGestureEventData) {
    let rawtxt: TextField = (this.$refs.Message as any).nativeView as TextField;
    let txt = rawtxt.text.trim()
    let JSONChat: Chat;
    if (txt !== null && txt !== "") {
        this.chat.messages.push({
        message_id: `${this.getRandomInt(99999999)}`,
        type: 5,
        image: null,
        video: null,
        text: txt,
        sender_id: this.chat.sender_id,
        receiver_id: this.chat.receiver_id
      })
      
      JSONChat = JSON.parse(ReadFileSync("Models", `${this.chat.chat_id}.json`));
      JSONChat.messages.push({
        message_id: `${this.getRandomInt(99999999)}`,
        type: 5,
        image: null,
        video: null,
        text: txt,
        sender_id: this.chat.sender_id,
        receiver_id: this.chat.receiver_id
      })
      this.JSONString = JSON.stringify(JSONChat)
      WriteFile(this.JSONString, "Models", `${this.chat.chat_id}.json`);

      rawtxt.text = ""
    }
    rawtxt.dismissSoftInput();
  }
  // Scrolldown(data: EventData) {
  // let scrollView: ScrollView = (this.$refs.scrollView as any) as ScrollView
  // scrollView.scrollToVerticalOffset(scrollView.scrollableHeight, false)
  // }
}
</script>

<style lang="scss" scoped>
.message-textfield {
  color: black;
  font-size: 16;
  background-color: rgb(207, 207, 207);
  border-radius: 10;
  padding: 10;
  border-bottom-width: 1;
  border-bottom-color: transparent;
}

.chat-container {
  border-top-width: 2px;
  border-color: #757575;
  //background-color: #FFFFFF; // slightlylighter
  //background-color: rgb(102, 101, 101); // og
  //background-color: rgb(61, 60, 60); // instagram
  padding: 5;
}
.message {
  color: white;
  border-radius: 20;
  padding: 5 8;
  margin-bottom: 5;
}
.right {
  background-color: #CD1045;
  // horizontal-align: right;
}
.left {
  background-color: #615a5c;
}
</style>