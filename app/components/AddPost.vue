<template>
  <AbsoluteLayout>
        <Gridlayout rows="1*, 2*, 1*, 2*" marginTop="10%" height="100%" width="100%">
            <TextField row="0" class="textfield" returnKeyType="next" autocapitalizationType="none" ref="Name" hint="Image"></TextField>
            <TextView row="1" class="textfield" ref="Message" hint="Beschrijving" returnKeyType="done"></TextView>
            <Button row="3" class="toevoegenbutton" text="Toevoegen"></Button>
        </GridLayout>
        <GridLayout rows="2*, 12*, *" height="100%" width="100%">
            <ActionBarTop row="0" />
            <ActionBarBottom row="2" />
      </GridLayout>
    <GridLayout columns="60, 410, 60" rows="50, 720, 60">
        <Image
          src="~/Images/back_btn.png"
          row="0"
          col="0"
          marginTop="10"
          @tap="goBack()"
        ></Image>
    </GridLayout>
  </AbsoluteLayout>  
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import ActionBarTop from "./ActionBars/ActionBarTop.vue";
import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";
import { Component, Prop } from "vue-property-decorator";
import { TapGestureEventData } from "@nativescript/core";

@Component({
  name: "AddPost",
  components: {
    ActionBarTop,
    ActionBarBottom
  }
})

export default class AddPost extends Vue{

  beforeMount(){

  }

  goBack() {
    if (this.$modal) this.$modal.close();
  } 
} 


</script>

<style lang="scss" scoped>


</style>