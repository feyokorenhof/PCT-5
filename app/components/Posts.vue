<template>
  <GridLayout>
    <Button class="logoutbutton" text="Uitloggen" @tap="logOutFunction"></Button>
  <GridLayout rows="auto" height="100%">
    <GridLayout row="0" height="100%" class="posts-container">
      <ScrollView height="100%" width="95%" class="posts-listview">
        <StackLayout>
          <!-- Button that executes the goToProfiel() function -->
          
          <Button class="-outline -rounded-sm" text="Mijn Profiel" fontSize="20" padding="5" @tap="goToProfiel()"></Button>
          <Button class="-outline -rounded-sm" text="Chats" width="20%" height="5%" fontsize="20" padding="5" @tap="goToChats"></Button>
          <GridLayout row="0">
            <Label
              text="Goedendag" 
              fontSize="25"
              horizontalAlignment="center"
            ></Label>
          </GridLayout>
          <GridLayout
            v-for="post in posts"
            :key="post.id"
            rows="*, auto, auto, *"
            class="post-container"
          >
            <!-- Username / Header / ? -->
            <GridLayout row="0" class="post-username">
              <Label :text="post.username"></Label>
            <!-- <Button
              src="~/Images/add_btn.png"
              class="add-post"
              @tap="MakePost"
              horizontalAlignment="right"
            >
            </Button> -->
            <!-- Header -->
            <GridLayout row="0" class="post-header">
              <Label :text="post.header" textWrap="true"></Label>
            </GridLayout>
            </GridLayout>
            <!-- Image / Tekst -->
            <GridLayout row="1" class="post-body">
              <Image :src=resizeInput(post)> </Image>
            </GridLayout>
            <!-- Text -->
            <GridLayout row="3" class="post-footer">
              <Label :text="post.footer" textWrap="true"></Label>
            </GridLayout>
            <!-- Heart -->
              <!--<GridLayout 
                row="2"
                class="post-heart"
              >
                <Label :text="[post.likes + ' likes']"></Label>
                <Button 
                  class="button-heart"
                  horizontalAlignment="left"
                  src="~/Images/heart-empty.png"    
                  @tap="heartPost"
                ></Button>
                   src="~/Images/heart-empty.png"
                  @tap="heartPost($event, post)" 
                 v-show="likes.includes(post.id)"
                 <Image
                  src="~/Images/heart-empty.png"
                  class="post-heart"
                ></Image>
              </GridLayout> -->
            <!-- Comments preview (take first/last/most liked / ?) -->
            <StackLayout row="3" class="post-footer">
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
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </GridLayout>
</GridLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";
import { TapGestureEventData, Label } from "@nativescript/core";

import Post from "@/Models/Post";
import Comments from "@/components/Comments.vue";
import AddPost from "@/components/AddPost.vue"
import Profiel from "@/components/Profiel.vue"
import Chats from "@/components/Chats.vue"

import User from "@/Models/User";
import { PostType } from "~/Models/PostType";

// import { mapActions, mapGetters } from "vuex";

@Component({
  name: "Posts",
  components: {
    Comments,
    AddPost,
    Profiel
  }
})
export default class Posts extends Vue {
  posts2!: Post[];
  liked!: Number[];

  heartContent!: (id: String) => void;

  MakePost(){
    this.$showModal(AddPost, {
      fullscreen: true,
    });
  }

  heartPost($event: TapGestureEventData, post: Post) {
    // let id = post.id;
    // let found = post.likes.indexOf(id);
    // if (found != -1) {
    //   post.likes.splice(found, 1);
    //   post.likes--;
    //   return;
    // }
    // post.likes.push(id);
    // post.likes++;
  }

