<template>
    <VcAFrame title="MAR">
      <VcAColumn size="90%">
        <VcABox :first="true" :expand="true" title="Add">
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
                <!-- reset button, attached method resets inputs -->
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </VcABox>
        <VcABox :expand="true" title="All">
            <b-button variant="primary" @click="getAll()">show AR</b-button>
            <b-table 
                responsive 
                striped 
                hover 
                v-if="show" 
                :fields="fields" 
                :items="all"
                :primary-key="all.id"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
            >
                <template slot="delete" slot-scope="row">
                    <b-button size="sm" @click="deleteAR(row.item.id)" class="mr-2">
                        Delete this row 
                    </b-button>
              </template>
            </b-table>
        </VcABox>
        <VcABox :expand="true" title="Example">
            <p>get all available email addresses for the Roles:ASP and ASP Aktionen with the Crew Berlin</p>
            <b-button variant="primary" @click="getByRole()">get Mail</b-button>
            <!-- eslint-disable-next-line -->
            <li v-for="item in getResponse">
                {{ item }}
            </li>
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
            fields: [
                { key: 'roleName', sortable: true },
                { key: 'crewName', sortable: true },
                { key: 'email', sortable: true },
                'delete'
            ],
            sortBy: 'roleName',
            sortDesc: false,
            all:[],
            show: true,
            getResponse:[]
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
    },
    getAll() {
        var that=this
        axios.get('/backend/bloob/all')
        .then(function (response){
            //put into a form
            //that.all = response
            // eslint-disable-next-line
            console.log(response.data)
            that.all=[]
            for (var i = 0; i < response.data.length; i++)
            {
                // eslint-disable-next-line
                console.log(response.data[i])
                that.all[i] = response.data[i]
            } //that.all = response.data
            // eslint-disable-next-line
            console.log(typeof that.all)
            // eslint-disable-next-line
            console.log(that.all)
            /* Trick to reset/clear native browser form validation state */
            that.show = false
            that.$nextTick(() => {
                that.show = true
            })
        })
        .catch(function (error) {
            // eslint-disable-next-line
            console.log(error);
        });
    },
    deleteAR(id) {
        // eslint-disable-next-line
        console.log("delete "+id)
        var that = this;
        axios.post('backend/bloob/delete',{id})
        .then(function(response){
            // eslint-disable-next-line
            console.log('deleted'+response)
            that.getAll()
        })
        .catch(function (error) {
            // eslint-disable-next-line
            console.log(error);
        });
    },
    getByRole() {
        var that = this
        // eslint-disable-next-line
        console.log("get mails for Roles: ASP, ASP Aktionen, Crews: Berlin ")
        //example request
        axios.post('backend/bloob/get', {
            "roleName":["ASP","ASP Aktionen"],"crewName":"Berlin"
        })
        .then(function(response){
            // eslint-disable-next-line
            console.log('response from server: '+response.data)
            that.getResponse = response.data
        })
        .catch(function (error) {
            // eslint-disable-next-line
            console.log(error);
        });
    }
  }
}
</script>
