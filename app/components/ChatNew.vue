<template>
    <AbsoluteLayout>
        <!-- text inputs field for user & view for message -->
        <Gridlayout rows="1*, 3*, 1*, 7*" marginTop="10%" height="100%" width="100%">
            <TextField row="0" class="textfield" returnKeyType="next" autocapitalizationType="none" ref="Name" hint="Gebruikersnaam"></TextField>
            <TextView row="1" class="textfield" ref="Message" hint="Bericht" returnKeyType="done"></TextView>
            <Button row="2" class="verzendbutton" text="Verzenden" @tap="openNewChat($event)"></Button>
        </GridLayout>
        <!-- actionbars top/bottom -->
        <GridLayout rows="2*, 12*, *" height="100%" width=100%>
            <ActionBarTop row="0"/>
            <ActionBarBottom row="2" />
        </GridLayout>
        <!-- back button -->
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
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";
import { Button, EventData, GridLayout, ImageAsset, ScrollView, TapGestureEventData, TextField, TextView } from "@nativescript/core";
import ActionBarTop from "./ActionBars/ActionBarTop.vue";
import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";
import * as AppSettings from '@nativescript/core/application-settings';
import Message from "@/Models/Message";
import Chat from "@/Models/Chat";
import Chats from "@/components/Chats.vue"
import ChatDisplay from "./ChatDisplay.vue";

@Component({
    name: "ChatNew",
    components: {
        ActionBarTop,
        ActionBarBottom
    }
})

export default class ChatNew extends Vue {
    msg: string = "ChatNew";
    // function to go back to previous screen
    goBack() {
        if (this.$modal) this.$modal.close();
    }
    openNewChat(event: TapGestureEventData) {
        let rawName: TextField = (this.$refs.Name as any).nativeView as TextField;
        let name = rawName.text.trim()
        let rawtxt: TextView = (this.$refs.Message as any).nativeView as TextView;
        let txt = rawtxt.text.trim()

        if (txt !== null && txt !== "" && name !== null && name !== "") {
            let ChatNew = new Chat(`${this.getRandomInt(99999999)}`, AppSettings.getString("LoggedinID"), `${this.getRandomInt(99999999)}`, name, "https://i.pinimg.com/236x/34/6e/1d/346e1df0044fd77dfb6f65cc086b2d5e.jpg", txt, "nu")
        }
    }
    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
}
</script>

<style lang="scss" scoped>
.textfield {
  color: black;
  font-size: 16;
  background-color: rgb(207, 207, 207);
  border-radius: 10;
  padding: 10;
  border-bottom-width: 1;
  border-bottom-color: transparent;
}
.verzendbutton{
    color:rgb(255, 255, 255);
    border-radius: 75%;
    background-color: #CD1045;
    font-family: Arial;
    font-size: 30%;
    font-weight:bold;
    width: 45%;
    padding: 5;
}
.verzendbutton:active{
    color:white;
    background-color: #a00c36;
}
</style>
