<template>
  <Page actionBarHidden="true">
    <!-- absolute layout for custom actionbar -->
    <AbsoluteLayout>
      <!-- scroll for big amount of chats -->
      <ScrollView width="100%" height="100%" marginTop="10%" marginBottom="10%">
        <!-- start stacklayout with starter so chats don't fall behind actionbar -->
        <StackLayout>
          <!-- create a frontend for every chat -->
          <Gridlayout
            v-for="chat in chats"
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
        <Image src="~/Images/add_btn.png" row="2" col="2"></Image>
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
import { Screen } from "@nativescript/core/platform";
@Component({
  name: "Chats",
  components: {
    ActionBarTop,
    ActionBarBottom
  }
})
export default class Chats extends Vue {
  msg: string = "Chats";

  // set max character size in string, and when it exceeds max_char it truncates it with ellipsis.
  format(txt: string) {
    if (txt.length > Screen.mainScreen.widthDIPs / 18) return `${txt.substr(0, Screen.mainScreen.widthDIPs / 18)}...`;
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
  // chats to load in, hopefully later via API or local JSON
  chats = [
    {
      chat_id: "1",
      sender_id: "1",
      receiver_id: "2",
      username: "fkorrie",
      pfp_url:
        "https://cdn.vox-cdn.com/thumbor/VVXayrypyYIMqiHWIYdL77FRF_o=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22408516/Big_Chungus.png",
      last_message: "Over het laatste nieuws gesproken",
      message_time: "18:46",
      messages: [
        {
          type: 5,
          text: "Sup biggas!",
          message_id: "1",
          sender_id: "1",
          receiver_id: "2"
        },
        {
          type: 5,
          text: "Sup foo.",
          message_id: "2",
          sender_id: "2",
          receiver_id: "1"
        },
        {
          type: 5,
          text: "Over het laatste nieuws gesproken",
          message_id: "3",
          sender_id: "1",
          receiver_id: "2"
        }
      ]
    },
    {
      chat_id: "2",
      sender_id: "3",
      receiver_id: "2",
      username: "Anonymous",
      pfp_url:
        "https://stickermaster.nl/30784-large_default/anonymous-sticker.jpg",
      last_message:
        "Ik weet waar je huis woont, maar je huis weet niet waar ik woon. Of wel soms?",
      message_time: "Gisteren",
      messages: [
        {
          type: 5,
          text:
            "Ik weet waar je huis woont, maar je huis weet niet waar ik woon. Of wel soms?",
          message_id: "1",
          sender_id: "3",
          receiver_id: "2"
        }
      ]
    }
  ];
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
  width: 70;
  height: 70;
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
  font-size: 22em;
}
.chat-time-passed {
  color: black;
  font-style: italic;
  font-size: 18em;
}
</style>