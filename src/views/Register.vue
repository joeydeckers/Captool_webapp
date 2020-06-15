<template>
  <div id="register">
    <b-container fluid>
      <b-row>
        <b-col lg="6">
          <img alt="Vue logo" src="../assets/bg.png" />
        </b-col>
        <b-col lg="6">
          <b-form @submit.prevent="registerUser">
            <h3>
              <strong>Inloggen</strong>
            </h3>
            <p>Vul jouw gegevens in om in te loggen.</p>
            <b-form-group id="input-group-1">
              <div class="input-holder">
                <font-awesome-icon icon="envelope" />
                <input data-type="email" type="email" placeholder="Jouw email" v-model="email" />
                <div class="error" v-if="!$v.email.required">Dit veld is verplicht</div>
                <div class="error" v-if="!$v.email.email">Vul een geldig email adres in</div>
              </div>
            </b-form-group>
            <b-form-group id="input-group-1">
              <div class="input-holder">
                <font-awesome-icon icon="user" />
                <input data-type="name" type="name" placeholder="Jouw naam" v-model="name" />
                <div class="error" v-if="!$v.name.required">Dit veld is verplicht</div>
                <div
                  class="error"
                  v-if="!$v.name.minLength"
                >Jouw naam moet minimaal {{$v.name.$params.minLength.min}} karakters bevatten</div>
              </div>
            </b-form-group>

            <b-form-group id="input-group-2">
              <div class="input-holder">
                <font-awesome-icon icon="lock" />
                <input
                  data-type="password"
                  type="password"
                  placeholder="Jouw wachtwoord"
                  v-model="password"
                />
                <div class="error" v-if="!$v.password.required">Dit veld is verplicht</div>
                <div
                  class="error"
                  v-if="!$v.password.minLength"
                >Het wachtwoord moet minimaal {{$v.password.$params.minLength.min}} karakters bevatten</div>
              </div>
            </b-form-group>

            <Button type="submit" buttonText="Registeren" />
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
      name: "",
      password: ""
    };
  },
  methods: {
    registerUser() {
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.$store.dispatch("register", {
          email: this.email,
          name: this.name,
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
    name: {
      required,
      minLength: minLength(2)
    },
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