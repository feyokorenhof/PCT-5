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
      <Button class="-outline -rounded-sm" text="Login" padding="5" @tap="goToHome"></Button>
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

<script lang="ts">
  import { Button, TapGestureEventData, TextField } from "@nativescript/core";
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";


  @Component({
    name: "Login",
    components: { 

    }
  })
  export default class Login extends Vue {
    msg: string = "Login";
    goToHome(args: TapGestureEventData) {
      let button: Button = args.object as Button;
      const username: TextField = (this.$refs.Naam as any).nativeView as TextField;
      const wachtwoord: TextField = (this.$refs.Wachtwoord as any).nativeView as TextField;
      
    }
  }
</script>