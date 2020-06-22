<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card header="Profiel instellingen">
          <b-form @submit.prevent="saveSettings">
            <b-list-group>
              <b-list-group-item>
                <p class="mb-0 p-0 mr-3">Naam:</p>
                <b-form-input v-model="name" :placeholder="user.name"></b-form-input>
              </b-list-group-item>
              <b-list-group-item>
                <p class="mb-0 p-0 mr-3">Email:</p>
                <b-form-input v-model="email" :placeholder="user.email"></b-form-input>
              </b-list-group-item>
              <b-list-group-item>
                <p class="mb-0 p-0 mr-3">Afspeellijst:</p>
                <b-form-input v-model="playlist" :placeholder="user.playlist"></b-form-input>
              </b-list-group-item>
              <b-list-group-item>
                <p class="mb-0 p-0 mr-3">Wachtwoord:</p>
                <b-form-input v-model="password" :placeholder="user.password"></b-form-input>
              </b-list-group-item>
              <b-button type="submit">Save</b-button>
            </b-list-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <b-toast
      id="example-toast"
      title="BootstrapVue"
      class="b-toaster-top-right"
      static
      no-auto-hide
    ></b-toast>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},

      name: "",
      email: "",
      playlist: "",
      password: "",
    };
  },
  methods: {
    makeToast(variant = null, titleToast, bodyToast) {
      this.$bvToast.toast(bodyToast, {
        title: titleToast,
        variant: variant,
        solid: true
      });
    },
    getUser() {
      return {
        name: this.name === "" ? this.user.name : this.name,
        email: this.email === "" ? this.user.email : this.email,
        playlist:
          this.playlist === "" ? this.user.playlist : this.playlist,
        password:
          this.password === "" ? this.user.password : this.password
      };
    },
    saveSettings() {
      this.$store.dispatch("updateUser", {
        access_token: this.$store.getters.getAccessToken,
        user: this.getUser()
      });
      this.makeToast(
        "success",
        "Profiel bijgewerkt",
        "Jouw profiel is successvol bijgewerkt."
      );
    }
  },
  created() {
    this.$store.dispatch("fetchUser", this.$store.getters.getAccessToken);
    setTimeout(() => {
      this.user = this.$store.getters.getUser;
    }, 1000);
  }
};
</script>

<style scoped>
</style>