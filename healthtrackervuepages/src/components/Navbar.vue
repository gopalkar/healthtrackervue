<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/home">Health Tracker</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if="isAuthenticated" to="/home">Home</b-nav-item>
        <b-nav-item v-if="isAuthenticated" to="/activities">Activities</b-nav-item>
        <b-nav-item v-if="isAuthenticated" to="/measurements">Measurements</b-nav-item>
        <b-nav-item v-if="isAuthenticated" to="/nutritions">Nutritions</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ms-auto">
        <b-nav-item v-if="!isAuthenticated" to="/">Login</b-nav-item>
        <b-nav-item v-if="isAuthenticated" class="dropdown" @click="toggleDropdown">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="dropdown-menu" :class="{ 'show': dropdownOpen }">
            <router-link to="/userpage">Profile</router-link>
            <router-link to="/logout">Logout</router-link>
            <b-dropdown-divider></b-dropdown-divider>
            <router-link to="/unsubscribe">UnSubscribe</router-link>
            <!-- Add more services as needed -->
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      menuOpen: false,
      dropdownOpen: false,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      if (this.menuOpen) {
        this.dropdownOpen = false; // Close the dropdown when the menu is opened
      }
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
};
</script>

<style>
/* Add your styling for the navigation bar here */
.separator {
  border-top: 1px solid #ccc;
  margin: 4px 0;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: white;
}

.navbar-toggle {
  cursor: pointer;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 6px 0;
  transition: 0.4s;
}

.navbar-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.navbar-menu a {
  color: white;
  text-decoration: none;
  margin: 10px 0;
}

.dropdown {
  cursor: pointer;
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  color: #333;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-menu a {
  background-color: #333;
  color: white;
  padding: 12px 16px;
  display: block;
  text-decoration: none;
}

.dropdown-menu.show {
  display: block;
}
</style>
