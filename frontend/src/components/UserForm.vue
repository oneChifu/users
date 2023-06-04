<template>
  <ValidationObserver
    ref="observerRef"
    class="user-form"
    tag="div"
  >
    <v-row justify-lg="space-between">
      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="auto"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="FirstName"
          rules="required|max:10"
          slim
        >
          <v-text-field
            v-model="userData.firstName"
            label="FirstName"
            :disabled="isLoading"
            :error-messages="errors"
          />
        </ValidationProvider>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="auto"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="LastName"
          rules="required|max:10"
          slim
        >
          <v-text-field
            v-model="userData.lastName"
            label="LastName"
            :disabled="isLoading"
            :error-messages="errors"
          />
        </ValidationProvider>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="auto"
      >
        <v-menu
          ref="birthDateMenuRef"
          v-model="isBirthDateMenu"
          :close-on-content-click="false"
          :return-value.sync="userData.birthDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <ValidationProvider
              v-slot="{ errors }"
              name="Date of Birth"
              rules="required"
              slim
            >
              <v-text-field
                :value="birthDateFormatted"
                label="Date of Birth"
                append-icon="mdi-calendar"
                readonly
                :disabled="isLoading"
                :error-messages="errors"
                v-bind="attrs"
                v-on="on"
              />
            </ValidationProvider>
          </template>

          <v-date-picker
            v-model="userData.birthDate"
            no-title
            scrollable
            reactive
            @change="saveBirthDate"
          >
            <v-spacer></v-spacer>

            <v-btn
              text
              color="primary"
              @click="isBirthDateMenu = false"
            >
              Close
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="auto"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="Email ID"
          rules="required|email"
          slim
        >
          <v-text-field
            v-model="userData.email"
            label="Email ID"
            type="email"
            :disabled="isLoading"
            :error-messages="errors"
          />
        </ValidationProvider>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="auto"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="Gender"
          rules="required"
          slim
        >
          <v-radio-group
            v-model="userData.gender"
            label="Gender"
            :disabled="isLoading"
            :error-messages="errors"
            row
          >
            <v-radio
              label="Male"
              :value="1"
            ></v-radio>
            <v-radio
              label="Female"
              :value="2"
            ></v-radio>
          </v-radio-group>
        </ValidationProvider>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="auto"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="Country"
          rules="required"
          slim
        >
          <v-combobox
            v-model="userData.country"
            label="Country"
            :items="countries.items"
            item-text="name"
            item-value="name"
            :return-object="false"
            :loading="countries.loading"
            autocomplete="null"
            :disabled="isLoading || countries.loading"
            :error-messages="errors"
          />
        </ValidationProvider>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="auto"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="State"
          rules="required"
          slim
        >
          <v-combobox
            v-model="userData.state"
            ref="stateRef"
            label="State"
            :items="states.items"
            item-text="name"
            item-value="name"
            :return-object="false"
            :loading="states.loading"
            :disabled="isStatesDisabled"
            autocomplete="null"
            :error-messages="errors"
          />
        </ValidationProvider>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="auto"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="City"
          rules="required"
          slim
        >
          <v-combobox
            v-model="userData.city"
            ref="cityRef"
            label="City"
            :items="cities.items"
            item-text="name"
            item-value="name"
            :return-object="false"
            :loading="cities.loading"
            :disabled="isCitiesDisabled"
            autocomplete="null"
            :error-messages="errors"
          />
        </ValidationProvider>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="auto"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="Address"
          rules="required|max:32"
          slim
        >
          <v-text-field
            v-model="userData.address"
            label="Address"
            :disabled="isLoading"
            :error-messages="errors"
          />
        </ValidationProvider>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
        lg="auto"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="Pincode"
          rules="required|numeric|max:8"
          slim
        >
          <v-text-field
            v-model="userData.pincode"
            label="Pincode"
            :disabled="isLoading"
            :error-messages="errors"
          />
        </ValidationProvider>
      </v-col>
    </v-row>

    <template v-if="actions">
      <v-btn
        class="mr-4"
        type="submit"
        color="primary"
        :disabled="isLoading || invalid"
        @click="submit"
      >
        Submit
      </v-btn>

      <v-btn
        color="primary"
        :disabled="isLoading"
        @click="reset"
      >
        Reset
      </v-btn>
    </template>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapActions } from 'vuex'

