<template>
  <v-row class="users-search">
    <v-col
      cols="12"
      sm="6"
      md="3"
      lg="auto"
    >
      <v-text-field
        v-model.trim="searchQuery"
        label="Search"
        clearable
        :loading="isLoading"
        @input="searchUsers"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UsersSearch',

  data() {
    return {
      searchQuery: '',
      isLoading: false
    }
  },

  methods: {
    ...mapActions('users', ['fetchUsers']),

    searchUsers() {
      try {
        this.isLoading = true
        this.fetchUsers({ ...this.$route.query, search: this.searchQuery })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';

.users-search {
  .col-lg-auto {
    @media #{map-get($display-breakpoints, 'lg-and-up')} {
      min-width: 20%;
      max-width: 20%;
    }
  }
}
</style>
