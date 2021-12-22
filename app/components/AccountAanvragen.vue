<template>
  <GridLayout rows="4*, 1*, 8*" height="100%">
    <Label marginTop="30" class="accaantext" text="Account Aanvragen" fontSize=25em></Label>
    <Label marginTop="85" class="verplicht" ref="badlog" text="De invulvakken met een ster '*' zijn verplicht"></Label>
    <TextField class="nom" height="7%" marginTop="140" ref="Voornaam" hint="Voornaam *"></TextField>
    <TextField class="nom" height="7%" marginTop="230" ref="Achternaam" hint="Achternaam *"></TextField>
    <TextField class="nom" height="7%" marginTop="320" ref="Emailadres" hint="E-mailadres *"></TextField>
    <TextField class="nom" height="7%" marginTop="410" ref="Bedrijfsnaam" hint="Bedrijfsnaam"></TextField>
    <Button class="accaanbutton" marginTop="560" text="Account Aanvragen" @tap="onLinkTap"></Button>
  </GridLayout>
</template>

<script lang="ts">
  import { Button, Color, EventData, Span, TapGestureEventData, TextField } from "@nativescript/core";
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";
  import newPerson from "@/Models/newPerson";
  import "./Loginstyle.css";

  let users = [new newPerson("user1",
      "https://yt3.ggpht.com/OHpZx8wQoQZiu45LMfcSKvDBO6gfR5_1ro_ZbS3xVpcRIu4Zqy_uHoWKpEdxTUD_Spq6zck0=s900-c-k-c0x00ffffff-no-rj",
      "Rick Slingerland", "kotorem.sama@gmail.com", "password1"),
      new newPerson("user2",
      "https://yt3.ggpht.com/OHpZx8wQoQZiu45LMfcSKvDBO6gfR5_1ro_ZbS3xVpcRIu4Zqy_uHoWKpEdxTUD_Spq6zck0=s900-c-k-c0x00ffffff-no-rj",
      "Ricky Slingerplant", "rickyman2002.rick@gmail.com", "password2")];

  

  @Component({ name: "AccountAanvragen", components: {}})
  
  export default class AccountAanvragen extends Vue {
    msg: string = "AccountAanvragen";
    
    onLinkTap(args: TapGestureEventData) {
      let button: Button = args.object as Button;
      let voornaam: TextField = (this.$refs.Voornaam as any).nativeView as TextField;
      let achternaam: TextField = (this.$refs.Achternaam as any).nativeView as TextField;
      let emailadres: TextField = (this.$refs.Emailadres as any).nativeView as TextField;
      let bedrijfsnaam: TextField = (this.$refs.Bedrijfsnaam as any).nativeView as TextField;
      
      if (voornaam.text != ""){
        voornaam.className = "nom"
      }
      if (achternaam.text != ""){
        achternaam.className = "nom"
      }
      if (emailadres.text != ""){
        emailadres.className = "nom"
      }

      if (voornaam.text == ""){
        voornaam.className = "WrongG"
        let blt = (this.$refs.badlog as any).nativeView;
        blt.className = "badlogin2";
      }
      if (achternaam.text == ""){
        achternaam.className = "WrongG"
        let blt = (this.$refs.badlog as any).nativeView;
        blt.className = "badlogin2";
      }
      if (emailadres.text == ""){
        emailadres.className = "WrongG"
        let blt = (this.$refs.badlog as any).nativeView;
        blt.className = "badlogin2";
      }
      if (voornaam.text != "" && achternaam.text != "" && emailadres.text != ""){
        this.$emit("accountAangevraagd");
      }
    }
  }
</script>