<template>
  <div class="compose">
      <div class="mt-2">Empfänger: {{ involvedSupporter }}</div>

<!-- TODO: import user search from Drops and save selected recievers
      -> WidgetUserAutocomplete can search in drops user data
      -> Problem i need the right event to recieve a selected user
        @vca-use-selection does not trigger, am i missing something?
      trying multiple fields and event names, searching for the right one
-->
    <WidgetUserAutocomplete
      :placeholder="$t('donation.placeholder.involved.indicator')"
      :preselection="involvedSupporter"
      :SelectableUser="recipients"
      @vca-user-selection="addRecipient"
/>
    <b-form @submit.prevent="onSubmit" @reset="resetMessageStateToDefault" v-if="show">
      <!-- present sender name selection -->
      <b-form-group id="sender-name-group" label="Senden als:" label-for="senderName">
        <b-form-select id="sender-name" :options="senderNameTestdata" required v-model="senderName" />
      </b-form-group>

      <!-- present sender mail selection -->
      <b-form-group id="sender-mail-group" label="Senden von:" label-for="senderMail">
        <b-form-select id="sender-mail" :options="senderMailTestdata" required v-model="senderMail" />
      </b-form-group>

<!--      &lt;!&ndash; subject line &ndash;&gt;-->
      <b-form-group id="subject-line-group" label="Betreff:" label-for="subjectLine">
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

      <!-- replace with WYSIWYG/Mosaico editor -->

      <!-- using a simple WYSIWYG editor -->
      <wysiwyg v-model="messageBody"></wysiwyg>

      <!-- sample submit button, attached method outputs all data as an alert -->
      <b-button type="submit" variant="primary">Submit</b-button>
      <!-- sample reset button, attacked method resets inputs -->
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

//import { FormItem, Select, Option } from 'element-ui'
import { WidgetUserAutocomplete } from "vca-widget-user";
import "vca-widget-user/dist/vca-widget-user.css";
import { mapActions, mapMutations } from "vuex";
import { createHelpers } from "vuex-map-fields";

const storeModule = "message";
const { mapFields, mapMultiRowFields } = createHelpers({
  getterType: storeModule + "/getField",
  mutationType: storeModule + "/updateField"
});

//import { Mosaico } from 'mosaico'

// @ is an alias to /src

export default {
  name: "compose",
  components: {
    WidgetUserAutocomplete
    //  FormItem,
    //  Select,
    //  Option
  },
  data() {
    return {
      involvedSupporter: [],
      senderNameTestdata: [{ text: 'Select One', value: null }, 'Max Musterman', 'ASP Aktionen'],
      // TODO: get user name and role from Drops
      senderMailTestdata: [{ text: 'Select One', value: null }, 'noreply@vivaconagua.org', 'berlin@vivaconagua.org', 'maxmusterman@vivaconagua.org'],
      // TODO: get user role from Drops and check access rights to mail adresses
      show: true
    };
  },
  computed: {
    ...mapFields({
      subject: "subject",
      senderName: "senderName",
      senderMail: "senderMail",
      messageBody: "body"
    }),
    ...mapMultiRowFields({
      recipients : "recipients"
    })
  },
  methods: {
    ...mapActions(storeModule, {
      resetMessageStateToDefault: "resetMessageState"
    }),
    ...mapMutations(storeModule, {
      addRecipient: "addRecipient"
    }),
    onSubmit() {
      alert("Submitted.");
      this.resetMessageStateToDefault();
    }
  },
}

</script>
