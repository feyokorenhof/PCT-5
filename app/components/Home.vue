<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout>
    <GridLayout rows="2*, 12*, *" height="100%" width=100%>
      
      <Login row="1" v-show="!loggedIn&&!accountaanvragen" @onLogin="login" @accountAangevraagd="acaangevraagd"/>
      <AccountAanvragen row="1" v-show="accountaanvragen" @accountAangevraagd="acaangevraagd"/>
      
    </GridLayout>
    <GridLayout height="100%" width=100%>
      <Posts row="1" v-show="loggedIn&&!accountaanvragen" @onLogin="login"/>
    </GridLayout>
    <GridLayout rows="2*, 12*, *" height="100%" width=100%>
      <ActionBarTop row="0" v-show="loggedIn"/>
      <ActionBarTopLogIn row="0" v-show="!loggedIn"/>
      <ActionBarBottom row="2" />
    </GridLayout>
    <GridLayout columns="60, 410, 60" rows="50, 720, 60">
        <Image v-show="accountaanvragen" src="~/Images/back_btn.png" row="0" col="0" marginTop="10" @tap="acaangevraagd" ></Image>
      </GridLayout>
    <GridLayout columns="60, 410, 60" rows="50, 720, 60">
      <Button v-show="loggedIn" class="logoutbutton" text="Uitloggen" @tap="login"></Button>
    </GridLayout>
    <!-- <Image :src="this.loggedinprofile" width = "40" height="40" horizontalAlignment="right" class="profile-pic"></Image> -->
    </AbsoluteLayout>
  </Page>
</template>

<script lang="ts">  
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";

import ActionBarTop from "./ActionBars/ActionBarTop.vue";
import ActionBarTopLogIn from "./ActionBars/ActionBarTopLogIn.vue";
import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";
import Login from "./Login.vue";
import Posts from "./Posts.vue";
import AccountAanvragen from "./AccountAanvragen.vue";
import * as AppSettings from '@nativescript/core/application-settings';
import {WriteFile, ReadFileSync, FileExist} from "@/Models/FileSystemFunctions";
import Post from "@/Models/Post";

if (!AppSettings.hasKey("Loggedin")){
  AppSettings.setBoolean("Loggedin", false);
}
if (!AppSettings.hasKey("accountRequested")){
  AppSettings.setBoolean("accountRequested", false);
}
// AppSettings.setBoolean("accountRequested", false);

@Component({
  name: "Home",
  components: {
    ActionBarTop,
    ActionBarBottom,
    Login,
    Posts,
    AccountAanvragen,
    ActionBarTopLogIn
  }
})
export default class Home extends Vue {
  msg: string = "Home";
  loggedIn: boolean = AppSettings.getBoolean("Loggedin");
  accountaanvragen: boolean = false;

  beforeMount(){
    try {
        if (FileExist("Models", "PostJSON.json") != true){
          let basicPost = new Post("0", 2, "Hajar Akkouh" ,"~/Images/welcome.png" , "Welkom bij de Team Phidippides Chat App!", [])
          let postArray: Array<Post> = [basicPost];      
          let postString: string = JSON.stringify(postArray)
          WriteFile(postString, "Models", "PostJSON.json");
          console.log("post as a string: " + postString)
          console.log(ReadFileSync("Models", "PostJSON.json"));
          console.log("File not found, created new one!");
          console.log(JSON.parse(ReadFileSync("Models", "PostJSON.json")));
        }
      }
      catch (error){
      console.log("an error has occured") 
      }
  }

  profilepicture(){
    return AppSettings.getString('LoggedinPFPUrl');
  }

  login() {
    if (AppSettings.getBoolean("Loggedin") == true){
      AppSettings.setBoolean("Loggedin", false);
      this.loggedIn = false;
      AppSettings.remove("LoggedinUsername");
      AppSettings.remove("LoggedinPFPUrl");
      AppSettings.remove("LoggedinName");
      AppSettings.remove("LoggedinEmail");
      AppSettings.remove("LoggedinPassword");
      AppSettings.remove("LoggedinDescription");
      AppSettings.remove("LoggedinRole");
      AppSettings.remove("LoggedinID");
    }
    else{
      AppSettings.setBoolean("Loggedin", true);
      this.loggedIn = true;
    }
  }
  acaangevraagd(){
    this.accountaanvragen = !this.accountaanvragen;
  }
}
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

// Custom styles

.logoutbutton{
  display: inline-block;
  color: rgb(255, 255, 255);
  border-radius: 10%;
  background-color: rgb(57, 55, 121);
  font-family: Arial;
  font-size: 10;
  font-weight: bold;
  width: 60;
  height: 20;
  margin-left: 40;
  margin-top: -4;
  box-shadow: 6px 6px 6px rgba(0,0,0,155);
}

.logoutbutton:active{
    color:white;
    background-color: rgb(21, 18, 110);
    box-shadow: 6px 6px 6px rgba(0,0,0,200);
}

.fas {
  @include colorize($color: accent);
}
</style>