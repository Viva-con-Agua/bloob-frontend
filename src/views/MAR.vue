<template>
    <VcAFrame title="MAR">
      <VcAColumn size="90%">
        <VcABox :first="true" :expand="true" title="Add">
            <!-- warum wird b-form nicht geladen? -->
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <!-- roleName line -->
                <b-form-group id="roleNameGroup" label="Role Name:" label-for="roleName">
                    <b-form-input
                    id="roleName"
                    type="text"
                    v-model="form.roleName"
                    required
                    placeholder="Der Name der Rolle" 
                    />
                </b-form-group>

                <!-- crewName line -->
                <b-form-group id="crewNameGroup" label="Crew Name:" label-for="crewName">
                    <b-form-input
                    id="crewName"
                    type="text"
                    v-model="form.crewName"
                    required
                    placeholder="Der Name der Crew" 
                    />
                </b-form-group>

                <!-- Email line -->
                <b-form-group id="emailGroup" label="Email:" label-for="email">
                    <b-form-input
                    id="email"
                    type="email"
                    v-model="form.email"
                    required
                    placeholder="Die Email" 
                    />
                </b-form-group>

                <!-- submit button, attached method sends all data to the backend -->
                <b-button type="submit" variant="primary">Submit</b-button>
                <!-- reset button, attacked method resets inputs -->
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </VcABox>
      </VcAColumn>
    </VcAFrame>
</template>

<script>
import axios from "axios";
import { VcAFrame, VcAColumn, VcABox } from 'vca-widget-base'
export default {
    name: 'mar',
    components: { 
    VcAFrame,
    VcAColumn,
    VcABox
    },
    data() {
        return {
            form: {
                roleName: '',
                crewName: '',
                email: ''
            },
            show: true
        }
    },
  methods: {
    onSubmit(evt) {
        // eslint-disable-next-line
        console.log("sending post to backend")
        axios.post('/backend/bloob/create', {
            "id": 1,"roleName": this.form.roleName, "crewName": this.form.crewName, "email": this.form.email
        })
        .then(function (response) {
            // eslint-disable-next-line
            console.log(response);
        })
        .catch(function (error) {
            // eslint-disable-next-line
            console.log(error);
        });
        this.onReset(evt)
    },
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
        this.form.roleName='',
        this.form.crewName='',
        this.form.email=''
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
            this.show = true
        })
    }
  }
}
</script>
