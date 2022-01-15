<template>
<GridLayout>
  <GridLayout rows="auto" height="100%">
    <GridLayout row="0" height="100%" class="posts-container">
      <ScrollView height="100%" width="95%" class="posts-listview">
        <StackLayout>
          <!-- Button that executes the goToProfiel() function -->
          <Button class="-outline -rounded-sm" text="Mijn Profiel" fontSize="20" marginTop="70" padding="5" @tap="goToProfiel()"></Button>
          <Button class="-outline -rounded-sm" text="Chats" width="20%" height="5%" fontsize="20" padding="5" @tap="goToChats()"></Button>
          <GridLayout row="0">
            <Label
              :text="[ 'Goedendag ' + this.currentUser.username]"
              fontSize="25"
              horizontalAlignment="center"
            ></Label>
          </GridLayout>
          <GridLayout
            v-for="post in posts"
            :key="post.id"
            rows="*, auto, auto, auto, *"
            class="post-container"
          >
            <!-- Username -->
            <GridLayout columns="8*, *" row="0" class="post-username">
              <Label :text="post.username"></Label>
            <!-- Remove Post Button -->
              <Image  col="2" src="~/Images/remove_btn.png" class="post-remove-button"> </Image>
            </GridLayout>
            <!-- Image -->
            <GridLayout row="1" class="post-body">
              <Image :src="post.image" class="post-image"> </Image>
            </GridLayout>
            <!-- Footer van posts -->
            <GridLayout row="3" class="post-footer">
              <Label :text="[post.username + ': ' + post.footer]" textWrap="true"></Label>
            </GridLayout>
            <!-- Heart -->
            <GridLayout columns="*, 4*" row="2" class="post-heart" width="100%" @tap="likePost($event, post)">
              <Image src="~/Images/heart-empty.png" 
                v-show="!hasLiked(post)" 
                TintColor="black" 
                col="0"
              />
              <Label :text="[post.likes.length + ' likes']" col="1"></Label>
              <Image src="~/Images/heart-full.png" 
                v-show="hasLiked(post)" 
                TintColor="black" 
                col="0"
              />
            </GridLayout>
            <!-- Comments preview (take first/last/most liked / ?) -->
            <StackLayout row="4" class="post-footer">
              <StackLayout
                @tap="openComments($event, post)"
                class="post-comments"
              >
                <Label
                  v-for="comment in post.comments.slice(0, 2)"
                  :key="comment.id"
                  :text="`${comment.username}: ${comment.comment}`"
                ></Label>
                <Label v-show="post.comments.length > 2" text="...."></Label>
              </StackLayout>
            </StackLayout>
          </GridLayout>
          <Label height=70> </Label>
        </StackLayout>
      </ScrollView>
    </GridLayout>
    <GridLayout columns="5*, 4*, 2*" rows="2*, 12*, 1*" height="94%" width="100%">
      <Image
        src="~/Images/add_btn.png"
        class="button-image"
        horizontalAlignment="right"
        marginBottom="50"
        row="2"
        col="2"
        @tap="MakePost()"
      >
      </Image>
      </GridLayout> 
    <GridLayout>
  </GridLayout>
  </GridLayout>
</GridLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";
import { FormattedString, TapGestureEventData, Label, Span } from "@nativescript/core";
import { Screen } from "@nativescript/core/platform";
import Post from "@/Models/Post";
import Chat from "@/Models/Chat";
import Message from "@/Models/Message";
import Comments from "@/components/Comments.vue";
import AddPost from "@/components/AddPost.vue"
import Chats from "@/components/Chats.vue"
import Profiel from "@/components/Profiel.vue"
import User from "@/Models/User";
import {WriteFile, ReadFile, ReadFileSync, FileExist} from "@/Models/FileSystemFunctions";
import UserProfile from "~/Models/UserProfile";
import * as AppSettings from '@nativescript/core/application-settings';

// import { mapActions, mapGetters } from "vuex";

@Component({
  name: "Posts",
  components: {
    Comments,
    AddPost,
    Chats,
    Profiel
  }
})

export default class Posts extends Vue {
  currentUser!: User;
  JSONString: string = "";
  JSONStringFile: string = "";
  posts: Array<any> = [];

