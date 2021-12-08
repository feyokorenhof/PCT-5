<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout>
      <ScrollView width="100%" height="100%" marginTop="6%" marginBottom="5%">
        <StackLayout>
          <label height="30" class="chat-container" />
          <Gridlayout
            v-for="chat in chats"
            :key="chat.chat_id"
            columns="3*, 2*, 4*, 4*, 2*"
            class="chat-container"
            >
              <GridLayout row="0" rowSpan="2" col="0">
                <Image :src="chat.pfp_url" class="chat-profile-pic"></Image>
              </GridLayout>
              <GridLayout row="0" col="1" colSpan="3" >
                <Label textWrap="true" class="chat-text" ref="chatText">
                  <FormattedString>
                   <Span :text="`${chat.username} \n`" fontWeight="bold"></Span>
                   <Span :text="chat.last_message"></Span>
                  </FormattedString>
                </Label>
              </GridLayout>
              <GridLayout row="1" col="5">
                <Label
                  :text="chat.message_time"
                  class="chat-time-passed"
                  textWrap="true"
                ></Label>
              </GridLayout>    
            </Gridlayout>
          <label height="180" class="chat-container" />
        </StackLayout>
      </ScrollView>
    <GridLayout rows="2*, 12*, *" height="100%" width="100%">
      <ActionBarTop row="0"/>
      <ActionBarBottom row="2"/>
    </GridLayout>
    </AbsoluteLayout>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";
import Chat from "@/Models/Chat";
import User from "@/Models/User";

import ActionBarTop from "./ActionBars/ActionBarTop.vue";
import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";

@Component({
  name: "Chats",
  components: {
    ActionBarTop,
    ActionBarBottom
  }
})

export default class Chats extends Vue {
  msg: string = "Chats";

  chats = [
    {
      chat_id: "1",
      sender_id: "1",
      receiver_id: "2",
      username: "fkorrie",
      pfp_url: "https://cdn.vox-cdn.com/thumbor/VVXayrypyYIMqiHWIYdL77FRF_o=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22408516/Big_Chungus.png",
      last_message: "Over het laatste nieuws gesproken",
      message_time: "18:46"
    },
    {
      chat_id: "2",
      sender_id: "3",
      receiver_id: "2",
      username: "Anonymous",
      pfp_url: "https://stickermaster.nl/30784-large_default/anonymous-sticker.jpg",
      last_message: "Ik weet waar je huis woont, maar je huis weet niet waar ik woon. of wel soms?",
      message_time: "Gisteren"

    }
  ]
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
  width: 80;
  height: 80;
  border-radius: 60;
  border-width: 1;
  border-color: #757575;
  object-fit: scale-down;
  background-color: #FFFFFF;
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

.last-message { 

    width: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

}
</style>