<template>
  <GridLayout rows="auto" height="100%">
    <GridLayout row="0" height="100%" class="posts-container">
      <ScrollView height="100%" width="95%" class="posts-listview">
        <StackLayout>
        <GridLayout row="0">
          <Label text="Posts" fontSize="20" horizontalAlignment="center"></Label>
        </GridLayout>
          <GridLayout v-for="post in posts" :key="post.id" rows="*, auto, auto" class="post-container">
            <GridLayout row="0" class="post-header">
              <Label :text="post.header"></Label>
            </GridLayout>
            <GridLayout row="1" class="post-body">
              <Image :src="post.image">
              </Image>
            </GridLayout>
            <GridLayout row="2" class="post-footer">
              <Label :text="post.footer" textWrap="true"></Label>
            </GridLayout>
          </GridLayout>
        </StackLayout>
      </ScrollView>
    </GridLayout>        
  </GridLayout>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";
  import { openUrl } from "@nativescript/core/utils";

openUrl('your website url here');

  @Component({
    name: "Posts",
    components: {
  
    }
  })
  export default class Posts extends Vue {
    msg: string = "Posts";
    posts = [
      {
        id: 0,
        header: "Formula E-racewagen van Nissan",
        image: "https://arriyadiyah.com/media/thumb/c5/0a/800_94a0700f09.jpg",
        footer: "Formula E-racewagen van Nissan krijgt nieuwe look met kimonothema"
      }, 
      {
        id: 1,
        header: "Formula E-racewagen van Nissan",
        image: "https://fhi.nl/app/uploads/news/31fbfb9ec5bd6265d691110221236f8d-8d709747013f6b6a688298b145516898e4722b4e-form_e1.jpg",
        footer: "Formula E-racewagen van Nissan krijgt nieuwe look met kimonothema"
      }
    ];

    openLink() {
      console.log("HI");
      //openUrl("www.google.com");
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

</style>
