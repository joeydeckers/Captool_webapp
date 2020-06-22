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
              <strong>Registreren</strong>
            </h3>
            <p>Vul jouw gegevens in om in te loggen.</p>
            <b-form-group id="input-group-1">
              <p class="error" v-if="submitStatus == 'ERROR' && !$v.email.required">Dit veld is verplicht</p>
              <p class="error" v-if="!$v.email.email">Vul een geldig email adres in</p>
              <div class="input-holder">
                <font-awesome-icon icon="envelope" />
                <input data-type="email" type="email" placeholder="Jouw email" v-model="email" />
              </div>
            </b-form-group>
            <p
              class="error"
              v-if="!$v.name.minLength"
            >Jouw naam moet minimaal {{$v.name.$params.minLength.min}} karakters bevatten</p>
            <p class="error" v-if="submitStatus == 'ERROR' && !$v.name.required">Dit veld is verplicht</p>
            <b-form-group id="input-group-1">
              <div class="input-holder">
                <font-awesome-icon icon="user" />
                <input data-type="name" type="name" placeholder="Jouw naam" v-model="name" />
              </div>
            </b-form-group>

            <b-form-group id="input-group-2">
              <p
                class="error"
                v-if="!$v.password.minLength"
              >Het wachtwoord moet minimaal {{$v.password.$params.minLength.min}} karakters bevatten</p>
              <p class="error" v-if="submitStatus == 'ERROR' && !$v.password.required">Dit veld is verplicht</p>
              <div class="input-holder">
                <font-awesome-icon icon="lock" />
                <input
                  data-type="password"
                  type="password"
                  placeholder="Jouw wachtwoord"
                  v-model="password"
                />
              </div>
            </b-form-group>

            <Button type="submit" :buttonLoading='this.buttonLoading' buttonText="Registeren" />
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
      password: "",
      submitStatus: "",
      buttonLoading: false
    };
  },
  methods: {
    registerUser() {
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.buttonLoading = true;
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
  color: red;
}
</style>