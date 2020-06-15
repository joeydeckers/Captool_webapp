<template>
  <div id="login">
    <b-container fluid>
      <b-row>
        <b-col lg="6">
          <img alt="Vue logo" src="../assets/bg.png" />
        </b-col>
        <b-col lg="6">
          <b-form @submit.prevent="login">
            <h3>
              <strong>Inloggen</strong>
            </h3>
            <p>Vul jouw gegevens in om in te loggen.</p>
            <b-form-group id="input-group-1">
              <div class="input-holder">
                <font-awesome-icon icon="envelope" />
                <input type="email" placeholder="Jouw email" v-model="email" data-type="email" />
                <div class="error" v-if="!$v.name.required">Field is required</div>
                <div
                  class="error"
                  v-if="!$v.name.minLength"
                >Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
              </div>
            </b-form-group>

            <b-form-group id="input-group-2">
              <div class="input-holder">
                <font-awesome-icon icon="lock" />
                <input
                  type="password"
                  placeholder="Jouw wachtwoord"
                  v-model="password"
                  data-type="password"
                />
              </div>
            </b-form-group>

            <Button type="submit" buttonText="Inloggen" />
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { required, minLength } from "vuelidate";

export default {
  components: {
    Button
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
  }
};
</script>