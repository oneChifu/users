export default {
  setUsers(state, { users, total }) {
    state.users = users
    state.total = total
  },

  addUser(state, data = {}) {
    if (!data._id) return

    if (state.users.length) {
      state.users.unshift(data)
    } else {
      state.users.push(data)
    }

    state.total++
  },

  updateUser(state, data = {}) {
    state.users = state.users.map((user) =>
      user._id === data._id ? { ...user, ...data } : user
    )
  },

  removeUser(state, data = {}) {
    const index = state.users.findIndex((e) => e._id === data._id)
    state.users.splice(index, 1)
    state.total--
  }
}
