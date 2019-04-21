<template>
  <div class="compose">
      <div class="mt-2">Empfänger: {{ to }}</div>

<!-- TODO: import user search from Drops and save selected recievers
      -> WidgetUserAutocomplete can search in drops user data
      -> Problem i need the right event to recieve a selected user
        @vca-use-selection does not trigger, am i missing something?
      trying multiple fields and event names, searching for the right one
-->
    <WidgetUserAutocomplete
      :placeholder="$t('donation.placeholder.involved.indicator')"
      :preselection="involvedSupporter"
      :SelectableUser="to"
      @vca-user-selection="selectSupporter"
/>
<!-- manual receiver selection -->
<!--
      <b-input-group prepend="Username" class="mt-3">
        <b-form-input v-model="receiverSelection"/>
        <b-input-group-append>
        <b-button v-on:click="addMe"> Empfänger hinzufügen</b-button>
        </b-input-group-append>
      </b-input-group>
-->
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
import { mapActions } from "vuex";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "message/getField",
  mutationType: "message/updateField"
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
      receiverSelection: '',
      senderNameTestdata: [{ text: 'Select One', value: null }, 'Max Musterman', 'ASP Aktionen'],
      // TODO: get user name and role from Drops
      senderMailTestdata: [{ text: 'Select One', value: null }, 'noreply@vivaconagua.org', 'berlin@vivaconagua.org', 'maxmusterman@vivaconagua.org'],
      // TODO: get user role from Drops and check access rights to mail adresses
      show: true
    };
  },
  computed: {
    ...mapFields({
      to: "to",
      subject: "subject",
      senderName: "senderName",
      senderMail: "senderMail",
      messageBody: "body"
    })
  },
  methods: {
    ...mapActions("message", {
      resetMessageStateToDefault: "resetMessageState"
    }),
    // take all data in form, and output as alert
    onSubmit(evt) {
      alert("Submitted.");
      this.resetMessageStateToDefault();
    },
    //take data from manual receiver input (no longer in use) and append it to the receiver list
    addMe: function() {
      this.to.push(this.receiverSelection)
      this.receiverSelection = ''
    },
    //handle user selection from WidgetUserAutocomplete @vca-user-selection
    selectSupporter(supporter) {
      this.to = supporter
      alert(JSON.stringify(supporter))
    }
  },
}

</script>
