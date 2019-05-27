<template>
  <VcAFrame title="MARS">
    <VcAColumn size="90%">
      <VcABox
        :first="true"
        :expand="true"
        :title="$t('mars.form.category.add')"
      >
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <!-- roleName line -->
          <b-form-group
            id="roleNameGroup"
            :label="$t('mars.form.label.roleName')"
            label-for="roleName"
          >
            <b-form-select id="roleName" required v-model="formRoleName">
              <!-- Bug: placeholder option is not shown on page load -->
              <option :value="null" disabled>
                {{ $t("mars.form.placeholder.roleName") }}
              </option>
              <option v-for="role in roles" :key="role" :value="role">
                {{ $t("role." + role) }}
              </option>
            </b-form-select>
          </b-form-group>

          <!-- pillar line -->
          <b-form-group
            id="pillarGroup"
            :label="$t('mars.form.label.pillar')"
            label-for="pillar"
            v-if="formRoleName == 'volunteer manager'"
          >
            <b-form-select id="pillar" v-model="formPillar">
              <option value="">
                {{ $t("mars.form.placeholder.pillar") }}
              </option>
              <option v-for="pillar in pillars" :key="pillar" :value="pillar">
                {{ $t("role.pillar." + pillar) }}
              </option>
            </b-form-select>
          </b-form-group>

          <!-- crewName line -->
          <b-form-group
            id="crewNameGroup"
            :label="$t('mars.form.label.crewName')"
            label-for="crewName"
          >
            <b-form-input
              id="crewName"
              type="text"
              v-model="formCrewName"
              :placeholder="$t('mars.form.placeholder.crewName')"
            />
          </b-form-group>

          <!-- Email line -->
          <b-form-group
            id="emailGroup"
            :label="$t('mars.form.label.email')"
            label-for="email"
          >
            <b-form-input
              id="email"
              type="email"
              v-model="formEmail"
              required
              :placeholder="$t('mars.form.label.email')"
            />
          </b-form-group>

          <!-- submit button, attached method sends all data to the backend -->
          <b-button type="submit" variant="primary">{{
            $t("mars.form.button.submit")
          }}</b-button>
          <!-- reset button, attached method resets inputs -->
          <b-button type="reset" variant="danger">{{
            $t("mars.form.button.reset")
          }}</b-button>
        </b-form>
      </VcABox>
      <VcABox :expand="true" :title="$t('mars.form.category.all')">
        <b-button variant="primary" @click="getAll()">{{
          $t("mars.form.button.show")
        }}</b-button>
        <b-table
          responsive
          striped
          hover
          v-if="show"
          :fields="fields"
          :items="allStore"
          :primary-key="allStore.id"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
        >
          <template slot="roleName" slot-scope="row">
            {{ $t("role." + row.item.roleName) }}
          </template>
          <template slot="pillar" slot-scope="row" v-if="row.item.pillar != ''">
            {{ $t("role.pillar." + row.item.pillar) }}
          </template>
          <template :slot="$t('mars.form.label.delete')" slot-scope="row">
            <b-button size="sm" @click="deleteAR(row.item.id)" class="mr-2">
              {{ $t("mars.form.label.delete") }}
            </b-button>
          </template>
        </b-table>
      </VcABox>
      <VcABox :expand="true" title="Example">
        <p>
          get mails for Roles: employee, volunteer manager, Bereich: Bildung
          Crews: Berlin
        </p>
        <b-button variant="primary" @click="getByRole()">get Mail</b-button>
        <!-- eslint-disable-next-line -->
            <li v-for="item in getResponse">
          {{ item }}
        </li>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
import axios from "axios";
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import { mapActions } from "vuex";
import { mapFields, mapMultiRowFields } from "vuex-map-fields";

const mailAccessRightsStore = "mailAccessRights";

export default {
  name: "mar",
  components: {
    VcAFrame,
    VcAColumn,
    VcABox
  },
  data() {
    return {
      roles: ["supporter", "employee", "admin", "volunteer manager"],
      pillars: ["education", "network", "finance", "operation"],
      fields: [
        {
          key: "roleName",
          label: this.$i18n.t("mars.form.label.roleName"),
          sortable: true
        },
        {
          key: "pillar",
          label: this.$i18n.t("mars.form.label.pillar"),
          sortable: true
        },
        {
          key: "crewName",
          label: this.$i18n.t("mars.form.label.crewName"),
          sortable: true
        },
        {
          key: "email",
          label: this.$i18n.t("mars.form.label.email"),
          sortable: true
        },
        this.$i18n.t("mars.form.label.delete")
      ],
      sortBy: "roleName",
      sortDesc: false,
      all: [],
      show: true,
      getResponse: []
    };
  },
  computed: {
    ...mapFields(mailAccessRightsStore, {
      formRoleName: "form.roleName",
      formPillar: "form.pillar",
      formCrewName: "form.crewName",
      formEmail: "form.email"
    }),
    ...mapMultiRowFields(mailAccessRightsStore, {
      allStore: "allAccessRights"
    })
  },
  methods: {
    ...mapActions(mailAccessRightsStore, {
      resetForm: "doResetMailAccessRightsFormToDefault"
    }),
    ...mapActions(mailAccessRightsStore, {
      submitForm: "doSubmitToBackend"
    }),
    ...mapActions(mailAccessRightsStore, {
      getAllAccessRights: "doGetAllAccessRights"
    }),
    ...mapActions(mailAccessRightsStore, {
      deleteAccessRight: "doDeleteAccessRight"
    }),
    resetValidation() {
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onSubmit() {
      this.submitForm();
      this.resetForm();
      this.resetValidation();
    },
    onReset(evt) {
      evt.preventDefault();
      this.resetForm();
      this.resetValidation();
    },
    getAll() {
      this.resetForm();
      this.getAllAccessRights();
      this.resetValidation();
    },
    deleteAR(id) {
      this.deleteAccessRight(id);
      this.getAll();
    },
    getByRole() {
      var that = this;
      // eslint-disable-next-line
        console.log("get mails for Roles: employee, volunteer manager, Bereich: Bildung Crews: Berlin ");
      //example request
      axios
        .post("backend/bloob/get", {
          roleName: ["employee", "volunteer manager"],
          pillar: "education",
          crewName: "Berlin"
        })
        .then(function(response) {
          // eslint-disable-next-line
            console.log('response from server: '+response.data);
          that.getResponse = response.data;
        })
        .catch(function(error) {
          // eslint-disable-next-line
            console.log(error);
        });
    }
  }
};
</script>
