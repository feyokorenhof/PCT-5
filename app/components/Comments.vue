<template>
  <GridLayout rows="*, 8*, *" height="100%" class="comments-container">
    <ScrollView row="1" height="100%">
      <StackLayout>
        <GridLayout rows="3*, *, 2*" columns="2*, 2*, 4*, 4*, 2*" v-for="comment in post.comments" :key="comment.id" class="comment-container">
          <!-- Profile Pic -->
          <GridLayout row="0" rowSpan="2" col="0">
            <Image src="https://randomuser.me/api/portraits/thumb/men/75.jpg" class="comment-profile-pic"></Image>
          </GridLayout> 
          <!-- Comment -->
          <GridLayout row="0" col="1" colSpan="3" rowSpan="2" class="comment-body">
            <Label textWrap="true" class="comment-text">
              <FormattedString>
                <Span :text="`${comment.username} `" fontWeight="bold"></Span>
                <Span :text="comment.comment"></Span>
              </FormattedString>
            </Label>
          </GridLayout>
          <!-- Heart -->
          <GridLayout row="0" rowSpan="2" col="4" @tap="heartComment($event, comment.id)">
            <Image v-show="!liked.includes(comment.id)" src="~/Images/heart-empty.png" class="comment-heart"></Image>
            <Image v-show="liked.includes(comment.id)" src="~/Images/heart-full.png" class="comment-heart"></Image>
          </GridLayout> 
          <!-- Time -->
          <GridLayout row="1" col="1">
            <Label :text="toTimePassed(comment.timestamp)" class="comment-time-passed" textWrap="true"></Label>
          </GridLayout>
          <!-- Comments -->
          <GridLayout row="2" col="1" colSpan="3" rowSpan="2">
            <ScrollView height="100%">
                <StackLayout>
                    <GridLayout v-for="cmt in comment.comments" :key="cmt.id" width="90%">
                        <Label :text="`'${(cmt.username)} ${cmt.comment}`"></Label>
                    </GridLayout>
                </StackLayout>      
            </ScrollView>
          </GridLayout>
        </GridLayout>
      </StackLayout>      
    </ScrollView>
  </GridLayout>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";
  import { openUrl } from "@nativescript/core/utils";
import { TapGestureEventData } from "@nativescript/core";

import {Screen} from "@nativescript/core/platform";

import Post from "@/Models/Post";

  @Component({
    name: "Comments",
    components: {
  
    }
  })
  export default class Comments extends Vue {
    @Prop() post!: Post;
    liked: Number[] = [];

    sh() {
        return Screen.mainScreen.heightDIPs;
    }

    mounted() {
        console.log(this.post);
    }

    heartComment($event: TapGestureEventData, id: Number) {
      let found = this.liked.indexOf(id);
      if (found != -1) {
        this.liked.splice(found, 1);
        return;
      }
      this.liked.push(id);
    }

    toTimePassed(timestamp: string) {
      let arr = timestamp.split("/");
      let day = parseInt(arr[0]), month = parseInt(arr[1])-1, year = parseInt(arr[2]);
      let hours = parseInt(arr[3]), minutes = parseInt(arr[4]);

      let d1 = new Date(year, month, day, hours, minutes);

      return this.timeSince(d1);
    }

    timeSince(date: Date) {
      let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + "Y";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + "M";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + "D";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + "H";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + "min";
      }
      return Math.floor(seconds) + "sec";
  }



  }
</script>

<style scoped lang="scss">
  @import '@nativescript/theme/scss/variables/blue';

  // Custom styles
  .fas {
    @include colorize($color: accent);
  }

  .comment-time-passed {
    color: white;
    font-style: italic;
  }

  .comment-heart {
    height: 20;
    width: 20;
    vertical-align: middle;
    text-align: center;
  }

  .comment-text {
    color: white;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 15em;
  }

  .comment-profile-pic {
    width: 50;
    height: 50;
    border-radius: 50;
  }

  .comment-body {
    padding: 5;
  }

  .post-container {
    background-color: rgb(250, 249, 249);
    margin-top: 20;
  }

  .comments-container {
    background-color: rgb(61, 60, 60);
  }

  .comment-container {
    background-color: rgb(102, 101, 101);
    margin-bottom: 5;
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

</style>
