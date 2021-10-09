<template>
    <StackLayout row="0" class="top-container">
        <GridLayout class="blue-top"></GridLayout>
        <GridLayout class="red-top"></GridLayout>
    </StackLayout>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";
  import { openUrl } from "@nativescript/core/utils";

openUrl('your website url here');

  @Component
  export default class ActionBarTop extends Vue {
    msg: string = "ActionBarTop";

    openLink() {
      console.log("HI");
      //openUrl("www.google.com");
    }
  }
</script>

<style scoped lang="scss">
  @import '@nativescript/theme/scss/variables/blue';

  // Custom styles
  .fas {
    @include colorize($color: accent);
  }

  .blue-top {
    background-image: linear-gradient(to right,#2C3153, #555FA4);
    height: 50%;
  }

  .red-top {
    background-color: #A04F5F;
    clip-path: polygon(0 0, 0 60%, 100% 0);
    height: 25%;
  }

  .blue-bottom {
    background-image: linear-gradient(to right,#2C3153, #555FA4);
    height: 50%;
  }

  .red-bottom {
    background-color: #A04F5F;
    clip-path: polygon(0 100%, 100% 100%, 100% 40%);
    height: 50%;
  }

</style>
