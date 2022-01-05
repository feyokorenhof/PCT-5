<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout>
    <GridLayout rows="2*, 12*, *" height="100%" width=100%>
      
      <Login row="1" v-show="!loggedIn&&!accountaanvragen" @onLogin="login" @accountAangevraagd="acaangevraagd"/>
      
      <AccountAanvragen row="1" v-show="accountaanvragen" @accountAangevraagd="acaangevraagd"/>
      
    </GridLayout>
    <GridLayout height="100%" width=100%>
      <Posts v-show="loggedIn&&!accountaanvragen" />
    </GridLayout>
    <GridLayout rows="2*, 12*, *" height="100%" width=100%>
      <ActionBarTop row="0" />
      <ActionBarBottom row="2" />
    </GridLayout>
    </AbsoluteLayout>
  </Page>
</template>

<script lang="ts">  
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";

import ActionBarTop from "./ActionBars/ActionBarTop.vue";
import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";
import Login from "./Login.vue";
import Posts from "./Posts.vue";
import AccountAanvragen from "./AccountAanvragen.vue";

@Component({
  name: "Home",
  components: {
    ActionBarTop,
    ActionBarBottom,
    Login,
    Posts,
    AccountAanvragen
  }
})
export default class Home extends Vue {
  msg: string = "Home";
  loggedIn: boolean = false;
  accountaanvragen: boolean = false;
  login() {
    this.loggedIn = true;
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