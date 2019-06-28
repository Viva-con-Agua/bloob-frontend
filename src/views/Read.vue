<template>
  <VcAFrame>
    <VcAColumn size="90%">
      <VcABox :expand="true" :title="$t('read.form.category.all')">
        <b-table
          responsive
          striped
          hover
          selectable
          select-mode="single"
          selectedVariant="success"
          :busy="isBusy"
          :fields="fields"
          :items="allMails"
          :primary-key="allMails.id"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
        >
          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <!--<strong>Loading...</strong>-->
          </div>
          <template slot="senderName" slot-scope="row">
            {{ $t("role." + row.item.senderName) }}
          </template>
          <template slot="recipients" slot-scope="row">
            <span v-for="(element, index) in row.item.recipients" :key="element">
            <span v-if="index != 0">, </span><span>{{ element }}</span>
          </span>
          </template>
          <template slot="date" slot-scope="row">
            {{ showDate(row.item.date) }}
          </template>
          <template slot="senderCrew" slot-scope="row">
            {{ row.item.senderCrew.name }}
          </template>
          <template :slot="$t('read.form.label.detail')" slot-scope="row">
            <b-button size="sm" @click="showMail(row.item.id)" class="mr-2">
              {{ $t("read.form.label.detail") }}
            </b-button>
          </template>
        </b-table>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import { mapActions } from "vuex";
import { mapFields, mapMultiRowFields } from "vuex-map-fields";

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
          key: "recipients", //Problem: We have many recievers
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
        },
        this.$i18n.t("read.form.label.detail")
      ],
      sortBy: "date",
      sortDesc: false,
    };
  },
  computed: {
    ...mapMultiRowFields(mailStore, {
      allMails: "mails"
    }),
    ...mapFields(mailStore, {
      isBusy: "busy"
    })
  },
  methods: {
    ...mapActions(mailStore, {
      doResetStateToDefault: "doResetStateToDefault",
      doGetAllMails: "doGetAllMails",
      doShowDetails: "doShowDetails"
    }),
    showDate(date) {
      var newDate = new Date(date);
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return newDate.toLocaleDateString(options);
    },
    showMail(id) {
      // eslint-disable-next-line
        console.log(id);
      this.doShowDetails(id);
      this.$router.push({ name: "detail" });
    }
  },
  beforeMount() {
    this.doGetAllMails()
  }
};
</script>
