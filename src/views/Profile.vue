<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card header="Profiel instellingen">
          <b-form  @submit.prevent="saveSettings">
            <b-list-group>
              <!-- <b-list-group-item v-for="test in tests" :key="test.name">
              {{test.name}}:
              <b-form-input v-model="test.input" :placeholder="test.value" v-if="test.change"></b-form-input>
              <span v-else class="font-weight-bold">{{ test.value }}</span>
              <b-button @click="test.change = !test.change" v-if="!test.change">Edit</b-button>
              <b-button
                @click="test.change = !test.change, test.value = test.input"
                v-if="test.change"
              >Save</b-button>
              </b-list-group-item>-->
              <b-list-group-item>
                Naam:
                <b-form-input v-model="name.input" :placeholder="user.name" v-if="name.change"></b-form-input>
                <span v-else class="font-weight-bold">{{ user.name }}</span>
                <b-button class="btn" @click="name.change = !name.change" v-if="!name.change">Edit</b-button>
                <b-button class="btn"
                  @click="name.change = !name.change, user.name = name.input"
                  v-if="name.change"
                >Save</b-button>
              </b-list-group-item>
              <b-list-group-item>
                Email:
                <b-form-input v-model="email.input" :placeholder="user.email" v-if="email.change"></b-form-input>
                <span v-else class="font-weight-bold">{{ user.email }}</span>
                <b-button class="btn" @click="email.change = !email.change" v-if="!email.change">Edit</b-button>
                <b-button class="btn"
                  @click="email.change = !email.change, user.email = email.input"
                  v-if="email.change"
                >Save</b-button>
              </b-list-group-item>
              <b-list-group-item>
                Afspeellijst:
                <b-form-input
                  v-model="playlist.input"
                  :placeholder="user.playlist"
                  v-if="playlist.change"
                  data-type="playlist"
                ></b-form-input>
                <span v-else class="font-weight-bold">{{ user.playlist }}</span>
                <b-button class="btn" data-type="edit-btn-playlist" @click="playlist.change = !playlist.change" v-if="!playlist.change">Edit</b-button>
                <b-button class="btn"
                  @click="playlist.change = !playlist.change, user.playlist = playlist.input"
                  v-if="playlist.change"
                >Save</b-button>
              </b-list-group-item>
              <b-list-group-item>
                Wachtwoord:
                <b-form-input
                type="password"
                  v-model="password.input"
                  v-if="password.change"
                ></b-form-input>
                <span v-else class="font-weight-bold">*************</span>
                <b-button class="btn" @click="password.change = !password.change" v-if="!password.change">Edit</b-button>
                <b-button class="btn"
                  @click="password.change = !password.change, user.password = password.input"
                  v-if="password.change"
                >Save</b-button>
              </b-list-group-item>
              <b-button type="submit">Save</b-button>
            </b-list-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      name: {
        input: "",
        change: ""
      },
      email: {
        input: "",
        change: ""
      },
      playlist: {
        input: "",
        change: ""
      },
      password: {
        input: "",
        change: ""
      },
    };
  },
  methods: {
    getUser() {
      return {
        name: this.name.input === "" ? this.user.name : this.name.input,
        email: this.email.input === "" ? this.user.email : this.email.input,
        playlist: this.playlist.input === "" ? this.user.playlist : this.playlist.input,
        password: this.password.input === "" ? this.user.password : this.password.input,
      }
    },
    saveSettings() {
      this.$store.dispatch("updateUser", {access_token: this.$store.getters.getAccessToken, user: this.getUser()});
    },
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
  .btn {
    float: right;
  }
</style>