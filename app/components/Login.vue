<template>
  <GridLayout rows="4*, 1*, 8*" height="100%">
    <StackLayout row="0" marginTop="50">
      <Label text="Inloggen" textAlignment="center" fontSize="32"></Label>
    </StackLayout>
    <StackLayout row="2">
      <StackLayout marginBottom="10">
        <TextField hint="Naam of e-mailadres"></TextField>
        <TextField hint="Wachtwoord" secure="true"></TextField>
      </StackLayout>
      <Button text="Login" @tap="goToHome"></Button>
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
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";


  @Component({
    name: "Login",
    components: { 

    }
  })
  export default class Login extends Vue {
    msg: string = "Login";

    goToHome() {
      this.$emit("onLogin");
    }
  }
</script>

<style scoped lang="scss">
  @import '@nativescript/theme/scss/variables/blue';

  // Custom styles
  .fas {
    @include colorize($color: accent);
  }

</style>
