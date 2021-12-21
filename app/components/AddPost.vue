<template>
  <Page actionBarHidden="true">
    <ScrollView height="95%" width="100%">
      <GridLayout rows="auto, auto, auto, auto, auto, auto" columns="*">
        <StackLayout 
          orientation="vertical" 
          class="post-info"
          height="100%"
          width="100%"
        >
        <TextField
          hint="Type hier de beschrijving in"
          returnKeyType="done" 
          (returnPress)="beschrijvingPost($event)"
          class="post-footer"
          row="1"
        >
        </TextField>
        <TextField
          hint="Plak hier de foto of video"
          returnKeyType="done" 
          (returnPress)="imagePost($event)"
          class="post-footer"
          row="2"
        >
        </TextField>
        </StackLayout>
        <ActionBarTop row="0" />
        <ActionBarBottom row="3" />   
        <Image src="~/Images/back_btn.png" class="back-button" horizontalAlignment="left" verticalAlignment="top" marginLeft="15" tintColor="black" width = "50" height="50" @tap="goToPost"></Image>
      </GridLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";
import { 
    TapGestureEventData, 
    Label, 
    Span 
  }
from "@nativescript/core";
import ActionBarTop from "./ActionBars/ActionBarTop.vue";
import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";
import Post from "@/Models/Post";
import Comments from "@/components/Comments.vue";
import User from "@/Models/User";
import { PostType } from "~/Models/PostType";

@Component({
  name: "AddPost",
  components: {
    Comments, 
    ActionBarTop, 
    ActionBarBottom
  }
})

export default class AddPost extends Vue {
  newPost = Post;

  goToPost(){
    if (this.$modal) this.$modal.close();
  }

  imagePost($event: TapGestureEventData, image: String): String{
    return "abc"
    // do something
  }

  beschrijvingPost($$event: TapGestureEventData, beschrijving: String): String{
    return "abc"
    // do something 
  }

}

</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

.post-info{
  background-color: rgb(239, 239, 239);
}

.post-footer{
  background-color: rgb(255, 255, 255);
  border-width: 5px;
  border-color: black;
  width: 600px;
  height: 400px;
}

.back-button {
  width: 40;
  height: 40;
  vertical-align: middle;
  border-width: 2px;
  border-color: rgb(61, 60, 60);
  border-radius: 5;
}

</style>