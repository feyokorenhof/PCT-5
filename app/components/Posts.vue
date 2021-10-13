<template>
  <GridLayout rows="auto" height="100%">
    <GridLayout row="0" height="100%" class="posts-container">
      <ScrollView height="100%" width="95%" class="posts-listview">
        <StackLayout>
          <GridLayout row="0">
            <Label
              text="Posts"
              fontSize="20"
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
            <GridLayout row="0" class="post-header">
              <Label :text="post.header"></Label>
            </GridLayout>
            <!-- Image / Tekst -->
            <GridLayout row="1" class="post-body">
              <Image :src="post.image"> </Image>
            </GridLayout>
            <!-- Text -->
            <GridLayout row="2" class="post-footer">
              <Label :text="post.footer" textWrap="true"></Label>
            </GridLayout>
            <!-- Comments preview (take first/last/most liked / ?) -->
            <StackLayout row="2" class="post-footer">
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
</template>

<script lang="ts">
import Vue from "nativescript-vue";
import { Component, Prop } from "vue-property-decorator";
import { TapGestureEventData } from "@nativescript/core";

import Post from "@/Models/Post";
import Comments from "@/components/Comments.vue";

import User from "@/Models/User";

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
      id: "0",
      type: "p",
      mentions: [],
      header: "Formule E: met de E van Energietransitie",
      image: "https://rotterdamsedromers.nl/wp-content/uploads/2020/10/WhatsApp-Image-2020-10-20-at-15.52.01-1536x778.jpeg",
      footer:
        "De toekomst is groen en de toekomst is elektrisch. De kaarten van de duurzame economie worden op dit moment geschud en een sterk imago met aansluitende strategie gaat helpen om de beste kaarten naar je regio toe te trekken. ",
      timestamp: "11/10/2021/2/44",
      likes: 0,
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

  goToHome() {
    console.log("Going to home");
  }
}
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.posts-listview {
}

.post-container {
  background-color: transparent;
  margin-top: 20;
}

.post-header {
  background-color: rgb(61, 60, 60);
  border-top-right-radius: 10;
  border-top-left-radius: 10;
  label {
    color: white;
  }
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

.post-comments {
  background-color: rgb(102, 101, 101);
  padding: 10;
  border-bottom-right-radius: 10;
  border-bottom-left-radius: 10;
}
</style>
