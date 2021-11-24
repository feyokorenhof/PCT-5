<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout>
      <ScrollView width="100%" height="100%" marginTop="6%" marginBottom="5%">
        <StackLayout>
          <label text="starter" height="30" backgroundColor="#FFFFFF" />
          <label text="first" height="90" backgroundColor="#43b883" />
          <label text="second" height="90" backgroundColor="#289062" />
         <label text="third" height="90" backgroundColor="#1c6b48" />
         <label text="first" height="90" backgroundColor="#43b883" />
         <label text="second" height="90" backgroundColor="#289062" />
         <label text="third" height="90" backgroundColor="#1c6b48" />
          <label text="first" height="90" backgroundColor="#43b883" />
          <label text="second" height="90" backgroundColor="#289062" />
          <label text="third" height="90" backgroundColor="#1c6b48" />
         <label text="first" height="90" backgroundColor="#43b883" />
         <label text="second" height="90" backgroundColor="#289062" />
          <label text="third" height="90" backgroundColor="#1c6b48" />
          <label text="ender" height="180" backgroundColor="#FFFFFF" />
        </StackLayout>
      </ScrollView>
    <GridLayout rows="2*, 12*, *" height="100%" width="100%">
      <ActionBarTop row="0"/>
      <ActionBarBottom row="2"/>
    </GridLayout>
    </AbsoluteLayout>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";

import ActionBarTop from "./ActionBars/ActionBarTop.vue";
import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";

@Component({
  name: "Chats",
  components: {
    ActionBarTop,
    ActionBarBottom
  }
})

export default class Chats extends Vue {
  msg: string = "Chats";}

</script>

<style lang="scss" scoped>

</style>