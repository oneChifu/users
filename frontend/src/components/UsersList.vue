<template>
  <div class="user-list">
    <UsersSearch />

    <v-data-table
      class="elevation-4"
      :headers="headers"
      :items="users"
      :server-items-length.sync="total"
      :options.sync="options"
      :loading="isLoading"
      @update:page="onUpdatePage"
      @update:items-per-page="onUpdateLimit"
    >
      <template v-slot:top>
        <v-dialog
          v-model="isEdit"
          max-width="1200px"
          @input="closeEdit"
        >
          <v-card class="pb-3">
            <v-card-text>
              <UserForm
                ref="userFormRef"
                :user="userData"
                edit
                :actions="false"
                @submit="closeEdit"
                @invalid="isInvalid = $event"
              />
            </v-card-text>

            <v-card-actions>
              <v-btn
                type="submit"
                color="primary"
                :disabled="isLoading || isInvalid"
                @click="submitEdit"
              >
                Submit
              </v-btn>

              <v-btn
                color="primary"
                :disabled="isLoading"
                @click="closeEdit"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="isDelete"
          max-width="500px"
          @input="closeDelete"
        >
          <v-card class="py-3">
            <v-card-title class="text-h6">
              Are you sure you want to delete {{ userData.firstName }}?
            </v-card-title>

            <v-card-actions>
              <v-btn
                type="submit"
                color="primary"
                :disabled="isLoading"
                @click="submitDelete"
              >
                Delete
              </v-btn>

              <v-btn
                color="primary"
                :disabled="isLoading"
                @click="closeDelete"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template v-slot:[`item.birthDate`]="{ item }">
        <span class="text-no-wrap">{{ item.birthDate | formatDate }}</span>
      </template>

      <template v-slot:[`item.gender`]="{ item }">
        {{ item.gender === 1 ? 'Male' : 'Female' }}
      </template>

      <template v-slot:[`item.edit`]="{ item }">
        <v-btn
          color="primary"
          x-small
          fab
          @click="openEdit(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>

      <template v-slot:[`item.delete`]="{ item }">
        <v-btn
          color="primary"
          x-small
          fab
          @click="openDelete(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

      <template #no-data>
        <div class="subtitle-2 text-center">No users</div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserForm from '@/components/UserForm.vue'
import UsersSearch from '@/components/UsersSearch.vue'

export default {
  name: 'UsersList',

  components: {
    UserForm,
    UsersSearch
  },

  data() {
    return {
      isLoading: false,
      isInvalid: true,
      isEdit: false,
      isDelete: false,

      userData: {},

      headers: [
        {
          text: 'FirstName',
          align: 'start',
          sortable: false,
          value: 'firstName'
        },
        {
          text: 'LastName',
          sortable: false,
          value: 'lastName'
        },
        {
          text: 'Date of Birth',
          sortable: false,
          value: 'birthDate'
        },
        {
          text: 'Email Id',
          sortable: false,
          value: 'email'
        },
        {
          text: 'Gender',
          sortable: false,
          value: 'gender'
        },
        {
          text: 'Country',
          sortable: false,
          value: 'country'
        },
        {
          text: 'State',
          sortable: false,
          value: 'state'
        },
        {
          text: 'City',
          sortable: false,
          value: 'city'
        },
        {
          text: 'Address',
          sortable: false,
          value: 'address'
        },
        {
          text: 'Pincode',
          sortable: false,
          value: 'pincode'
        },
        {
          text: 'Edit',
          sortable: false,
          value: 'edit'
        },
        {
          text: 'Delete',
          sortable: false,
          value: 'delete'
        }
      ],

      options: {
        page: parseFloat(this.$route.query.page) || 1,
        itemsPerPage: parseFloat(this.$route.query.limit) || 5,
        sortBy: 'createdAt',
        sortDesc: true
      }
    }
  },

  computed: {
    ...mapState('users', ['users', 'total'])
  },

  created() {
    this.getUsers()
  },

  methods: {
    ...mapActions('users', ['fetchUsers', 'deleteUser']),

    async getUsers() {
      const { page, itemsPerPage: limit } = this.options

      try {
        this.loading = true
        await this.fetchUsers({
          page,
          limit
        })
      } finally {
        this.loading = false
      }
    },

    onUpdatePage(page) {
      this.$router.push({ query: { ...this.$route.query, page } })
      this.getUsers()
    },

    onUpdateLimit(limit) {
      this.$router.push({ query: { ...this.$route.query, limit } })
      this.getUsers()
    },

    openEdit(user) {
      this.isEdit = true
      this.userData = { ...user }
    },

    closeEdit() {
      this.isEdit = false
      this.userData = {}
      this.$refs.userFormRef.reset()
    },

    async submitEdit() {
      try {
        this.isLoading = true
        await this.$refs.userFormRef.submit()
      } finally {
        this.isLoading = false
      }
    },

    openDelete(user) {
      this.isDelete = true
      this.userData = { ...user }
    },

    closeDelete() {
      this.isDelete = false
      this.userData = {}
    },

    async submitDelete() {
      try {
        this.isLoading = true
        this.deleteUser(this.userData)
        this.closeDelete()
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';

.user-list {
  margin-top: 40px;
}
</style>
