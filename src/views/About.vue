<template>
  <div class="about">
    <p>This is WidgetUserList</p>
    <WidgetUserList/>
    <p>This is WidgetUserAutocomplete</p>
    <WidgetUserAutocomplete
      @vca-user-selection="selectSupporter"
    />
  </div>
</template>

<script>
import { WidgetUserList, WidgetUserAutocomplete } from 'vca-widget-user'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vca-widget-user/dist/vca-widget-user.css'

export default {
  name: 'about',
  components: { 
    WidgetUserList,
    WidgetUserAutocomplete},
  data () {
    return { 
      involvedSupporter: [],
      options: {
        'type': { 'menue': true, 'value': 'table' },
        'sorting': { 'menue': { 'field': 'Supporter_firstName', 'dir': 'ASC' } },
        'lang': 'de'
    } }
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