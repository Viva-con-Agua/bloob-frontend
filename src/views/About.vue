<template>
  <!-- a view for experimentation -->
    <VcAFrame title="About">
      <VcAColumn size="90%">
        <VcABox :first="true" :expand="true" title="WidgetUserList">
    <p>This is WidgetUserList</p>
    <WidgetUserList/>
    </VcABox>
    <br>
    <VcABox :first="false" :expand="true" title="WidgetUserAutocomplete">
    <p>This is WidgetUserAutocomplete</p>
    <WidgetUserAutocomplete
      @vca-user-selection="selectSupporter"
    />
    </VcABox>
    
    <br>
    <br>
    <VcABox title="Editor">
    <p>Here be the editor</p>
    <wysiwyg v-model="myHTML"/>
    </VcABox>
    </VcAColumn>
    </VcAFrame>
  
</template>

<script>
import { WidgetUserList, WidgetUserAutocomplete } from 'vca-widget-user'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vca-widget-user/dist/vca-widget-user.css'
import { VcAFrame, VcAColumn, VcABox } from 'vca-widget-base'

export default {
  name: 'about',
  components: { 
    WidgetUserList,
    WidgetUserAutocomplete,
    VcAFrame,
    VcAColumn,
    VcABox
    },
  data () {
    var sources = []
    var received = Date.now()
    var involvedSupporter = []
    if(typeof this.value !== "undefined" && this.value !== null) {
      if(this.value.hasOwnProperty("sources")) {
        sources = this.value.sources
      }
      if(this.value.hasOwnProperty("received")) {
        received = this.value.received
      }
      if(this.value.hasOwnProperty("involvedSupporter")) {
        involvedSupporter = this.value.involvedSupporter
      }
    }
    return { 
      "involvedSupporter": involvedSupporter,
      "received": received,
      "sources": sources,
      myHTML:'',
      options: {
        'type': { 'menue': true, 'value': 'table' },
        'sorting': { 'menue': { 'field': 'Supporter_firstName', 'dir': 'ASC' } },
        'lang': 'de'
      },
      
    }
  },
  created () {
    if(typeof this.value !== "undefined" && this.value !== null) {
      if(this.value.hasOwnProperty("received")) {
        this.received = this.value.received
      }
      if(this.value.hasOwnProperty("sources")) {
        this.sources = this.value.sources
      }
      if(this.value.hasOwnProperty("involvedSupporter")) {
        this.involvedSupporter = this.value.involvedSupporter
      }
    }
    this.commit()
  },
  methods: {
    selectSupporter(supporter) {
      this.involvedSupporter = supporter
      alert(JSON.stringify(this.involvedSupporter))
    },
    setQuery: function(event) {
      if(event.state === "success") {
        this.query = event
        this.getCount()
        this.getPage()
      }
    }
  }
}
</script>