<template>
  <GridLayout
    rows="3*, *, auto"
    columns="2*, 2*, 4*, 4*, 2*"
    class="comment-container"
  >
    <!-- Profile Pic -->
    <GridLayout row="0" rowSpan="2" col="0">
      <Image :src="this.user.pfp_url" class="comment-profile-pic"></Image>
    </GridLayout>
    <!-- Comment -->
    <GridLayout row="0" col="1" colSpan="3" class="comment-body">
      <Label textWrap="true" class="comment-text" ref="commentText">
        <FormattedString>
          <Span :text="`${comment.username} `" fontWeight="bold"></Span>
          <Span :text="comment.comment"></Span>
        </FormattedString>
      </Label>
    </GridLayout>
    <!-- Heart -->
    <GridLayout
      row="0"
      rowSpan="2"
      col="4"
      @tap="heartComment($event, comment)"
    >
      <Image
        v-show="!liked.includes(comment.id)"
        src="~/Images/heart-empty.png"
        class="comment-heart"
      ></Image>
      <Image
        v-show="liked.includes(comment.id)"
        src="~/Images/heart-full.png"
        class="comment-heart"
      ></Image>
    </GridLayout>
    <!-- Time -->
    <GridLayout row="1" col="1">
      <Label
        :text="toTimePassed(comment.timestamp)"
        class="comment-time-passed"
        textWrap="true"
      ></Label>
    </GridLayout>
    <!-- Likes -->
    <GridLayout row="1" col="2">
      <Label :text="`${comment.likes} likes`" class="comment-likes"> </Label>
    </GridLayout>
    <!-- Reply -->
    <GridLayout row="1" col="3">
      <Label
        text="Beantwoorden"
        class="comment-reply"
        @tap="replyToComment($event, comment)"
      ></Label>
    </GridLayout>
    <!-- Comments -->
    <GridLayout
      row="2"
      col="1"
      colSpan="5"
      rowSpan="2"
      rows="*, auto"
      v-if="isUpperComment() && comment.comments.length > 0"
    >
      <GridLayout row="0" @tap="toggleComments($event, comment.id)">
        <Label
          :text="
            `${comment.comments.length} ${
              comment.comments.length > 1 ? 'antwoorden' : 'antwoord'
            } ${commentIsOpen(comment.id) ? 'verbergen' : 'bekijken'}`
          "
          class="comment-open-comments"
        ></Label>
      </GridLayout>
      <GridLayout row="1" v-show="commentIsOpen(comment.id)">
        <StackLayout>
          <Comment
            v-for="cmt in comment.comments"
            :key="cmt.id"
            :comment="cmt"
            @onReply="replyToComment($event, cmt)"
          />
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </GridLayout>
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";
import {
  FormattedString,
  Label,
  Span,
  TapGestureEventData
} from "@nativescript/core";

import { Screen } from "@nativescript/core/platform";

import User from "@/Models/User";

@Component({
  name: "Comment",
  components: {}
})
export default class Comments extends Vue {
  @Prop() comment!: any;
  user!: User;
  liked: Number[] = [];
  opened: String[] = [];

  fakeUsers: User[] = [
    new User(
      "TeamNissan",
      "https://yt3.ggpht.com/ytc/AKedOLT2c9K3qkeUWye5jQRFXx7Vqja1EVK7RqxbEYXmBQ=s900-c-k-c0x00ffffff-no-rj"
    ),
    new User("Keesje", "https://randomuser.me/api/portraits/thumb/men/75.jpg"),
    new User(
      "Klaas",
      "https://cdn.drawception.com/images/avatars/647493-B9E.png"
    ),
    new User(
      "xXxSniper420xXx",
      "https://i.pinimg.com/474x/df/72/d5/df72d51685e99a265ad186bada408e27.jpg"
    ),
    new User(
      "fkorrie",
      "https://cdn.vox-cdn.com/thumbor/VVXayrypyYIMqiHWIYdL77FRF_o=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22408516/Big_Chungus.png"
    )
  ];

  beforeMount() {
    this.user = this.getUser(this.comment.username);
  }

  mounted() {
    let fs = new FormattedString();
    let userSpan = new Span();
    userSpan.text = `${this.comment.username} `;
    userSpan.fontWeight = "bold";

    fs.spans.push(userSpan);

    let text = this.comment.comment;
    let arr = text.split(" ");

    for (let part of arr) {
      // Mentions
      if (part[0] == "@") {
        // check if user exists
        let mention = part.toString().slice(1);
        console.log(mention);
        // TODO: Improve finding let getuser return null
        if (this.getUser(mention).username != "Anonymous") {
          let boldSpan = new Span();
          boldSpan.text = part + " ";
          boldSpan.fontWeight = "bold";
          fs.spans.push(boldSpan);
          continue;
        }
      }
      let regularSpan = new Span();
      regularSpan.text = part + " ";
      fs.spans.push(regularSpan);
    }
    let commentLabel: Label = (this.$refs.commentText as any)
      .nativeView as Label;
    commentLabel.formattedText = fs;
  }

  replyToComment(args: TapGestureEventData, comment: any) {
    console.log("Emitting: " + comment.username);
    this.$emit("onReply", comment);
  }

  toggleComments($event: TapGestureEventData, comment: String) {
    if (this.opened.includes(comment)) {
      let ind = this.opened.indexOf(comment);
      this.opened.splice(ind, 1);
      return;
    }
    this.opened.push(comment);
  }

  commentIsOpen(comment: String) {
    return this.opened.includes(comment);
  }

  isUpperComment() {
    return this.comment.type == "c1";
  }

  getUser(username: String) {
    let found = this.fakeUsers.find((u: User) => u.username == username);
    if (found == undefined) {
      return new User(
        "Anonymous",
        "https://stickermaster.nl/30784-large_default/anonymous-sticker.jpg"
      );
    }
    return found;
  }

  sh() {
    return Screen.mainScreen.heightDIPs;
  }

  heartComment($event: TapGestureEventData, comment: any) {
    let id = comment.id;
    let found = this.liked.indexOf(id);
    if (found != -1) {
      this.liked.splice(found, 1);
      comment.likes--;
      return;
    }
    this.liked.push(id);
    comment.likes++;
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

// Custom styles
.fas {
  @include colorize($color: accent);
}

.comment-reply {
  color: rgb(156, 156, 156);
  font-style: italic;
}

.comment-open-comments {
  color: rgb(156, 156, 156);
}

.comment-likes {
  color: rgb(156, 156, 156);
}

.comment-time-passed {
  color: rgb(156, 156, 156);
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
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 15em;
}

.comment-profile-pic {
  max-width: 40;
  max-height: 40;
  border-radius: 50;
  object-fit: scale-down;
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
  background-color: rgb(82, 82, 82);
  margin-bottom: 5;
  padding: 10;
}

.post-footer {
  background-color: rgb(61, 60, 60);
  border-bottom-right-radius: 10;
  border-bottom-left-radius: 10;
  label {
    color: white;
  }
  padding: 10;
}
</style>
