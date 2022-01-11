<template>
  <GridLayout rows="4*, 1*, 8*" height="100%">
    <StackLayout row="0" marginTop="30">
      <Label class="logintext" text="Inloggen" fontSize=54em></Label>
    </StackLayout>
    <StackLayout row = "1">
      <Label class="badlogin" ref="badlog" text="Deze inloggegevens zijn niet geldig. Probeer het opnieuw."></Label>
    </StackLayout>
    <StackLayout row="2">
      <StackLayout marginBottom="10">
        <TextField returnKeyType="next" autocapitalizationType="none" class="nom" ref="Naam" hint="Gebruikersnaam of e-mailadres"></TextField>
        <TextField returnKeyType="done" autocapitalizationType="none" class="nom" ref="Wachtwoord" hint="Wachtwoord" secure="true" @returnPress="goToHome"></TextField>
      </StackLayout>
      <Button class="loginbutton" text="Inloggen" @tap="goToHome"></Button>
      <Label textAlignment="center" @tap="onLinkTap($event)">
        <FormattedString linkTap="goToHome">
          <Label text="Geen account? Klik dan "/>
          <Label class="hiertext" text="hier"/>
        </FormattedString>
      </Label>
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
  import { Button, Color, EventData, Span, TapGestureEventData, TextField } from "@nativescript/core";
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";
  import newPerson from "@/Models/newPerson";
  import "./Loginstyle.css";
  import * as AppSettings from '@nativescript/core/application-settings';

  let users = [new newPerson("user1",
      "https://yt3.ggpht.com/OHpZx8wQoQZiu45LMfcSKvDBO6gfR5_1ro_ZbS3xVpcRIu4Zqy_uHoWKpEdxTUD_Spq6zck0=s900-c-k-c0x00ffffff-no-rj",
      "Rick Slingerland", "kotorem.sama@gmail.com", "password1", "useless thing here", "Student"),
      new newPerson("user2", "https://wallpapernoon.com/wp/medium/anime_pfp_wallpapers_212_df4fe.jpg",
      "Jeremy Jonker", "prachtemail@yopmail.com", "password2", "YES BOYS LETS GOOO", "Student")];

  

  @Component({ name: "Login", components: {}})
  
  export default class Login extends Vue {
    msg: string = "Login";
    
    onLinkTap(args: TapGestureEventData) {
      let button: Button = args.object as Button;
      this.$emit("accountAangevraagd");
    }

    goToHome(args: TapGestureEventData) {
      let button: Button = args.object as Button;
      let gebruikersnaam: TextField = (this.$refs.Naam as any).nativeView as TextField;
      let wachtwoord: TextField = (this.$refs.Wachtwoord as any).nativeView as TextField;
      let loggedin: boolean = false;

      for (var index in users){
        if (loggedin == false){
        if ((users[index].username.toLowerCase() == gebruikersnaam.text.toLowerCase() || users[index].email.toLowerCase() == gebruikersnaam.text.toLowerCase()) && users[index].password == wachtwoord.text){
          this.$emit("onLogin");
          AppSettings.setString("LoggedinUsername", users[index].username);
          AppSettings.setString("LoggedinPFPUrl", users[index].pfp_url);
          AppSettings.setString("LoggedinName", users[index].name);
          AppSettings.setString("LoggedinEmail", users[index].email);
          AppSettings.setString("LoggedinPassword", users[index].password);
          AppSettings.setString("LoggedinDescription", users[index].description);
          AppSettings.setString("LoggedinRole", users[index].role);
        }}
      }
      wachtwoord.text = "";
      gebruikersnaam.className = "WrongG";
      wachtwoord.className = "WrongG";
      let blt = (this.$refs.badlog as any).nativeView;
      blt.className = "badlogin2";
    }
  }
</script>

