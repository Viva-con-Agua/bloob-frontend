<template>
  <div class="compose">
      <div class="mt-2">Empfänger: {{ form.reciever }}</div>

<!-- TODO: import user search from Drops and save selected recievers 
      -> WidgetUserAutocomplete can search in drops user data
      -> Problem i need the right event to recieve a selected user
        @vca-use-selection does not trigger, am i missing something?
-->
    <WidgetUserAutocomplete
      :placeholder="$t('donation.placeholder.involved.indicator')"
      :preselection="involvedSupporter"
      :SelectableUser="form.reciever"
      @SelectableUser="callMe"
      @selected="callMe"
      @hasUser="callMe"
      @vca-user-selection="selectSupporter"
/>
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
      <b-form-group id="senderNameGroup" label="Senden als:" label-for="senderName">
        <b-form-select id="senderName" :options="sender_name" required v-model="form.sender_name" />
      </b-form-group>

      <!-- present sender mail selection -->
      <b-form-group id="senderMailGroup" label="Senden von:" label-for="senderMail">
        <b-form-select id="senderMail" :options="sender_mail" required v-model="form.sender_mail" />
      </b-form-group>

      <!-- subject line -->
      <b-form-group id="subjectLineGroup" label="Betreff:" label-for="subjectLine">
        <b-form-input
          id="subjectLine"
          type="text"
          v-model="form.subject"
          required
          placeholder="Der Betreff deiner Email" 
        />
      </b-form-group>

      <!-- 2 example checkmarks -->
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

<!-- replace with WYSIWYG/Mosaico editor -->
<!--
      <b-form-group id="messageEditor" label="Nachricht:" label-for="messageEditor"> 
        <b-form-textarea
          id="messageEditor"
          type="text"
          v-model="form.message"
          required
          placeholder="Deine Nachricht" 
        />
      </b-form-group>
-->
<!-- using a simple WYSIWYG editor -->
      <wysiwyg v-model="form.message"/>

      <!-- sample submit button, attached method outputs all data as an alert -->
      <b-button type="submit" variant="primary">Submit</b-button>
      <!-- sample reset button, attacked method resets inputs -->
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>

</template>

<script>

//import { FormItem, Select, Option } from 'element-ui'
import { WidgetUserAutocomplete } from 'vca-widget-user'
import 'vca-widget-user/dist/vca-widget-user.css'
//import { Mosaico } from 'mosaico'

// @ is an alias to /src


export default {
  name: "compose",
  components: {
    WidgetUserAutocomplete,
  //  FormItem,
  //  Select,
  //  Option
  },
  data() {
    return {
      involvedSupporter: [],
      reciever_selection: '',
      form: {
        reciever: [],
        sender_name: null,
        sender_mail: null,
        subject: '',
        message: '',
        checked: []
      },
      sender_name: [{ text: 'Select One', value: null }, 'Max Musterman', 'ASP Aktionen'],
      // TODO: get user name and role from Drops
      sender_mail: [{ text: 'Select One', value: null }, 'noreply@vivaconagua.org', 'berlin@vivaconagua.org', 'maxmusterman@vivaconagua.org'],
      // TODO: get user role from Drops and check access rights to mail adresses
      show: true
    }
  },
  methods: {
    // take all data in form, and output as alert
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    //reset all data in form
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.checked = []
      this.form.reciever = []
      this.form.sender_name = null
      this.form.sender_mail = null
      this.form.subject = ''
      this.form.message = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    //take data from manual reciever input (no longer in use) and append it to the reciever list 
    addMe: function() {
      this.form.reciever.push(this.reciever_selection)
      this.reciever_selection = ''
    },
    //handle user selection from WidgetUserAutocomplete @vca-user-selection
    selectSupporter(supporter) {
      this.form.reciever = supporter
      alert(JSON.stringify(supporter))
    },
    // send an alert
    callMe: function() {
      alert("hello")
    }
  }
}

</script>
