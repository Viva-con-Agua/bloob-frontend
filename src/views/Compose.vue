<template>
  <div class="compose">
    <router-view>
      <!-- here the MosaicoModal component will be rendered -->
    </router-view>
    <div class="mt-2">
      {{ $t("compose.form.label.recipients") }} {{ involvedSupporter }}
    </div>

    <WidgetAutocompleteMultiQuery
      id="recipients-input"
      :placeholder="$t('compose.form.placeholder.recipients')"
      :preselection="involvedSupporter"
      @vca-autocomplete-multiquery-selection="addRecipients"
    />

    <b-form
      @submit.prevent="onSubmit"
      @reset="doResetMessageStateToDefault"
      v-if="show"
    >
      <!-- present sender name selection -->
      <b-form-group
        id="sender-name-group"
        :label="$t('compose.form.label.fromName')"
        label-for="sender-name"
      >
        <b-form-select id="sender-name" required v-model="senderName">
          <option :value="null" disabled>{{
            $t("compose.form.placeholder.fromName")
          }}</option>
          <option v-for="role in roles" :key="role.name" :value="role.name">
            {{ $t("role." + role.name) }}
          </option>
        </b-form-select>
      </b-form-group>

      <!-- present sender mail selection -->
      <b-form-group
        id="sender-mail-group"
        :label="$t('compose.form.label.fromMail')"
        label-for="sender-mail"
      >
        <b-form-select id="sender-mail" required v-model="senderMail">
          <option :value="null" disabled>{{
            $t("compose.form.placeholder.fromMail")
          }}</option>
          <option
            v-for="sender in availableEmails"
            :key="sender.mail"
            :value="sender.mail"
          >
            {{ sender.mail }}
          </option>
        </b-form-select>
      </b-form-group>

      <!--      &lt;!&ndash; subject line &ndash;&gt;-->
      <b-form-group
        id="subject-line-group"
        :label="$t('compose.form.label.subject')"
        label-for="subjectLine"
      >
        <b-form-input
          id="subject-line"
          type="text"
          v-model="subject"
          required
          :placeholder="$t('compose.form.placeholder.subject')"
        />
      </b-form-group>

      <!--      &lt;!&ndash; 2 example checkmarks &ndash;&gt;-->
      <!--      <b-form-group id="exampleGroup4">-->
      <!--        <b-form-checkbox-group v-model="hecked" id="exampleChecks">-->
      <!--          <b-form-checkbox value="me">Check me out</b-form-checkbox>-->
      <!--          <b-form-checkbox value="that">Check that out</b-form-checkbox>-->
      <!--        </b-form-checkbox-group>-->
      <!--      </b-form-group>-->

      <div id="mail-body">
        <mosaico></mosaico>
      </div>
      <b-button type="submit" variant="primary">{{
        $t("compose.form.button.submit")
      }}</b-button>
      <b-button type="reset" variant="danger">{{
        $t("compose.form.button.reset")
      }}</b-button>
    </b-form>
  </div>
</template>

<script>
//import { FormItem, Select, Option } from 'element-ui'
import { WidgetAutocompleteMultiQuery } from "vca-widget-user";
import Mosaico from "@/components/Mosaico.vue"; // @ is an alias to /src
import "vca-widget-user/dist/vca-widget-user.css";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { mapFields, mapMultiRowFields } from "vuex-map-fields";

const messageStore = "message";
const userStore = "user";

export default {
  name: "compose",
  components: {
    WidgetAutocompleteMultiQuery,
    Mosaico
    //  FormItem,
    //  Select,
    //  Option
  },
  data() {
    return {
      involvedSupporter: [],
      // TODO: get user name from Drops
      show: true
    };
  },
  computed: {
    ...mapGetters(messageStore, {
     getRecipients: "getRecipients"
   }),
    ...mapFields(messageStore, {
      subject: "subject",
      senderName: "senderName",
      senderMail: "senderMail"
    }),
    ...mapFields(userStore, {
      roles: "user.roles"
    }),/*
    ...mapMultiRowFields(messageStore, {
      recipients: "recipients"
    }),*/
    ...mapMultiRowFields(userStore, {
      availableEmails: "user.mails"
    })
  },
  methods: {
    ...mapActions(messageStore, {
      doResetMessageStateToDefault: "doResetMessageStateToDefault"
    }),
    ...mapActions(userStore, {
      getMails: "getMails"
    }),
    ...mapActions(messageStore, {
      doSubmitToBackend: "doSubmitToBackend"
    }),
    ...mapMutations(messageStore, {
      addRecipients: "addRecipients"
    }),
    onSubmit() {
      this.doSubmitToBackend();
      this.doResetMessageStateToDefault();
    }
  },
  beforeMount() {
    this.getMails();
  }
};
</script>
