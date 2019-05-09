<template>
  <div class="compose">
    <router-view>
      <!-- here the MosaicoModal component will be rendered -->
    </router-view>
    <div class="mt-2">
      {{ $t("compose.form.label.recipients") }} {{ involvedSupporter }}
    </div>

    <!-- TODO: import user search from Drops and save selected recievers
              -> WidgetUserAutocomplete can search in drops user data
              -> Problem i need the right event to recieve a selected user
                @vca-use-selection does not trigger, am i missing something?
              trying multiple fields and event names, searching for the right one
        -->
    <WidgetUserAutocomplete
      :placeholder="$t('compose.form.placeholder.recipients')"
      :preselection="involvedSupporter"
      :SelectableUser="recipients"
      @vca-user-selection="addRecipient"
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
          <option :value="null">{{
            $t("compose.form.placeholder.fromName")
          }}</option>
          <option v-for="role in roles" :key="role.name" :value="role.name">
            {{ role.name }}
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
          <option :value="null">{{
            $t("compose.form.placeholder.fromMail")
          }}</option>
          <option
            v-for="testsender in senderMailTestdata"
            :key="testsender.value"
            :value="testsender.text"
          >
            {{ testsender.text }}
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
          placeholder="Der Betreff deiner Email"
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
import { WidgetUserAutocomplete } from "vca-widget-user";
import Mosaico from "@/components/Mosaico.vue"; // @ is an alias to /src
import "vca-widget-user/dist/vca-widget-user.css";
import { mapActions, mapMutations } from "vuex";
import { mapFields, mapMultiRowFields } from "vuex-map-fields";

const messageStore = "message";
const userStore = "user";

export default {
  name: "compose",
  components: {
    WidgetUserAutocomplete,
    Mosaico
    //  FormItem,
    //  Select,
    //  Option
  },
  data() {
    return {
      involvedSupporter: [],
      senderMailTestdata: [
        {
          text: "noreply@vivaconagua.org",
          value: 1
        },
        { text: "berlin@vivaconagua.org", value: 2 },
        { text: "maxmusterman@vivaconagua.org", value: 3 }
      ],
      // TODO: get user name and role from Drops
      // userRoles: [{ text: 'Select One', value: null }, 'noreply@vivaconagua.org', 'berlin@vivaconagua.org', 'maxmusterman@vivaconagua.org'],
      // TODO: get user role from Drops and check access rights to mail adresses
      show: true
    };
  },
  computed: {
    ...mapFields(messageStore, {
      subject: "subject",
      senderName: "senderName",
      senderMail: "senderMail"
    }),
    ...mapFields(userStore, {
      roles: "user.roles"
    }),
    ...mapMultiRowFields(messageStore, {
      recipients: "recipients"
    })
  },
  methods: {
    ...mapActions(messageStore, {
      doResetMessageStateToDefault: "doResetMessageStateToDefault"
    }),
    ...mapMutations(messageStore, {
      addRecipient: "addRecipient"
    }),
    onSubmit() {
      this.doResetMessageStateToDefault();
    }
  }
};
</script>
