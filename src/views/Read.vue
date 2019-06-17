<template>
  <VcAFrame>
    <VcAColumn size="90%">
      <VcABox :expand="true" :title="$t('read.form.category.all')">
    <!--
        <b-button variant="primary" @click="getAll()">{{
          $t("read.form.button.show")
        }}</b-button>
    -->
        <b-table
          responsive
          striped
          hover
          v-if="show"
          :fields="fields"
          :items="allMails"
          :primary-key="all.id"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
        >
          <template slot="senderName" slot-scope="row">
            {{ $t("role." + row.item.senderName) }}
          </template>
          <template slot="date" slot-scope="row">
            {{ showDate(row.item.date) }}
          </template>
        </b-table>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>


<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import { mapActions } from "vuex";
import { mapMultiRowFields } from "vuex-map-fields";

const mailStore = "readMails";

export default {
  name: "read",
  components: {
    VcAFrame,
    VcAColumn,
    VcABox
  },
  data() {
    return {
      // define fields to be displayed in the table
      fields: [
        {
          key: "sender",
          label: this.$i18n.t("read.form.label.sender"),
          sortable: true
        },
        {
          key: "senderName",
          label: this.$i18n.t("read.form.label.senderRoleName"),
          sortable: true
        },
        {
          key: "senderMail",
          label: this.$i18n.t("read.form.label.senderMailAddress"),
          sortable: true
        },
        {
          key: "senderCrew",
          label: this.$i18n.t("read.form.label.senderCrew"),
          sortable: true
        },
        {
          key: "reciever",  //Problem: We have many recievers
          label: this.$i18n.t("read.form.label.reciever"),
          sortable: false
        },
        {
          key: "subject",
          label: this.$i18n.t("read.form.label.subject"),
          sortable: true
        },
        {
          key: "date",
          label: this.$i18n.t("read.form.label.date"),
          sortable: true
        },
        {
          key: "status",
          label: this.$i18n.t("read.form.label.status"),
          sortable: true
        }
      ],
      sortBy: "roleName",
      sortDesc: false,
      show: true,
      all: [
        {"id":1,"sender":"Tom","senderRoleName":"supporter","senderMailAddress":"sup@vca.org","senderCrew": "Berlin","reciever":"Mario","subject":"Neuheiten","date":"07.06.2019","status": "sent"},
        {"id":2,"sender":"Mario","senderRoleName":"employee","senderMailAddress":"emp@vca.org","senderCrew": "Berlin","reciever":["Klaus","Peter","Jürgen"],"subject":"News","date":"08.06.2019","status": "sent"},
        {"id":3,"sender":"Dennis","senderRoleName":"admin","senderMailAddress":"it@vca.org","senderCrew": "Berlin","reciever":"3547 Personen","subject":"Neues Feature","date":"03.03.2018","status": "pending"}
      ]
    };
  },
  computed: {
    ...mapMultiRowFields(mailStore, {
      allMails: "mails"
    })
  },
  methods: {
    ...mapActions(mailStore, {
      doResetStateToDefault: "doResetStateToDefault"
    }),
    ...mapActions(mailStore, {
      doGetAllMails: "doGetAllMails"
    }),
    showDate(date) {
      var newDate = new Date(date);
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return newDate.toLocaleDateString(options)
    }
  },
  beforeMount() {
    this.doResetStateToDefault();
    this.doGetAllMails();
  }
}
</script>
