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
        <Button id="loginbutton2" class="loginbutton" text="Inloggen" @tap="goToHome"></Button>
        <Button id="loginbutton" class="loginbutton2" text="Registreren" @tap="goToAccount"></Button>
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
  import "./Loginstyle.css";
  import * as AppSettings from '@nativescript/core/application-settings';
  import UserProfile from "~/Models/UserProfile";
  import {WriteFile, ReadFile, ReadFileSync, FileExist} from "@/Models/FileSystemFunctions";

  @Component({ name: "Login", components: {}})
  
  export default class Login extends Vue {
    msg: string = "Login";
    public JSONString = "";
    users: Array<any> = [];

    usersuitjason(){
      try{
        if (FileExist("Models", "UsersListJSON.json") == true){
          var FileContent = ReadFileSync("Models", "UsersListJSON.json");
          var JSONFileContent = JSON.parse(FileContent);
          var post;
          for (post in JSONFileContent){
            this.users.push(JSONFileContent[post]);
            console.log(this.users)
          }
          console.log("Test: " + JSONFileContent)
        }
      }
      catch (error)
      { 
        console.log(error)
      }
    }

    onLinkTap(args: TapGestureEventData) {
      let button: Button = args.object as Button;
      this.$emit("accountAangevraagd");
    }

    goToAccount(){
      this.$emit("accountAangemaakt");
    }

    goToHome(args: TapGestureEventData) {
      let button: Button = args.object as Button;
      let gebruikersnaam: TextField = (this.$refs.Naam as any).nativeView as TextField;
      let wachtwoord: TextField = (this.$refs.Wachtwoord as any).nativeView as TextField;
      let loggedin: boolean = false;
      let ProfielStuff: UserProfile;
      let blt = (this.$refs.badlog as any).nativeView;
      this.usersuitjason()

      for (var index in this.users){
        if (loggedin == false){
          if ((this.users[index].username.toLowerCase() == gebruikersnaam.text.toLowerCase() || this.users[index].email.toLowerCase() == gebruikersnaam.text.toLowerCase()) && this.users[index].password == wachtwoord.text){
            gebruikersnaam.className = "nom";
            wachtwoord.className = "nom";
            blt.className = "badlogin";

            AppSettings.setString("LoggedinUsername", this.users[index].username);
            AppSettings.setString("LoggedinPFPUrl", this.users[index].pfp_url);
            AppSettings.setString("LoggedinName", this.users[index].name);
            AppSettings.setString("LoggedinEmail", this.users[index].email);
            AppSettings.setString("LoggedinPassword", this.users[index].password);
            AppSettings.setString("LoggedinDescription", this.users[index].description);
            AppSettings.setString("LoggedinRole", this.users[index].role);
            AppSettings.setString("LoggedinID", this.users[index].ID);

            //User information to JSON string
            ProfielStuff = new UserProfile(this.users[index].name, this.users[index].pfp_url, this.users[index].role, this.users[index].email, this.users[index].description);
            this.JSONString = `${JSON.stringify(ProfielStuff)}`;
            //JSON.parse(this.JSONString)
            console.log(this.JSONString);
            
            WriteFile(this.JSONString, "Models", "UserJSON.json");
            console.log(ReadFileSync("Models", "UserJSON.json"));
          
            //back to Home
            this.$emit("onLogin");
            loggedin = true;

          }
          else{
          }
        }
      }
      wachtwoord.text = "";
      if (loggedin == false){  
        gebruikersnaam.className = "WrongG";
        wachtwoord.className = "WrongG";
        blt.className = "badlogin2";
      }
    }
  }
</script>

