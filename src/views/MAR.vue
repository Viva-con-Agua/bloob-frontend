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
            v-if="form.roleName == 'volunteer manager'"
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
              v-model="form.email"
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
          :items="all"
          :primary-key="all.id"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
        >
          <!--
                <template slot="roleName" slot-scope="row" >
                    <div v-if='(row.item.pillar == "")'>
                    {{$t("role."+row.item.roleName)}}
                    </div>
                    <div v-else >
                    {{$t("role."+row.item.roleName)}} - {{$t("role.pillar."+row.item.pillar)}}
                    </div>
                </template>
                -->
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
import { mapFields } from "vuex-map-fields";

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
      form: {
        roleName: "",
        pillar: "",
        crewName: "",
        email: ""
      },
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
      formCrewName: "form.crewName"
    })
  },
  methods: {
    onSubmit(evt) {
      // eslint-disable-next-line
        console.log("sending post to backend")
      axios
        .post("/backend/bloob/create", {
          id: 1,
          roleName: this.form.roleName,
          pillar:
            this.form.roleName == "volunteer manager" ? this.form.pillar : "",
          crewName: this.form.crewName,
          email: this.form.email
        })
        .then(function(response) {
          // eslint-disable-next-line
            console.log(response);
        })
        .catch(function(error) {
          // eslint-disable-next-line
            console.log(error);
        });
      this.onReset(evt);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      (this.form.roleName = ""),
        (this.form.crewName = ""),
        (this.form.email = "");
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getAll() {
      var that = this;
      axios
        .get("/backend/bloob/all")
        .then(function(response) {
          //put into a form
          //that.all = response
          // eslint-disable-next-line
            console.log(response.data)
          that.all = [];
          for (var i = 0; i < response.data.length; i++) {
            // eslint-disable-next-line
                console.log(response.data[i])
            that.all[i] = response.data[i];
          } //that.all = response.data
          // eslint-disable-next-line
            console.log(typeof that.all)
          // eslint-disable-next-line
            console.log(that.all)
          /* Trick to reset/clear native browser form validation state */
          that.show = false;
          that.$nextTick(() => {
            that.show = true;
          });
        })
        .catch(function(error) {
          // eslint-disable-next-line
            console.log(error);
        });
    },
    deleteAR(id) {
      // eslint-disable-next-line
        console.log("delete "+id);
      var that = this;
      axios
        .post("backend/bloob/delete", { id })
        .then(function(response) {
          // eslint-disable-next-line
            console.log('deleted'+response)
          that.getAll();
        })
        .catch(function(error) {
          // eslint-disable-next-line
            console.log(error);
        });
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
