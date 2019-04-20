<template>
  <div class="compose">
      <div class="mt-2">Empfänger: {{ form.receiver }}</div>

<!-- TODO: import user search from Drops and save selected recievers
      -> WidgetUserAutocomplete can search in drops user data
      -> Problem i need the right event to recieve a selected user
        @vca-use-selection does not trigger, am i missing something?
      trying multiple fields and event names, searching for the right one
-->
    <WidgetUserAutocomplete
      :placeholder="$t('donation.placeholder.involved.indicator')"
      :preselection="involvedSupporter"
      :SelectableUser="form.reciever"
      @vca-user-selection="selectSupporter"
/>
<!-- manual receiver selection -->
<!--
      <b-input-group prepend="Username" class="mt-3">
        <b-form-input v-model="reciever_selection"/>
        <b-input-group-append>
        <b-button v-on:click="addMe"> Empfänger hinzufügen</b-button>
        </b-input-group-append>
      </b-input-group>
-->
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <!-- present sender name selection -->
<!--      <b-form-group id="sender-name-group" label="Senden als:" label-for="senderName">-->
<!--        <b-form-select id="sender-name" :options="senderName" required v-model="form.senderName" />-->
<!--      </b-form-group>-->

      <!-- present sender mail selection -->
<!--      <b-form-group id="sender-mail-group" label="Senden von:" label-for="senderMail">-->
<!--        <b-form-select id="sender-mail" :options="senderMail" required v-model="form.senderMail" />-->
<!--      </b-form-group>-->

<!--      &lt;!&ndash; subject line &ndash;&gt;-->
      <b-form-group id="subject-line-group" label="Betreff:" label-for="subjectLine">
        <b-form-input
          id="subject-line"
          type="text"
          v-model="form.subject"
          required
          placeholder="Der Betreff deiner Email"
        />
      </b-form-group>

<!--      &lt;!&ndash; 2 example checkmarks &ndash;&gt;-->
<!--      <b-form-group id="exampleGroup4">-->
<!--        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">-->
<!--          <b-form-checkbox value="me">Check me out</b-form-checkbox>-->
<!--          <b-form-checkbox value="that">Check that out</b-form-checkbox>-->
<!--        </b-form-checkbox-group>-->
<!--      </b-form-group>-->

      <!-- replace with WYSIWYG/Mosaico editor -->

      <!-- using a simple WYSIWYG editor -->
      <wysiwyg v-model="form.messageData"></wysiwyg>

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

import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: 'module/message/getField',
  mutationType: 'module/message/updateField',
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
      reciever_selection: '',
      form: {
        receiver: [],
        senderName: "null",
        senderMail: null,
        subject: "",
        messageData: '',
        checked: []
      },
      senderName: [{ text: 'Select One', value: null }, 'Max Musterman', 'ASP Aktionen'],
      // TODO: get user name and role from Drops
      senderMail: [{ text: 'Select One', value: null }, 'noreply@vivaconagua.org', 'berlin@vivaconagua.org', 'maxmusterman@vivaconagua.org'],
      // TODO: get user role from Drops and check access rights to mail adresses
      show: true
    }
  },
  computed: {
    ...mapFields({
      form.subject: "subject"
    })
  },
  methods: {
    // take all data in form, and output as alert
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
      // commit data to vuex store
      // this.$store.commit("subject", this.form.subject);
      // this.$store.commit('sender_mail', this.form.senderMail);
      // this.$store.commit('senderName', this.form.senderName);
      // this.$store.commit('SetReciever', this.form.reciever);
    },
    //reset all data in form
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.checked = []
      this.form.receiver = []
      this.form.senderName = null
      this.form.sender_mail = null
      this.form.subject = ''
      this.form.messageData = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    //take data from manual receiver input (no longer in use) and append it to the receiver list
    addMe: function() {
      this.form.reciever.push(this.reciever_selection)
      this.reciever_selection = ''
    },
    //handle user selection from WidgetUserAutocomplete @vca-user-selection
    selectSupporter(supporter) {
      this.form.receiver = supporter
      alert(JSON.stringify(supporter))
    }
  },
}

</script>