export default {
  name: 'UserForm',

  components: { ValidationObserver, ValidationProvider },

  props: {
    user: {
      type: Object,
      default: () => {}
    },

    actions: {
      type: Boolean,
      default: true
    },

    edit: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isMounted: false,
      isLoading: false,
      isBirthDateMenu: false,

      userData: {},

      countries: {
        loading: true,
        items: []
      },
      states: {
        empty: false,
        loading: false,
        items: []
      },
      cities: {
        empty: false,
        loading: false,
        items: []
      }
    }
  },

  computed: {
    isStatesDisabled() {
      return Boolean(
        !this.userData.country ||
          this.states.loading ||
          !this.states.items.length ||
          this.states.empty ||
          this.isLoading
      )
    },

    isCitiesDisabled() {
      return Boolean(
        !this.userData.country ||
          this.cities.loading ||
          !this.cities.items.length ||
          this.cities.empty ||
          this.isLoading
      )
    },

    birthDateFormatted() {
      return this.$options.filters.formatDate(this.userData.birthDate)
    },

    invalid() {
      return this.isMounted && this.$refs.observerRef.flags.invalid
    }
  },

  watch: {
    invalid: {
      handler(val) {
        this.$emit('invalid', val)
      },
      immediate: true
    },

    'userData.country': {
      handler(val, valOld) {
        if (valOld && val !== valOld && this.$refs.observerRef) {
          this.$refs.observerRef.refs.State.reset()
        }

        if (val) {
          this.fetchStates()
        }
      },
      immediate: true
    },

    'userData.state': {
      handler(val, valOld) {
        if (valOld && val !== valOld && this.$refs.observerRef) {
          this.$refs.observerRef.refs.City.reset()
        }

        if (val) {
          this.fetchCities()
        }
      },
      immediate: true
    }
  },

  created() {
    this.userData = { ...this.user }
    this.fetchCountries()
  },

  mounted() {
    this.isMounted = true
  },

  methods: {
    ...mapActions('users', ['createUser', 'editUser']),

    saveBirthDate() {
      this.$refs.birthDateMenuRef.save(this.userData.birthDate)
    },

    async fetchCountries() {
      try {
        this.countries.loading = true
        const { data } = await this.$http.get('/api/countries')
        this.countries.items = data
      } finally {
        this.countries.loading = false
      }
    },

    async fetchStates() {
      if (!this.userData.country) return

      try {
        this.states.loading = true
        this.states.empty = false
        const { data } = await this.$http.get('/api/states', {
          params: {
            country_name: this.userData.country
          }
        })

        this.states.items = data

        if (data.length <= 0) {
          this.states.empty = true
          this.userData.state = null
          this.fetchCities()
        } else if (
          this.userData.state &&
          !data.find((e) => e.name === this.userData.state)
        ) {
          this.userData.state = null
        }
      } finally {
        this.states.loading = false
      }
    },

    async fetchCities() {
      if (!this.userData.country) return

      try {
        this.cities.loading = true
        this.cities.empty = false
        const { data } = await this.$http.get('/api/cities', {
          params: {
            country_name: this.userData.country,
            state_name: this.userData.state || undefined
          }
        })

        this.cities.items = data

        if (data.length <= 0) {
          this.cities.empty = true
          this.userData.city = null
          this.fetchCities()
        } else if (
          this.userData.city &&
          !data.find((e) => e.name === this.userData.city)
        ) {
          this.userData.city = null
        }
      } finally {
        this.cities.loading = false
      }
    },

    async submit() {
      if (await !this.$refs.observerRef.validate()) return

      try {
        this.isLoading = true

        this.edit
          ? await this.editUser(this.userData)
          : await this.createUser(this.userData)

        this.reset()
        this.$emit('submit')
      } finally {
        this.isLoading = false
      }
    },

    reset() {
      this.userData = { ...this.user }
      this.$refs.observerRef.reset()
    }
  }
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';

.user-form {
  padding-top: 50px;

  .v-input--radio-group__input {
    legend {
      @media #{map-get($display-breakpoints, 'xs-only')} {
        width: 100%;
        margin-bottom: 8px;
      }
    }

    .v-radio {
      @media #{map-get($display-breakpoints, 'sm-and-up')} {
        margin-right: 8px;

        .v-label {
          font-size: 14px;
        }
      }
    }
  }

  .v-input--selection-controls {
    &__input {
      @media #{map-get($display-breakpoints, 'sm-and-up')} {
        margin-right: 2px;
      }
    }

    @media #{map-get($display-breakpoints, 'xs-only')} {
      margin-top: 0;
      padding-top: 0;
    }
  }

  .col-lg-auto {
    @media #{map-get($display-breakpoints, 'lg-and-up')} {
      min-width: 20%;
      max-width: 20%;
    }
  }
}
</style>
