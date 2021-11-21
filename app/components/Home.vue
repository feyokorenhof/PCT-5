<template>
  <Page actionBarHidden="true">
    <GridLayout rows="2*, 12*, *" height="100%">
      <ActionBarTop row="0" />
      <Login row="1" v-show="!loggedIn" @onLogin="login" />
      <Posts row="1" v-show="loggedIn" />
      <ActionBarBottom row="2" />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";

import ActionBarTop from "./ActionBars/ActionBarTop.vue";
import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";
import Login from "./Login.vue";
import Posts from "./Posts.vue";

@Component({
  name: "Home",
  components: {
    ActionBarTop,
    ActionBarBottom,
    Login,
    Posts
  }
})
export default class Home extends Vue {
  msg: string = "Home";
  loggedIn: boolean = false;
  login() {
    this.loggedIn = true;
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