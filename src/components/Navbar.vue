<template>
  <div>
    <b-navbar class="shadow-sm" toggleable="lg" type="light" variant="white">
        <b-navbar-brand href="/">Captool</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="!this.$store.getters.getAccessToken" href="#"> <router-link to="/login">Login</router-link> </b-nav-item>
            <b-nav-item v-if="!this.$store.getters.getAccessToken" href="#"><router-link to="/register">Sign up</router-link></b-nav-item>
            <b-nav-item v-if="this.$store.getters.getAccessToken" href="#"><router-link to="/">Dashboard</router-link></b-nav-item>
            <b-nav-item v-if="this.$store.getters.getAccessToken" href="#"><router-link to="/profile">Profile</router-link></b-nav-item>
            <b-nav-item v-if="this.$store.getters.getAccessToken" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
export default {
    methods:{
        logout(){
            this.$store.dispatch('logout');
        }
    }
}
</script>

<style lang="scss" scoped>
    a{
        color: #000;
        &:hover{
            text-decoration: none;
        }
    }
</style>