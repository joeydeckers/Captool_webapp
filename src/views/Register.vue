<template>
  <div id="register">
    <b-container>
        <b-row>
            <b-col lg="6" class="mx-auto">
               
                    <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
                    >
                    <b-form-input
                        id="input-1"
                        v-model="email"
                        type="email"
                        required
                        placeholder="Enter email"
                    ></b-form-input>
                    <b-form-input
                        id="input-1"
                        v-model="name"
                        type="text"
                        required
                        placeholder="Enter name"
                    ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                    <b-form-input id="input-2" v-model="password" required placeholder="Password"></b-form-input>
                    </b-form-group>


                    <button @click="registerUser" type="submit" variant="primary">Submit</button>
               
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";  

export default {
  
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