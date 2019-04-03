<template>
  
    <VcAFrame title="About">
      <VcAColumn>
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
    </VcAColumn>
    <br>
    <br>
    <VcABox title="Editor">
    <p>Here be the editor</p>
    <wysiwyg v-model="myHTML"/>
    </VcABox>
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
    return { 
      myHTML:'',
      involvedSupporter: [],
      options: {
        'type': { 'menue': true, 'value': 'table' },
        'sorting': { 'menue': { 'field': 'Supporter_firstName', 'dir': 'ASC' } },
        'lang': 'de'
      },
      
    }
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