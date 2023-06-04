<template>
  <v-row>
    <v-col cols="3">
      <v-text-field
        v-model="searchQuery"
        label="Search"
        clearable
        :loading="isLoading"
        @input="searchUsers"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UsersSearch',

  data() {
    return {
      searchQuery: '',
      isLoading: false
    }
  },

  computed: {
    ...mapState('users', ['users', 'total'])
  },

  created() {},

  methods: {
    ...mapActions('users', ['fetchUsers', 'deleteUser']),

    searchUsers() {
      try {
        this.isLoading = true
        this.fetchUsers({ firstName: this.searchQuery })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