  posts = [
    {
      id: "0",
      type: 2,
      mentions: [],
      header: "Formule E: met de E van Energietransitie",
      image: "https://rotterdamsedromers.nl/wp-content/uploads/2020/10/WhatsApp-Image-2020-10-20-at-15.52.01-1536x778.jpeg",
      footer:
        "De toekomst is groen en de toekomst is elektrisch. De kaarten van de duurzame economie worden op dit moment geschud en een sterk imago met aansluitende strategie gaat helpen om de beste kaarten naar je regio toe te trekken. ",
      timestamp: "11/10/2021/2/44",
      likes: 25,
      username: "TeamPhidippides",
      comments: [
        {
          id: "0-0",
          type: "c1",
          mentions: [],
          username: "TeamPhidippides",
          comment: "Wat vinden jullie er van 👀",
          likes: 580,
          timestamp: "11/10/2021/2/44",
          comments: [
            {
              id: "0-0-0",
              type: "c2",
              mentions: [],
              username: "Klaas",
              comment: "Gaaf!",
              likes: 16,
              timestamp: "11/10/2021/2/44"
            }
          ]
        },
        {
          id: "0-1",
          type: "c1",
          mentions: [],
          username: "Keesje",
          comment: "In mijn tijd reden ze nog gewoon op brandstof....",
          likes: 0,
          timestamp: "11/10/2021/2/44",
          comments: [
            {
              id: "0-1-0",
              type: "c2",
              mentions: ["Keesje"],
              username: "Klaas",
              comment: "Okay leuk @Keesje ?",
              likes: 5,
              timestamp: "12/10/2021/22/44"
            },
            {
              id: "0-1-1",
              type: "c2",
              mentions: ["Klaas"],
              username: "Keesje",
              comment: "Kom dan @Klaas",
              likes: 30,
              timestamp: "12/10/2021/22/46"
            },
            {
              id: "0-1-2",
              type: "c2",
              mentions: ["Keesje"],
              username: "Klaas",
              comment: "Waar dan @Keesje",
              likes: 30,
              timestamp: "12/10/2021/22/47"
            }
          ]
        },
        {
          id: "0-2",
          type: "c1",
          mentions: [],
          username: "Klaas",
          comment: "Vrrrrrrrooom",
          likes: 112,
          timestamp: "11/10/2021/22/58",
          comments: []
        },
        {
          id: "0-3",
          type: "c1",
          mentions: [],
          username: "Klaas",
          comment: "Lorem ipsum dorem et amit",
          likes: 0,
          timestamp: "11/10/2021/22/58",
          comments: []
        }
      ]
    },
    {
      id: "1",
      type: 2,
      mentions: [],
      header: "Team Phidippides 2020",
      image: "https://www.rdmcoe.nl/wp-content/uploads/2020/03/Triga-web-1536x864.jpg",
      footer:
        "We love to see it happen <3 #TeamPhiddipes #Dreams",
      timestamp: "11/10/2021/2/44",
      likes: 120,
      username: "TeamPhidippides",
      comments: [
        {
          id: "1-0",
          type: "c1",
          mentions: [],
          username: "TeamPhidippides",
          comment: "Wat vinden jullie er van 👀",
          likes: 580,
          timestamp: "17/11/2021/1/01",
          comments: [
            {
              id: "1-0-0",
              type: "c2",
              mentions: [],
              username: "Sofia",
              comment: "I love it :D!",
              likes: 16,
              timestamp: "17/11/2021/1/01"
            }
          ]
        }, 
          {
           id: "1-1",
           type: "c1",
           mentions: [],
           username: "Tim",
           comment: "Wat cool, ik duim voor jullie vandaag!",
           likes: 165,
           timestap: "17/11/2021/1/45",
           comments: [
            {
              id: "1-1-1",
              type: "c2",
              mentions: [],
              username: "Roos",
              comment: "Wij ook hoor!",
              likes: 25,
              timestamp: "17/11/2021/1/50"     
            }        
           ]
          },
        {
          id: "1-2",
            type: "c1",
            mentions: [],
            username: "Kimberley",
            comment: "VEEL SUCCES !!!",
            likes: 2,
            timestamp: "18/11/2021/1/53"
        }
      ]
    }
  ];

  openComments($event: TapGestureEventData, post: Post) {
    console.log(post.type);
    this.$showModal(Comments, {
      fullscreen: true,
      props: {
        post: post
      }
    });
  }

  resizeInput(input: Post): any{
    if (input.type == 1){
      console.log("ImageText!");
      return input.image;
    }
    else if (input.type == 2){
      console.log("Image!");
      let width = input.image.clientWidth;
      let height = input.image.clientHeight;
      console.log(width);
      console.log("PiXeLs")
      console.log(height);
      return input.image;
    }
    else if (input.type == 3){
      console.log("Text!");
      return input.image;
    }
    else{
      console.log("Fail!")
    }
  }

  goToHome() {
    console.log("Going to home");
  }

  // Open your profile page 
  goToProfiel(){
    this.$showModal(Profiel, {
      fullscreen: true,
    });
  }
  goToChats(){
    this.$showModal(Chats, {
      fullscreen: true,
    });
  }
  
  logOutFunction(){
    this.$emit("onLogin");
  }
  
}
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

// Custom styles

.logoutbutton{
  display: inline-block;
  color: rgb(255, 255, 255);
  border-radius: 10%;
  background-color: rgb(57, 55, 121);
  font-family: Arial;
  font-size: 10%;
  font-weight: bold;
  width: 15%;
  height: 5%;
  margin-top: 0;
  box-shadow: 6px 6px 6px rgba(0,0,0,155);
}

.fas {
  @include colorize($color: accent);
}


.posts-container{
  background-color: rgb(239, 239, 239);
}

.button-heart{
  
}

.post-heart {
  label
  {
    font-size:12;
    color: rgb(0, 0, 0);
    text-align:right;
    margin-right: 100px;
  }
}

.posts-listview {
  // background-color: black;
  border-radius: 20;
}

.post-body{
  // width: 900px;
  image
  {
    width: auto;
    height: 500px;
  }
}

.add-post{
  // position: absolute;
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
  font-size: 18;
  background-color: rgb(255, 255, 255);
  border-top-right-radius: 10;
  border-top-left-radius: 10;
  border-bottom-width: 2px;
  border-color: rgb(204, 200, 200);  
  label {
    color: black;
  }
  padding: 10;
}

.post-header{
  font-size: 14;
  text-align: left;
  background-color: rgb(255, 255, 255);
  label{
    color: black;
  }
}

.post-footer {
  font-size: 16;
  background-color: rgb(255, 255, 255);
  border-bottom-right-radius: 10;
  border-bottom-left-radius: 10;
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
