<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'htLogout',
  mounted() {
      // Clear the user in the Vuex store
      this.$store.dispatch('authenticateUser', false);
      this.$store.dispatch('logoutUser');
      // Redirect to the login page or another public route
      this.$router.push('/');
  },
};
</script>