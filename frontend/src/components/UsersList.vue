<template>
  <div class="user-list">
    <UsersSearch />

    <v-data-table
      class="elevation-4"
      :headers="headers"
      :items="items"
      :server-items-length.sync="total"
      :options.sync="options"
      :loading="isLoading"
      must-sort
      @update:page="onUpdatePage"
      @update:items-per-page="onUpdateLimit"
      @update:sort-desc="onUpdateSortDesc"
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

      options: {
        page: parseFloat(this.$route.query.page) || 1,
        itemsPerPage: parseFloat(this.$route.query.limit) || 5,
        sortBy: ['id'],
        sortDesc: [true]
      },

      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        {
          text: 'FirstName',
          align: 'start',
          value: 'firstName'
        },
        {
          text: 'LastName',
          value: 'lastName'
        },
        {
          text: 'Date of Birth',
          value: 'birthDate'
        },
        {
          text: 'Email Id',
          value: 'email'
        },
        {
          text: 'Gender',
          value: 'gender'
        },
        {
          text: 'Country',
          value: 'country'
        },
        {
          text: 'State',
          value: 'state'
        },
        {
          text: 'City',
          value: 'city'
        },
        {
          text: 'Address',
          value: 'address'
        },
        {
          text: 'Pincode',
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
      ]
    }
  },

  computed: {
    ...mapState('users', ['users', 'total']),

    items() {
      return this.users.slice(0, this.options.itemsPerPage)
    }
  },

  created() {
    this.getUsers()
  },

  methods: {
    ...mapActions('users', ['fetchUsers', 'deleteUser']),

    async getUsers() {
      const { page, itemsPerPage, sortDesc, sortBy } = this.options

      try {
        this.loading = true
        await this.fetchUsers({
          page,
          limit: itemsPerPage,
          sortDesc: sortDesc[0],
          sortBy: sortBy[0]
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

    onUpdateSortDesc(sortDesc) {
      const sortBy = this.options.sortBy[0]

      this.$router.push({
        query: {
          ...this.$route.query,
          'sortDesc': sortDesc ? true : undefined,
          'sortBy': sortBy || undefined
        }
      })

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
