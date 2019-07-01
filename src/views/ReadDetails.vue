<template>
  <VcAFrame>
    <VcAColumn size="90%">
      <VcABox :expand="true" :title="$t('read.form.category.detail')">
        <b-list-group>
        <b-list-group-item>
          mail id: {{ allMails.find(x => x.id === details).id }}
        </b-list-group-item>
        <b-list-group-item>
          sender id: {{ allMails.find(x => x.id === details).senderUUID }}
        </b-list-group-item>
        <b-list-group-item>
          {{ $t("read.form.label.senderRoleName")}}: {{ allMails.find(x => x.id === details).senderName }}
        </b-list-group-item>
        <b-list-group-item>
          {{ $t("read.form.label.senderMailAddress")}}: {{ allMails.find(x => x.id === details).senderMail }}
        </b-list-group-item>
        <b-list-group-item>
          sender crew name: {{ allMails.find(x => x.id === details).senderCrew.name }}
        </b-list-group-item>
        <b-list-group-item>
          {{ $t("read.form.label.reciever")}}: 
          <span v-for="(element, index) in allMails.find(x => x.id === details).recipients" :key="element">
            <span v-if="index != 0">, </span><span>{{ element }}</span>
          </span>
        </b-list-group-item>
        <b-list-group-item>
          {{ $t("read.form.label.subject")}}: {{ allMails.find(x => x.id === details).subject }}
        </b-list-group-item>
        <b-list-group-item>
          {{ $t("read.form.label.status")}}: {{ allMails.find(x => x.id === details).status }}
        </b-list-group-item>
        <b-list-group-item>
          {{ $t("read.form.label.date")}}: {{ showDate(allMails.find(x => x.id === details).date) }}
        </b-list-group-item>
        <b-list-group-item>
          message: {{ allMails.find(x => x.id === details).messageData }}
        </b-list-group-item>
        </b-list-group>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
//import { mapActions } from "vuex";
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
      show: true
    };
  },
  computed: {
    ...mapMultiRowFields(mailStore, {
      allMails: "mails"
    }),
    ...mapFields(mailStore, {
      details: "details"
    })
  },
  methods: {
    showDate(date) {
      var newDate = new Date(date);
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return newDate.toLocaleDateString(options);
    }
  },
  beforeMount() {}
};
</script>
