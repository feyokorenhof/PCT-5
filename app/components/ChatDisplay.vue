<template>
    <Page actionBarHidden="true">
        <!-- absolute layout for custom actiobar -->
        <AbsoluteLayout>
            <ScrollView width="100%" height="100%" marginTop="6%" marginBottom="5%">
                <StackLayout>
                    <label height="80" class="chat-container" />
                    <label height="80" text:`${otherChatID}` class="chat-container" />
                </StackLayout>
            </ScrollView>
            <GridLayout rows="2*, 12*, *" height="100%" width="100%">
                <ActionBarTop row="0"/>
            </GridLayout>
            <GridLayout columns="60, 410, 60" rows="50, 720, 60">
                <Image src="~/Images/back_btn.png" row=0 col=0 marginTop=10 @tap="goBack"></Image>
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

@Component({
  name: "ChatDisplay",
  components: {
    ActionBarTop,
    ActionBarBottom
  }
})

export default class ChatDisplay extends Vue {
    goBack() {
        if (this.$modal) this.$modal.close();
    }

    @Prop() receiver_id!: string;

    beforeMount() {
        console.log(`receiver_id: ${this.receiver_id}`);
    }
};

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
</style>