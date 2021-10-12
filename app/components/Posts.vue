<template>
  <GridLayout rows="auto" height="100%">
    <GridLayout row="0" height="100%" class="posts-container">
      <ScrollView height="100%" width="95%" class="posts-listview">
        <StackLayout>
        <GridLayout row="0">
          <Label text="Posts" fontSize="20" horizontalAlignment="center"></Label>
        </GridLayout>
          <GridLayout v-for="post in posts" :key="post.id" rows="*, auto, auto, *" class="post-container">
            <!-- Username / Header / ? -->
            <GridLayout row="0" class="post-header">
              <Label :text="post.header"></Label>
            </GridLayout>
            <!-- Image / Tekst -->
            <GridLayout row="1" class="post-body">
              <Image :src="post.image">
              </Image>
            </GridLayout>
            <!-- Text -->
            <GridLayout row="2" class="post-footer">
              <Label :text="post.footer" textWrap="true"></Label>
            </GridLayout>
            <!-- Comments preview (take first/last/most liked / ?) -->
            <StackLayout row="2" class="post-footer">
              <StackLayout @tap="openComments($event, post)" class="post-comments">
                <Label v-for="comment in post.comments.slice(0, 2)" :key="comment.id" :text="`${comment.username}: ${comment.comment}`"></Label>
                <Label v-show="post.comments.length > 2" text="...."></Label>
              </StackLayout>
            </StackLayout>
          </GridLayout>
        </StackLayout>
      </ScrollView>
    </GridLayout>        
  </GridLayout>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";
import { TapGestureEventData } from "@nativescript/core";

import Post from "@/Models/Post";
import Comments from "@/components/Comments.vue";


  @Component({
    name: "Posts",
    components: {
      Comments
    }
  })
  export default class Posts extends Vue {
    msg: string = "Posts";
    posts = [
      {
        id: 0,
        header: "Formula E-racewagen van Nissan",
        image: "https://arriyadiyah.com/media/thumb/c5/0a/800_94a0700f09.jpg",
        footer: "Formula E-racewagen van Nissan krijgt nieuwe look met kimonothema",
        timestamp: "11/10/2021/2/44",
        comments: [
          {
            id: 0,
            username: "Keesje",
            comment: "This is a very long comment about the post with the formula e car blablabla very coool lorem impum dorem et amit blabla",
            likes: 0,
            timestamp: "11/10/2021/2/44",
            comments: {
            
            }
          },
          {
            id: 1,
            username: "Lorem",
            comment: "Splendid!",
            likes: 0,
            timestamp: "11/10/2021/2/44",
            comments: {
            
            }
          },
          {
            id: 2,
            username: "Ipsum",
            comment: "sfsdsfd!",
            likes: 0,
            timestamp: "11/10/2021/2/44",
            comments: {
            
            }
          }
        ]
      }, 
      {
        id: 1,
        header: "Formula E-racewagen van Nissan",
        image: "https://fhi.nl/app/uploads/news/31fbfb9ec5bd6265d691110221236f8d-8d709747013f6b6a688298b145516898e4722b4e-form_e1.jpg",
        footer: "Formula E-racewagen van Nissan krijgt nieuwe look met kimonothema",
        timestamp: "11/10/2021/2/44",
        comments: [
          {
            id: 3,
            username: "Keesje",
            comment: "Sick!",
            likes: 0,
            timestamp: "11/10/2021/2/44",
            comments: {
            
            }
          },
          {
            id: 4,
            username: "Lorem",
            comment: "Splendid!",
            likes: 0,
            timestamp: "11/10/2021/2/44",
            comments: {
            
            }
          },
          {
            id: 5,
            username: "Ipsum",
            comment: "sfsdsfd!",
            likes: 0,
            timestamp: "11/10/2021/2/44",
            comments: {
            
            }
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
      })
    }

    goToHome() {
      console.log("Going to home");
    }

  }
</script>

<style scoped lang="scss">
  @import '@nativescript/theme/scss/variables/blue';

  // Custom styles
  .fas {
    @include colorize($color: accent);
  }


  .posts-listview {
  }

  .post-container {
    background-color: rgb(250, 249, 249);
    margin-top: 20;
  }

  .post-header {
    background-color: rgb(61, 60, 60);
    border-top-right-radius: 10;
    border-top-left-radius: 10;
    Label {
      color: white;
    }
    padding: 10;
  }

  .post-footer {
    background-color: rgb(61, 60, 60);
    border-bottom-right-radius: 10;
    border-bottom-left-radius: 10;
    Label {
      color: white;
    }
    padding: 10;
  }

  .post-comments {
    background-color: rgb(102, 101, 101);
    padding: 10;
    border-bottom-right-radius: 10;
    border-bottom-left-radius: 10;
  }

</style>
