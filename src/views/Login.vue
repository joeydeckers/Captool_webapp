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
              </div>
            </b-form-group>
            <div class="error" v-if="!$v.email.required">Dit veld is verplicht</div>
            <div class="error" v-if="!$v.email.email">Vul een geldig email adres in</div>

            <b-form-group id="input-group-2">
              <div class="input-holder">
                <font-awesome-icon icon="lock" />
                <input
                  type="password"
                  placeholder="Jouw wachtwoord"
                  v-model="password"
                  data-type="password"
                />
                <div class="error" v-if="!$v.password.required">Dit veld is verplicht</div>
                <div
                  class="error"
                  v-if="!$v.password.minLength"
                >Het wachtwoord moet minimaal {{$v.password.$params.minLength.min}} karakters bevatten</div>
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
import { required, email, minLength } from "vuelidate/lib/validators";

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
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }
};
</script>

<style scoped>
.input-holder {
  background-color: #fff;
}
.error {
  margin-left: 35px;
}
</style>