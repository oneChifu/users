import $http from '@/plugins/axios/'

export default {
  async fetchUsers(
    { commit },
    { page, limit, sortDesc, sortBy, search, ...params }
  ) {
    const { data } = await $http.get('/api/users', {
      params: {
        ...params,
        page,
        limit,
        sortDesc: sortDesc || undefined,
        sortBy: sortBy || undefined,
        search: search || undefined
      }
    })
    commit('setUsers', data)
  },

  async createUser({ commit }, user = {}) {
    const { data } = await $http.post('/api/users', user)
    commit('addUser', data)
  },

  async editUser({ commit }, user = {}) {
    const { data } = await $http.put(`/api/users/${user._id}`, user)
    commit('updateUser', data)
  },

  async deleteUser({ commit }, user = {}) {
    const { data } = await $http.delete(`/api/users/${user._id}`)
    commit('removeUser', data)
  }
}
