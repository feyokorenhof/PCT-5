<template>
<AbsoluteLayout>
  <GridLayout rows="4*, 1*, 8*" height="100%" width="100%">
    <Label ref="Gelukttext" marginTop="30" class="accounttext" text="Gelukt!" fontSize=35em></Label>
    <Label ref="accaantextref" marginTop="30" class="accaantext" text="Account Aanmaken" fontSize=25em></Label>
    <Label marginTop="85" class="verplicht" ref="badlog2" text="De invulvakken met een ster '*' zijn verplicht"></Label>
    <TextField autocapitalizationType="none" class="nom2" height="7%" marginTop="140" ref="Voornaam" hint="Voornaam *"></TextField>
    <TextField autocapitalizationType="none" class="nom2" height="7%" marginTop="230" ref="Achternaam" hint="Achternaam *"></TextField>
    <TextField autocapitalizationType="none" class="nom2" height="7%" marginTop="320" ref="Emailadres" hint="E-mailadres *"></TextField>
    <TextField autocapitalizationType="none" class="nom2" height="7%" marginTop="410" ref="Bedrijfsnaam" hint="Student, sponsor, etc. *"></TextField>
    <Button class="accaanbutton" marginTop="560" text="Account Aanmaken" @tap="onLinkTap"></Button>
  </GridLayout>
  <GridLayout>
  <Label ref="accanngetext1" marginTop="9999999" class="accanngetext" text="U kunt nu door naar het inlogscherm" fontSize=15em></Label>
  </GridLayout>
</AbsoluteLayout>
</template>

<script lang="ts">
  import { Button, Color, EventData, Span, TapGestureEventData, TextField } from "@nativescript/core";
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";
  import "./Loginstyle.css";
  import * as AppSettings from '@nativescript/core/application-settings';
  var clipboard = require("nativescript-clipboard");

  @Component({ name: "AccountAanvragen", components: {}})
  
  export default class AccountAanmaken extends Vue {
    msg: string = "AccountAanvragen";

    accountGelukt(args: TapGestureEventData){
      let aat = (this.$refs.accaantextref as any).nativeView;
      let button: Button = args.object as Button;
      let voornaam: TextField = (this.$refs.Voornaam as any).nativeView as TextField;
      let achternaam: TextField = (this.$refs.Achternaam as any).nativeView as TextField;
      let emailadres: TextField = (this.$refs.Emailadres as any).nativeView as TextField;
      let bedrijfsnaam: TextField = (this.$refs.Bedrijfsnaam as any).nativeView as TextField;
      let blt = (this.$refs.badlog2 as any).nativeView;
      let gelukt = (this.$refs.Gelukttext as any).nativeView;
      let acantx1 = (this.$refs.accanngetext1 as any).nativeView;
      let acantx2 = (this.$refs.accanngetext2 as any).nativeView;
      let acantx3 = (this.$refs.accanngetext3 as any).nativeView;
      let acantx4 = (this.$refs.accanngetext4 as any).nativeView;
      let acantx5 = (this.$refs.accanngetext5 as any).nativeView;
      let acantx6 = (this.$refs.accanngetext6 as any).nativeView;
      let acantx7 = (this.$refs.accanngetext7 as any).nativeView;

      // account aanvragen scherm verdwijnt lol
      button.marginTop = 9999999;
      voornaam.marginTop = 9999999;
      achternaam.marginTop = 9999999;
      emailadres.marginTop = 9999999;
      bedrijfsnaam.marginTop = 9999999;
      blt.marginTop = 9999999;
      aat.marginTop = 9999999;
      button.opacity = 0;
      voornaam.opacity = 0;
      achternaam.opacity = 0;
      emailadres.opacity = 0;
      bedrijfsnaam.opacity = 0;
      blt.opacity = 0;
      aat.opacity = 0;

      // Account aangevraagd scherm verschijnt lol
      gelukt.className = "gelukttext";
      acantx1.marginTop = 100;
      acantx2.marginTop = 125;
      acantx3.marginTop = 150;
      acantx4.marginTop = 175;
      acantx5.marginTop = 200;
      acantx6.marginTop = 225;
      acantx7.marginTop = 250;
    }
    
    onLinkTap(args: TapGestureEventData) {
      
      }
    }
</script>