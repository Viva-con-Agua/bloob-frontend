<template>
  <div class="compose">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

<!-- TODO: import user search from Drops and save selected recievers -->
      <b-input-group prepend="Username" class="mt-3">
        <b-form-input v-model="reciever_selection"/>
        <b-input-group-append>
        <b-button v-on:click="addMe"> Empfänger hinzufügen</b-button>
        </b-input-group-append>
      </b-input-group>

      <div class="mt-2">Empfänger: {{ form.reciever }}</div>
        
      <b-form-group id="exampleInputGroup1" label="Senden als:" label-for="exampleInput1">
        <b-form-select id="exampleInput1" :options="sender_name" required v-model="form.sender_name" />
      </b-form-group>

      <b-form-group id="exampleInputGroup2" label="Senden von:" label-for="exampleInput2">
        <b-form-select id="exampleInput2" :options="sender_mail" required v-model="form.sender_mail" />
      </b-form-group>

      <b-form-group id="exampleInputGroup3" label="Betreff:" label-for="exampleInput3">
        <b-form-input
          id="exampleInput3"
          type="text"
          v-model="form.subject"
          required
          placeholder="Der Betreff deiner Email" 
        />
      </b-form-group>

      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

<!-- replace with WYSIWYG/Mosaico editor -->
      <b-form-group id="exampleInputGroup5" label="Nachricht:" label-for="exampleInput5"> 
        <b-form-textarea
          id="exampleInput5"
          type="text"
          v-model="form.message"
          required
          placeholder="Deine Nachricht" 
        />
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>

</template>

<script>

// @ is an alias to /src


  export default {
    name: "compose",
    components: {
    },
    data() {
      return {
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
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
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
      addMe: function() {
        this.form.reciever.push(this.reciever_selection)
        this.reciever_selection = ''
      }
    }
  }
</script>
