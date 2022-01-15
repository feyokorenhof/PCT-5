<template>
  <AbsoluteLayout>
        <Gridlayout rows="1*, 2*, 1*, 2*" marginTop="10%" height="100%" width="100%">
            <TextField row="0" class="textfield" returnKeyType="next" autocapitalizationType="none" ref="Image" hint="Plak hier uw foto" @returnPress="imagePost($event)"></TextField>
            <TextView row="1" class="textfield" maxLength=150 ref="Beschrijving" hint="Type hier uw beschrijving" returnKeyType="done" @returnPress="beschrijvingPost($event)"></TextView>
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
import Post from "@/Models/Post";
import { Component } from "vue-property-decorator";
import { TextField, TapGestureEventData  } from "@nativescript/core";
import {WriteFile, ReadFile, ReadFileSync, FileExist} from "@/Models/FileSystemFunctions";
import * as AppSettings from '@nativescript/core/application-settings';

@Component({
  name: "AddPost",
  components: {
    ActionBarTop,
    ActionBarBottom
  }
})

export default class AddPost extends Vue{
  newPost = new Post("-",1,"","","",[]);

  beforeMount(){
    var FileContent = ReadFileSync("Models", "PostJSON.json");
    var posts: Post[] =  JSON.parse(FileContent);
    let JSONFileContent = JSON.parse(FileContent);
    console.log(posts.length)
  }

  imagePost(args: TapGestureEventData){
    this.newPost.type = 2;
    let image: TextField = (this.$refs.Image as any).nativeView as TextField;
    this.newPost.image = image;
    this.newPost.id = this.idNewPost();
    // do something
  }

  beschrijvingPost(args: TapGestureEventData){
  let beschrijving: TextField = (this.$refs.Beschrijving as any).nativeView as TextField;
  this.newPost.footer = "" + beschrijving;
  console.log(beschrijving)
  }

  writeJSON(){

  }

  idNewPost(): String{
    // var FileContent = ReadFileSync("Models", "PostsJSON.json");
    // var posts: Post[];
    // posts =  JSON.parse(FileContent);
    // let JSONFileContent = JSON.parse(FileContent);
    // console.log(posts.length)
    return "1"
  }

  goBack() {
    this.writeJSON()
    if (this.$modal) this.$modal.close();
  } 
} 


</script>

<style lang="scss" scoped>


</style>