  beforeMount() 
  {
    // Hier lees ik de Post.jason voor de posts :) 
    try{
      if (FileExist("Models", "PostJSON.json") == true){
        var FileContent = ReadFileSync("Models", "PostJSON.json");
        var JSONFileContent = JSON.parse(FileContent);
        var post;
        for (post in JSONFileContent){
          this.posts.push(JSONFileContent[post]);
          console.log(this.posts)
        }
        console.log("Test: " + JSONFileContent)
      }
    }
    catch (error)
    { 
      console.log("get rekt")
    }

    // beforemount voor de user: dit is nodig om posts te kunnen liken
    this.currentUser = new User(AppSettings.getString("LoggedinName"), AppSettings.getString("LoggedinPFPUrl"));   
    console.log(this.currentUser.username);
  }

  hasLiked(post: Post) {
    if (post.likes.indexOf(this.currentUser.username) != -1){
      return true;
    }
    return false;
  }

  likePost(args: TapGestureEventData, post: Post) {
    let id = this.currentUser.username;
    // Check of het al geliked is (anders hartje weer weghalen)
    let index = post.likes.indexOf(id);
    if (index != -1) {    
      post.likes.splice(index, 1);
    }
    else {
      post.likes.push(id);
    }
  }

  // Post maken pagina
  MakePost(){
    this.$showModal(AddPost, {
      fullscreen: true,
    });
  }

  // Open your profile page 
  goToProfiel(){
    this.$showModal(Profiel, {
      fullscreen: true,
    });
  }
  
  goToChats(){
    try {
      if (FileExist("Models", "ChatsJSON.json") != true){
        let newMessage = new Message("FirstMessage", 5, null, null, "Welkom bij de team Phidippides app! \n heb je vragen of opmerkingen? \n Neem dan contact op met de beheerder.", AppSettings.getString("LoggedinID"), "ChatBot",)
        let newchat = new Chat("FirstChat", "ChatBot", AppSettings.getString("LoggedinID"), "Team Phidippides", "https://i.ibb.co/vQDQgX3/ic-launcher.png", [newMessage], "Welkom bij de team Phidippides app! \n heb je vragen of opmerkingen? \n Neem dan contact op met de berheerder.", "nu")
        let ChatsArray: Array<any> = ["FirstChat.json"];
        this.JSONString = JSON.stringify(newchat)
        this.JSONStringFile = JSON.stringify(ChatsArray)
        WriteFile(this.JSONString, "Models", "FirstChat.json");
        WriteFile(this.JSONStringFile, "Models", "ChatsJSON.json")
        console.log(this.JSONStringFile)
        console.log(this.JSONString)
        console.log(ReadFileSync("Models", "ChatsJSON.json"))
        console.log("File not found, created new one!")
      }
    } catch (error) {
     console.log("an error has occured") 
    }

    this.$showModal(Chats, {
      fullscreen: true,
    });
  }

  openComments($event: TapGestureEventData, post: Post) {
    console.log(post.type);
    this.$showModal(Comments, {
      fullscreen: true,
      props: {
        post: post
      }
    });
  }
}
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.post-remove-button{
  height: 25;
  width: 25;
}

.posts-container{
  background-color: rgb(239, 239, 239);
}

.post-image{
  background-color: white;
  max-height: 1500px;
  max-width: 1400px
}

.button-image{
  height: 50;
  width: 50;
}

.post-heart {
  background-color: white;
  height: 25;
  width: 25;
  float:left;
}

.posts-listview {
  border-radius: 20;
}

.post-body{
  border-color:rgb(239,239,239);
  border-width: 2px;
  image
  {
    width: auto;
    height: 550px;
  }
}

.add-post{
  bottom: 500px;
  height: 50;
  width: 50;
}

.post-container {
  height: auto;
  width: auto;
  margin-right: 10;
  margin-left: 10;
  border-color: rgb(204, 200, 200);
  margin-top: 20;
  border-radius: 10;
  border-width: 2px;
}

.post-username {
  font-size: 16;
  background-color: rgb(255, 255, 255);
  border-top-right-radius: 10;
  border-top-left-radius: 10;
  border-bottom-width: 2px;
  border-color: rgb(204, 200, 200); 
  border-bottom-color: white; 
  label {
    color: black;
  }
  padding: 10;
}

.logoutbutton{
  display: inline-block;
  color: rgb(255, 255, 255);
  border-radius: 10%;
  background-color: rgb(57, 55, 121);
  font-family: Arial;
  font-size: 10;
  font-weight: bold;
  width: 60;
  height: 20;
  margin-left: -250;
  margin-top: -500;
  box-shadow: 6px 6px 6px rgba(0,0,0,155);
}

.post-footer {
  font-size: 14;
  background-color: rgb(255, 255, 255);
  padding: 10;
  label {
    color: black;
  }
  padding: 10;
}

.post-comments {
  font-size: 14;
  background-color: rgb(255, 255, 255);
  padding: 10;
}
</style>
