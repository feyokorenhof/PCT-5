<template>
  <StackLayout row="0" class="top-container">    
    <GridLayout class="blue-top">
      <Image src="https://yt3.ggpht.com/OHpZx8wQoQZiu45LMfcSKvDBO6gfR5_1ro_ZbS3xVpcRIu4Zqy_uHoWKpEdxTUD_Spq6zck0=s900-c-k-c0x00ffffff-no-rj" width = "40" height="40" horizontalAlignment="right" class="profile-pic"></Image>
    </GridLayout>
    <GridLayout class="red-top"></GridLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";

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
@import "@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.blue-top {
  background-image: linear-gradient(to right, #2c3153, #555fa4);
  height: 50%;
}

.red-top {
  background-color: #a04f5f;
  clip-path: polygon(0 0, 0 60%, 100% 0);
  height: 25%;
}

.blue-bottom {
  background-image: linear-gradient(to right, #2c3153, #555fa4);
  height: 50%;
}

.red-bottom {
  background-color: #a04f5f;
  clip-path: polygon(0 100%, 100% 100%, 100% 40%);
  height: 50%;
}
.profile-pic {
    border-radius: 100;
    border-width: 0;
    border-color: #555fa4;
    object-fit: scale-down; 
  }

</style>
