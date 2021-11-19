<template>
<GridLayout rows="auto" height="100%" class="profile-container">
  <GridLayout rows="4*, 12*, 14*" height="100%">
    <ActionBarTop row="-1" marginTop="-35" height="100"/>
    <!--Profile Pic en Pagina naam-->
    <GridLayout row="1" height="200" marginTop="-90">
      <Image src="~/Images/back_btn.png" class="back-button" horizontalAlignment="left" verticalAlignment="top" marginLeft="15" tintColor="black" width = "50" height="50" @tap="goBack"></Image>
      <Label text="Mijn Profiel" fontSize="32" textAlignment="center" ></Label>
      <!--Pak profielfoto van gebruiker-->
      <Image :src="this.currentUser.pfp_url" width="100" height="100" class="profile-pic"></Image>
    </GridLayout>

    <StackLayout width="95%" row="2" marginTop="-80">
      <!--Algemene Stuff in Stacklayout(Naam, Email, Rol)-->
      <StackLayout class="profile-header">

        <!--Weergeven Username gebruiker-->
        <Label>
          <FormattedString>
            <Span text="   Naam: " fontSize="20" fontWeight="bold"/>
            <Span :text ="this.currentUser.username" fontSize="20"/>
          </FormattedString>
        </Label>

        <!--Email-->
        <Label textWrap="true">
          <FormattedString>
            <Span text="   Email: " fontSize="20" fontWeight="bold"/>
            <Span :text ="this.currentUser.email" fontSize="20"/>
          </FormattedString>
        </Label>

        <!--Rol-->
        <Label>
          <FormattedString>
            <Span text="   Rol: " fontSize="20" fontWeight="bold"/>
            <Span :text ="this.currentUser.role" fontSize="20"/>
          </FormattedString>
        </Label>        
      </StackLayout>

      <!--Extra stuff(Status/ extra info)-->
      <StackLayout marginTop="0" class="profile-footer">
        <!--Status-->
        <Label textWrap="true">
          <FormattedString>
            <Span text="Gebruiker info: \n" fontSize="18" fontWeight="bold" marginLeft= "30"/>
            <Span  
              :text="this.currentUser.gebruikerinfo" fontSize="16"
            />
          </FormattedString>
        </Label>
      </StackLayout>

    </StackLayout>
    <ActionBarBottom row="4" height="50" marginBottom="-3" />
  </GridLayout>
</GridLayout>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";
  import { Component, Prop } from "vue-property-decorator";
  import ActionBarTop from "./ActionBars/ActionBarTop.vue";
  import ActionBarBottom from "./ActionBars/ActionBarBottom.vue";
  import User from "@/Models/User";
  @Component({
    name: "Profiel",
    components: {
      ActionBarTop,
      ActionBarBottom
    }
  })
  export default class Profiel extends Vue {
    msg: string = "Profiel";
    currentUser!: User;

    beforeMount() {
      //Tijdelijk hier gebruiker inloggen.  
    this.currentUser = new User(
      "Sponsor123",
      "https://cdn.vox-cdn.com/thumbor/VVXayrypyYIMqiHWIYdL77FRF_o=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22408516/Big_Chungus.png"
    );
  }
    goBack() {
      //Terug naar Posts scherm.
    if (this.$modal) this.$modal.close();
  }
  }
</script>

<style scoped lang="scss">
  @import '@nativescript/theme/scss/variables/blue';

  // Custom styles
  .fas {
    @include colorize($color: accent);
  }

  .back-button-container {
  padding-left: 5;
  padding-top: 10;
  }

  .back-button {
    width: 40;
    height: 40;
    vertical-align: middle;
  }

  .profile-pic {
    max-width: 40;
    max-height: 40;
    border-radius: 50;
    border-width: 2;
    border-color: rgb(61, 60, 60);
    object-fit: scale-down;
    margin-right: 5;
  }
  
  .profile-container {
  background-color: transparent;
  margin-top: 20;
}
  .profile-header {
  background-color: rgb(61, 60, 60);
  border-top-right-radius: 10;
  border-top-left-radius: 10;
  label {
    color: white;
  }
  padding: 10;
}

.profile-footer {
  background-color: rgb(61, 60, 60);
  border-bottom-right-radius: 10;
  border-bottom-left-radius: 10;
  label {
    color: white;
  }
  padding: 10;
}
</style>
