<template>
  <Page actionBarHidden="true">
    <!-- absolute layout for custom actionbar -->
    <AbsoluteLayout>
      <!-- scroll for big amount of chats -->
      <ScrollView width="100%" height="100%" marginBottom="10%">
        <!-- start stacklayout with starter so chats don't fall behind actionbar -->
        <StackLayout> 
          <!-- create a frontend for every chat -->
          <Label height="60"/>
          <Gridlayout
            v-for="chat in this.chats"
            :key="chat.chat_id"
            columns="3*, 2*, 4*, 4*, 2*"
            class="chat-container"
            @tap="goChat($event, chat)"
          >
            <!-- profile picture -->
            <GridLayout row="0" rowSpan="2" col="0">
              <Image :src="chat.pfp_url" class="chat-profile-pic"></Image>
            </GridLayout>
            <!-- username/last message -->
            <GridLayout row="0" col="1" colSpan="3">
              <Label textWrap="true" class="chat-text" ref="chatText">
                <FormattedString>
                  <Span
                    :text="`${format(chat.username)} \n`"
                    fontWeight="bold"
                  ></Span>
                  <Span :text="format(chat.last_message)"></Span>
                </FormattedString>
              </Label>
            </GridLayout>
            <!-- time last message received/sent -->
            <GridLayout row="1" col="5">
              <Label
                :text="chat.message_time"
                class="chat-time-passed"
                textWrap="true"
              ></Label>
            </GridLayout>
          </Gridlayout>
          <!-- end chats with ender so chats don't fall behind bottom actionbar /-->
          <label height="10" class="chat-container"/>
          <label height="50" text="geen chats meer..." fontSize="15" horizontalAlignment="center"/>
          <label height="60"></label>         
        </StackLayout>
      </ScrollView>
      <!-- load in actiobar top and bottom in absolute layout -->
      <GridLayout rows="2*, 12*, *" height="100%" width="100%">
        <ActionBarTop row="0" />
        <ActionBarBottom row="2" />
      </GridLayout>
      <!-- add button chats -->
      <GridLayout columns="5*, 5*, 2*" rows="2*, 12*, 1*" height="94%" width="100%">
        <Image @tap="goChatNew($event)" src="~/Images/add_btn.png" row="2" col="2"></Image>
      </GridLayout> 
      <!-- back button left top -->
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
import { Component, Prop } from "vue-property-decorator";
import { TapGestureEventData } from "@nativescript/core";
import Chat from "@/Models/Chat";
import User from "@/Models/User";
import ActionBarTop from "./ActionBars/ActionBarTop.vue";
import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";
//import Home from "./Home.vue";
import ChatDisplay from "./ChatDisplay.vue";
import ChatNew from "./ChatNew.vue";
import { Screen } from "@nativescript/core/platform";
import {WriteFile, ReadFile, ReadFileSync} from "@/Models/FileSystemFunctions";
import { filter } from "vue/types/umd";

@Component({
  name: "Chats",
  components: {
    ActionBarTop,
    ActionBarBottom
  }
})
export default class Chats extends Vue {
  msg: string = "Chats";
  chats: Array<any> = [];

  // set max character size in string, and when it exceeds max_char it truncates it with ellipsis.
  format(txt: string) {
    if (txt.length > Screen.mainScreen.widthDIPs / 16) return `${txt.substr(0, Screen.mainScreen.widthDIPs / 16)}...`;
    return txt;
  }
  // function to go back to main screen
  goBack() {
    if (this.$modal) this.$modal.close();
  }
  // function to go to the ChatDisplay
  goChat(args: TapGestureEventData, chat: Chat) {
    this.$showModal(ChatDisplay, {
      fullscreen: true,
      props: { chat: chat }
    });
  }
  // function to create new chat
  goChatNew(args: TapGestureEventData) {
      this.$showModal(ChatNew, {
      fullscreen: true,
      props: {onAddNewChat: this.onNewChat}
    });
  }
  onNewChat(chatTemp : Chat) {
    console.log("List push activeert")
    console.log("Chat die gepusht wordt: " + chatTemp)
    this.chats.push(chatTemp);
  }
  // chats to load in, hopefully later via API or local JSON
   beforeMount() {
     var file;
     var FileContentChats = JSON.parse(ReadFileSync("Models", "ChatsJSON.json"))
     console.log(FileContentChats)
     for (file in FileContentChats) {
       console.log(file)
       console.log(`${FileContentChats[file]}`)
       console.log(ReadFileSync("Models", `${FileContentChats[file]}`))
       console.log(JSON.parse(ReadFileSync("Models", `${FileContentChats[file]}`)))
       this.chats.push(JSON.parse(ReadFileSync("Models", `${FileContentChats[file]}`)))
     }
   }
}
</script>

<style lang="scss" scoped>
.chat-container {
  border-top-width: 2px;
  border-color: #757575;
  //background-color: #FFFFFF; // slightlylighter
  //background-color: rgb(102, 101, 101); // og
  //background-color: rgb(61, 60, 60); // instagram
  margin-bottom: 5;
  padding: 10;
}
.chat-profile-pic {
  width: 60;
  height: 60;
  border-radius: 90;
  border-width: 1;
  border-color: #757575;
  object-fit: scale-down;
  background-color: #ffffff;
}
.chat-text {
  color: black;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 18em;
}
.chat-time-passed {
  color: black;
  font-style: italic;
  font-size: 14em;
}
</style>