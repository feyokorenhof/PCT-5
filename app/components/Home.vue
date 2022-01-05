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

if (!AppSettings.hasKey("Loggedin")){
  AppSettings.setBoolean("Loggedin", false);
}

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
.fas {
  @include colorize($color: accent);
}
</style>