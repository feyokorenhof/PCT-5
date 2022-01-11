<template>
  <GridLayout
    row="0"
    rows="2*, 10*, *"
    height="100%"
    class="comments-container"
    top="0"
    left="0"
  >
    <!-- Back button and info -->
    <GridLayout
      row="0"
      columns="*, 8*, *"
      class="comments-top-panel"
      marginTop="10"
      padding="10"
    >
      <GridLayout col="0" class="comments-back-button-container" @tap="goBack">
        <Image src="~/Images/back_btn.png" class="comments-back-button"></Image>
      </GridLayout>
      <GridLayout col="1" class="comments-info-container">
        <Label text="Opmerkingen" class="comments-info"></Label>
      </GridLayout>
    </GridLayout>
    <ScrollView row="1" height="100%">
      <StackLayout>
        <Comment
          v-for="comment in post.comments"
          :key="comment.id"
          :comment="comment"
          @onReply="setReplyTarget"
        />
      </StackLayout>
    </ScrollView>
    <GridLayout
      row="2"
      rows="*, auto"
      class="reply-container"
      height="10%"
      top="100%"
      ref="replyView"
    >
      <!-- Reply Input -->
      <GridLayout row="1" columns="*, 6*, 2*">
        <!-- Image of the logged-in user -->
        <GridLayout col="0">
          <Image
            :src="this.currentUser.pfp_url"
            class="reply-user-image"
          ></Image>
        </GridLayout>
        <!-- Text Input -->
        <GridLayout col="1" class="reply-textfield-container">
          <TextField
            v-model="replyText"
            hint="Een opmerking toevoegen..."
            class="reply-textfield"
          />
        </GridLayout>
        <!-- Reply Button -->
        <GridLayout col="2">
          <Label
            text="Plaatsen" marginTop="8"
            @tap="sendReply"
            class="reply-send-button"
            :isEnabled="canReply"
          ></Label>
        </GridLayout>
      </GridLayout>
    </GridLayout>
  </GridLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";
import { GridLayout, TapGestureEventData } from "@nativescript/core";

import { Screen } from "@nativescript/core/platform";

import Post from "@/Models/Post";
import Comment from "@/components/Comment.vue";

import User from "@/Models/User";
import * as AppSettings from '@nativescript/core/application-settings';

@Component({
  name: "Comments",
  components: { Comment }
})
export default class Comments extends Vue {
  @Prop() post!: Post;
  liked: Number[] = [];
  opened: String[] = [];

  keyboardOpen: Boolean = false;

  currentUser!: User;

  replyText: String = "";

  replyTarget: any = null;

  get canReply() {
    let test1 = this.replyText.length > 0 && this.replyText != " ";
    let trimmed = this.replyText.trim();
    let test2 = trimmed != " " && trimmed != "";
    return test1 && test2;
  }

  beforeMount() {
    this.currentUser = new User(AppSettings.getString("LoggedinName"), AppSettings.getString("LoggedinPFPUrl")); 
  }

  sh() {
    return Screen.mainScreen.heightDIPs;
  }

  mounted() {}

  goBack() {
    if (this.$modal) this.$modal.close();
  }

  setReplyTarget(target: any) {
    this.replyTarget = target;
    console.log(this.replyTarget.type);
    if (this.replyText.includes("@")) this.replyText = "";
    this.replyText += ` @${target.username} `;
  }

  sendReply(event: TapGestureEventData) {
    if (this.replyTarget != null) {
      console.log(this.replyTarget);
      // Reply to a c1:
      if (this.replyTarget.type == "c1") {
        let id_prefix = this.replyTarget.id;
        let new_id = `${id_prefix}-${this.replyTarget.comments.length}`;
        console.log(new_id);
        this.replyTarget.comments.push({
          id: new_id,
          type: "c2",
          mentions: [this.replyTarget.username],
          username: this.currentUser.username,
          comment: this.replyText,
          likes: 0,
          timestamp: this.getTimeStamp()
        });
      }
      // Reply to a c2:
      else if (this.replyTarget == "c2") {
        // TODO: add it to the parent c1 posts comments
      }
    } else {
      // Comment to post
      let id_prefix = this.post.id;
      let new_id = `${id_prefix}-${this.post.comments.length}`;
      this.post.comments.push({
        id: new_id,
        type: "c1",
        mentions: [],
        username: this.currentUser.username,
        comment: this.replyText,
        likes: 0,
        timestamp: this.getTimeStamp(),
        comments: []
      });
    }

    this.replyText = "";
    this.replyTarget = null;
  }

  getTimeStamp() {
    // TODO: don't trust the client for this..
    //"11/10/2021/2/44"
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let timestamp = `${day}/${month}/${year}/${hours}/${minutes}`;
    console.log(timestamp);
    return timestamp;
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
    let day = parseInt(arr[0]),
      month = parseInt(arr[1]) - 1,
      year = parseInt(arr[2]);
    let hours = parseInt(arr[3]),
      minutes = parseInt(arr[4]);

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
@import "@nativescript/theme/scss/variables/blue";

.reply-textfield-container {
}

.reply-textfield {
  color: black;
  font-size: 16;
  placeholder-color: white;
  background-color: rgb(255, 255, 255);
  border-radius: 10;
  padding: 10;
  border-bottom-width: 1;
  border-bottom-color: transparent;
}

// Custom styles
.fas {
  @include colorize($color: accent);
}

.reply-user-image {
  max-width: 40;
  max-height: 40;
  border-radius: 50;
  object-fit: scale-down;
  align-content: center;
  text-align: center;
  vertical-align: middle;
}

.reply-send-button {
  color: rgb(1, 132, 255);
  font-size: 18;
  align-content: center;
  text-align: center;
  vertical-align: middle;
}

.reply-container {
  background-color: rgb(36, 36, 36);
  padding: 2;
  align-content: center;
  vertical-align: middle;
  // rgb(102, 101, 101);
}

.comments-info-container {
  text-align: center;
  align-content: center;
  justify-content: center;
  padding-top: 5;
}

.comments-info {
  color: white;
  font-size: 25;
  vertical-align: middle;
}

.comments-back-button-container {
  padding-left: 5;
  padding-top: 10;
}

.comments-back-button {
  width: 50;
  height: 50;
  vertical-align: middle;
}

.comment-open-comments {
  color: black;
}

.comment-likes {
  color: black;
}

.comment-time-passed {
  color: black;
  font-style: italic;
}

.comment-heart {
  height: 20;
  width: 20;
  vertical-align: middle;
  text-align: center;
}

.comment-text {
  color: black;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
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
  background-color: rgb(255, 255, 255);
  margin-top: 20;
}

// .comments-container {
//   background-color: rgb(255, 255, 255);
// }

.comments-container {
  background-color: rgb(102, 101, 101);
  background-color: rgb(61, 60, 60);
  margin-bottom: 5;
  padding: 10;
}

.post-footer {
  background-color: rgb(255, 255, 255);
  border-bottom-right-radius: 10;
  border-bottom-left-radius: 10;
  label {
    color: black;
  }
  padding: 10;
}
</style>
