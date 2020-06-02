<template>
  <div>
    <b-navbar class="shadow-sm" toggleable="lg" type="light" variant="white">
        <b-navbar-brand href="/home">Captool</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="!this.$store.getters.getAccessToken" href="/login">Login</b-nav-item>
            <b-nav-item v-if="!this.$store.getters.getAccessToken" href="/register">Sign up</b-nav-item>
            <b-nav-item v-if="this.$store.getters.getAccessToken" href="/home">Dashboard</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>