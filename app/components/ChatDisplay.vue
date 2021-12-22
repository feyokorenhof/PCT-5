<template>
  <Page actionBarHidden="true">
    <!-- absolute layout for custom actiobar -->
    <AbsoluteLayout>
      <ScrollView width="100%" height="100%" marginTop="10%" marginBottom="5%">
        <StackLayout>
          <GridLayout v-for="msg in chat.messages" :key="msg.message_id">
            <GridLayout v-if="isSender(msg)" columns="*, auto">
              <StackLayout
                orientation="horizontal"
                class="message right"
                col="1"
                @tap="onMessageTap($event, msg)"
              >
                <Label :text="`${msg.text}`" textWrap="true" />
              </StackLayout>
            </GridLayout>
            <GridLayout v-if="!isSender(msg)" columns="auto, *">
              <StackLayout
                orientation="horizontal"
                class="message left"
                col="0"
                @tap="onMessageTap($event, msg)"
              >
                <Label :text="`${msg.text}`" textWrap="true" />
              </StackLayout>
            </GridLayout>
          </GridLayout>
        </StackLayout>
      </ScrollView>
      <GridLayout rows="2*, 12*, *" height="100%" width="100%">
        <ActionBarTop row="0" />
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
import { GridLayout, TapGestureEventData } from "@nativescript/core";
import { Screen } from "@nativescript/core/platform";
import Message from "@/Models/Message";
import Chat from "@/Models/Chat";
@Component({
  name: "ChatDisplay",
  components: {
    ActionBarTop,
    ActionBarBottom
  }
})
export default class ChatDisplay extends Vue {
  @Prop() chat!: Chat;
  get GetSH() {
    return Screen.mainScreen.heightDIPs;
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
}
</script>

<style lang="scss" scoped>
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
  padding: 5 10;
  margin-bottom: 5;
}
.right {
  background-color: #CD1045;
  text-align: right;
  float: right;
}
.left {
  background-color: #615a5c;
}
</style>