<template>
  <GridLayout rows="4*, 1*, 8*" height="100%">
    <StackLayout row="0" marginTop="50">
      <Label text="Inloggen" textAlignment="center" fontSize="32"></Label>
    </StackLayout>
    <StackLayout row="2">
      <StackLayout marginBottom="10">
        <TextField ref="Naam" hint="Naam of e-mailadres"></TextField>
        <TextField ref="Wachtwoord" hint="Wachtwoord" secure="true"></TextField>
      </StackLayout>
      <Button class="-outline -rounded-sm" borderColor="3EC0FF" text="Login" padding="5" @tap="goToHome"></Button>
      <Label textAlignment="center">
        <FormattedString>
          <Span text="Geen account? Klik dan "/>
          <Span 
            text="hier." 
            color="blue"
            textDecoration="underline"
            fontWeight="bold"
          />
        </FormattedString>
      </Label>
    </StackLayout>
  </GridLayout>
</template>

// <script lang="js">
//   const {Client} = require('pg')

//   const client = new Client({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "rootUser",
//     database: "postgres"
//   })

//   client.connect();

//   client.query('SELECT * FROM Users', (err, res)=>{
//     if(!err){
//       console.log(res.rows);
//     }
//     else {
//       console.log(err.message);
//     }
//     client.end;
//   })
</script>

<script lang="ts">
  import { Button, Color, TapGestureEventData, TextField } from "@nativescript/core";
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";
  import newPerson from "@/Models/newPerson";

  let users = [new newPerson("Rikkumoist",
      "https://yt3.ggpht.com/OHpZx8wQoQZiu45LMfcSKvDBO6gfR5_1ro_ZbS3xVpcRIu4Zqy_uHoWKpEdxTUD_Spq6zck0=s900-c-k-c0x00ffffff-no-rj",
      "Rick Slingerland", "kotorem.sama@gmail.com", "password1"),
      new newPerson("Rikkumoist2",
      "https://yt3.ggpht.com/OHpZx8wQoQZiu45LMfcSKvDBO6gfR5_1ro_ZbS3xVpcRIu4Zqy_uHoWKpEdxTUD_Spq6zck0=s900-c-k-c0x00ffffff-no-rj",
      "Ricky Slingerplant", "rickyman2002.rick@gmail.com", "password2")];

  @Component({ name: "Login", components: {}})

  export default class Login extends Vue {
    msg: string = "Login";
    goToHome(args: TapGestureEventData) {
      let button: Button = args.object as Button;
      button.borderColor = new Color("red");
      let gebruikersnaam: TextField = (this.$refs.Naam as any).nativeView as TextField;
      let wachtwoord: TextField = (this.$refs.Wachtwoord as any).nativeView as TextField;
      let found = false;
      for (var index in users){
        if ((users[index].username.toLowerCase() == gebruikersnaam.text.toLowerCase() || users[index].email.toLowerCase() == gebruikersnaam.text.toLowerCase()) && users[index].password == wachtwoord.text){
          this.$emit("onLogin");
        }
        else{

          wachtwoord.text = "";
        }
      }
    }

  }
</script>