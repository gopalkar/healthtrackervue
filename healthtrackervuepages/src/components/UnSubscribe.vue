<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'htUnSubscribe',
  data() {
    return {
      user: [],
      message: '',
    };
  },
  mounted() {
    this.user = this.$store.state.user
    this.deleteUser()
  },
  methods: {
    deleteUser: function () {
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      const userId = this.user.id;
      const url = apiUrl + `api/users/${userId}`
      axios.delete(url)
          .then(response => {
            console.log(response.status)
            this.message = 'You are successfully unsubscribed, do consider to register again!!'
            this.$store.dispatch('authenticateUser', false);
            this.$store.dispatch('logoutUser');
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
};
</script>