<template>
  <GridLayout rows="4*, 12*, 14*" height="100%">
    <!-- Load Actionbar on top -->
    <ActionBarTop row="0"/>
    <!--Display Profile Picture and Page name-->
    <GridLayout row="1" height="200" marginTop="-90">
      <Image src="~/Images/back_btn.png" class="back-button" horizontalAlignment="left" verticalAlignment="top" marginLeft="15" tintColor="black" width = "50" height="50" @tap="goBack"></Image>
      <Label text="Mijn Profiel" fontSize="32" textAlignment="center"></Label>
      <!--Get profile picture of user-->
      <Image :src="this.currentUser.pfp_url" width="100" height="100" class="profile-pic"></Image>
    </GridLayout>

    <StackLayout width="95%" row="2" marginTop="-80">
      <!--General Stuff in Stacklayout(Name, Email, Role)-->
      <StackLayout class="profile-header">

        <!--Displays Username of user-->
        <Label>
          <FormattedString>
            <Span text="Naam: " fontSize="20" fontWeight="bold"/>
            <Span :text ="this.currentUser.username" fontSize="20"/>
          </FormattedString>
        </Label>

        <!--Displays Email-->
        <Label textWrap="true">
          <FormattedString>
            <Span text="Email: " fontSize="20" fontWeight="bold"/>
            <Span :text ="this.currentUser.email" fontSize="20"/>
          </FormattedString>
        </Label>

        <!--Displays Role-->
        <Label>
          <FormattedString>
            <Span text="Rol:     " fontSize="20" fontWeight="bold"/>
            <Span :text ="this.currentUser.role" fontSize="20"/>
          </FormattedString>
        </Label>        
      </StackLayout>

      <!--Extra stuff(Status/ extra info)-->
      <StackLayout marginTop="0" class="profile-footer">
        <!--Extra Information-->
        <Label textWrap="true">
          <FormattedString>
            <Span text="Info: \n" fontSize="18" fontWeight="bold" marginLeft= "30"/>
            <Span :text="this.currentUser.gebruikerinfo" fontSize="16"/>
          </FormattedString>
        </Label>
      </StackLayout>

    </StackLayout>
    <!-- Load Actionbar on bottom -->
    <ActionBarBottom row="4" height="7%" marginBottom="-3" />
  </GridLayout>

</template>

<script lang="ts">
  //import from other files
  import { Http, HttpResponse } from '@nativescript/core';
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";
  import ActionBarTop from "./ActionBars/ActionBarTop.vue";
  import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";
  import UserProfile from "@/Models/UserProfile";
  import * as AppSettings from '@nativescript/core/application-settings';
  import {WriteFile, ReadFile, ReadFileSync} from "@/Models/FileSystemFunctions";
  import newPerson from '~/Models/newPerson';

  //Defines main component and add other components if necessary
  @Component({
    name: "Profiel",
    components: {
      ActionBarTop,
      ActionBarBottom
    }
  })

  
  export default class Profiel extends Vue {
    msg: string = "Profiel";
    str: string = "";
    currentUser!: UserProfile;  
    //The code that runs before the page is loaded
    beforeMount() 
    {
    var FileContent = ReadFileSync("Models", "UserJSON.json");

    let JSONFileContent = JSON.parse(FileContent);
    this.currentUser =  JSON.parse(FileContent);
    console.log(`CurrentUser: this.currentUser`)
    console.log(`FileContent CurrentUser: ${JSONFileContent}`)
    console.log("User loaded test")
    }
    

    goBack() 
    {
      //Back to Posts page.
      if (this.$modal) this.$modal.close();
    }
  }
</script>

<style scoped lang="scss">
  @import '@nativescript/theme/scss/variables/blue';

  // Custom styles
  .fas 
  {
    @include colorize($color: accent);
  }

  //Back button styling and border
  .back-button 
  {
    width: 40;
    height: 40;
    vertical-align: middle;
  }

  //Profile picture styling and border
  .profile-pic 
  {
    max-width: 40;
    max-height: 40;
    border-radius: 50;
    border-width: 2;
    border-color: rgb(61, 60, 60);
    object-fit: scale-down;
    margin-right: 5;
    
  }
  
  //Top part of user info container
  .profile-header 
  {
  background-color: rgb(255, 255, 255);
  border-top-width: 5px;
  border-left-width: 5px;
  border-right-width: 5px;
  border-top-right-radius: 10;
  border-top-left-radius: 10;
  label 
    {
    color: black;
    }
  padding: 10;
  }

//Bottom part of user info container
  .profile-footer 
  {
    background-color: rgb(255, 255, 255);
    border-bottom-right-radius: 10;
    border-bottom-left-radius: 10;
    border-top-width: 2px;
    border-bottom-width: 5px;
    border-left-width: 5px;
    border-right-width: 5px;
    label 
      {
        color: black;
      }
    padding: 10;
  }
</style>
