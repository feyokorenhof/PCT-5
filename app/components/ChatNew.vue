<template>
    <AbsoluteLayout>
        <!-- text inputs field for user & view for message -->
        <!-- TODO: create function to check if user exists -->
        <Gridlayout rows="1*, auto, 1*, 1*, 7*" marginTop="10%" height="100%" width="100%" class="backgroundChats">
            <TextField row="0" class="textfield" returnKeyType="next" autocapitalizationType="none" ref="Name" hint="Gebruikersnaam" @textChange="changeText"></TextField>
            <ScrollView class="textfield" row="1" ref="scrollView" width="92%">
                <StackLayout width="92%">
                    <Label v-for="suggestion in suggestions" :key="suggestion" :text="suggestion"/>
                </StackLayout>
            </ScrollView>
            <TextField row="2" class="textfield" ref="Message" hint="Bericht" returnKeyType="done"></TextField>
            <Button row="3" class="verzendbutton" text="Verzenden" @tap="openNewChat($event)"></Button>
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
import { Button, EventData, GridLayout, ImageAsset, ScrollView, TapGestureEventData, TextField, TextView, SearchBar } from "@nativescript/core";
import ActionBarTop from "./ActionBars/ActionBarTop.vue";
import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";
import * as AppSettings from '@nativescript/core/application-settings';
import Message from "@/Models/Message";
import Chat from "@/Models/Chat";
import Chats from "@/components/Chats.vue";
import ChatDisplay from "./ChatDisplay.vue";
import {WriteFile, ReadFile, ReadFileSync} from "@/Models/FileSystemFunctions";
import {Levenshtein} from "@/Models/Levenshtein";
import newPerson from "~/Models/newPerson";

@Component({
    name: "ChatNew",
    components: {
        ActionBarTop,
        ActionBarBottom
    }
})

export default class ChatNew extends Vue {
    msg: string = "ChatNew";
    JSONString: string = "";
    JSONStringFile: string = "";
    PushChat!: Chat;
    @Prop() onAddNewChat!: any;
    suggestions: Array<string> = [];
    users: Array<string> = [];
    // function to go back to previous screen
    goBack() {
        if (this.$modal) this.$modal.close();
    }

    onClose() {
        console.log("test print");
        console.log("Dit is de Chat die gepusht wordt: " + this.PushChat)
        this.onAddNewChat(this.PushChat);
        if (this.$modal) this.$modal.close();
    }
    // TODO: add current time
    // TODO: create ID system
    openNewChat(event: TapGestureEventData) {
        let rawName: TextField = (this.$refs.Name as any).nativeView as TextField;
        let name = rawName.text.trim()
        let rawtxt: TextView = (this.$refs.Message as any).nativeView as TextView;
        let txt = rawtxt.text.trim()

        if (txt !== null && txt !== "" && name !== null && name !== "") {
            let tempID = `${this.getRandomInt(99999999)}`
            let tempIDChat = `${this.getRandomInt(99999999)}`
            let newMessage = new Message(`${this.getRandomInt(99999999)}`, 5, null, null, txt, AppSettings.getString("LoggedinID"), tempID)
            let newchat = new Chat(tempIDChat, AppSettings.getString("LoggedinID"), tempID, name, "https://i.pinimg.com/236x/34/6e/1d/346e1df0044fd77dfb6f65cc086b2d5e.jpg", [newMessage], txt, "nu")
            let ChatsArray : Array<any>;
            //Chat information to JSON string
            this.PushChat = newchat;
            console.log(this.PushChat)
            this.JSONString = `${JSON.stringify(newchat)}`;
            console.log(`newchat: ${this.JSONString}`);

            // Adding JSON name of chat to db of all chat names
            ChatsArray = JSON.parse(ReadFileSync("Models", "ChatsJSON.json"));
            ChatsArray.push(`${tempIDChat}.json`)
            this.JSONStringFile = JSON.stringify(ChatsArray)
            console.log(`AllChats2: ${ChatsArray}`);
            WriteFile(this.JSONStringFile, "Models", "ChatsJSON.json")
            console.log(ReadFileSync("Models", "ChatsJSON.json"))

            WriteFile(this.JSONString, "Models", `${tempIDChat}.json`);
            console.log(ReadFileSync("Models", `${tempIDChat}.json`))
            this.onClose();
        }
    }
    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
    beforeMount() {
        var file;
        var FileContentChats = JSON.parse(ReadFileSync("Models", "UsersListJSON.json"))
        console.log(FileContentChats)
        for (file in FileContentChats) {
            console.log(file)
            console.log(`${FileContentChats[file].username}`)
            this.users.push(`${FileContentChats[file].username}`)
        }
    }
    changeText(){
        let rawName: TextField = (this.$refs.Name as any).nativeView as TextField;
        let Name: string = rawName.text.toLowerCase();
        let Names!: string;
        console.log(rawName.text)
        this.suggestions = []

        let names = this.users;

        if(Name.length != 0){
            for(Names in names){
                console.log(names[Names].toLowerCase())
                console.log(Levenshtein(Name, names[Names].toLowerCase()))
                if(Levenshtein(Name.trim(), names[Names].toLowerCase().trim()) < (Name.length/2) || (names[Names].toLowerCase().trim().includes(Name.toLowerCase().trim())) && (Name.length > 2)){
                    this.suggestions.push(names[Names])
                    console.log(`these are the suggestions 1: ${this.suggestions}`)
                }
            }
        }
        console.log(`these are the suggestions 2: ${this.suggestions}`)
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
.backgroundChats {
  background-color: rgb(239, 239, 239);
}
</style>
