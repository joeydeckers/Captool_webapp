<template>
  <div id="register">
    <b-container fluid>
        <b-row>
          <b-col lg="6">
            <img alt="Vue logo" src="../assets/bg.png">
          </b-col>
            <b-col lg="6">
              
                <b-form @submit.prevent="registerUser" @reset="onReset">
                    <h3><strong>Inloggen</strong></h3>
                    <p>Vul jouw gegevens in om in te loggen.</p>
                    <b-form-group
                      id="input-group-1"                     
                    >

                    <div class="input-holder">
                      <font-awesome-icon icon="envelope" />
                      <input data-type="email" type="email" placeholder="Jouw email" v-model="email">
                    </div>
                    
                    </b-form-group>
                    <b-form-group
                      id="input-group-1"                     
                    >

                    <div class="input-holder">
                      <font-awesome-icon icon="user" />
                      <input data-type="name" type="name" placeholder="Jouw naam" v-model="name">
                    </div>
                    
                    </b-form-group>

                    <b-form-group id="input-group-2">
                    <div class="input-holder">
                      <font-awesome-icon icon="lock" />
                      <input data-type="password" type="password" placeholder="Jouw wachtwoord" v-model="password">
                    </div>
                    </b-form-group>


                     <Button type="submit" buttonText="Registeren"/>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";  
import Button from '@/components/Button.vue'

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
    ...mapActions(["register"]),
    registerUser(){
      this.register({
        email: this.email,
        name: this.name,
        password: this.password
      })
    }
  }
};
</script>