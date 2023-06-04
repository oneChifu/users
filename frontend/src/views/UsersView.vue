<template>
  <v-container>
    <UserForm />

    <UsersList />
  </v-container>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import UsersList from '@/components/UsersList.vue'

export default {
  name: 'UsersView',

  components: {
    UserForm,
    UsersList
  }
}
</script>
