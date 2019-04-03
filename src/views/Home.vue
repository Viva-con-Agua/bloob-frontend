<template>
  <!-- VcAFrame is the root element, can only have 1 VcAFrame?-->
  <VcAFrame title="Home">
    <!--VcAColum defines a column, can use size="x%" to define width -->
    <VcAColumn>
      <!-- VcABox defines a box that holds some content, 
      can have a title <title="some Name"> 
      has the options:
        <:first="true"> that does ???
        <:expand="true"> that does ???
      -->
      <VcABox :first="true" title="Logo">
        <img alt="Vue logo" src="../assets/logo.png">
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox :first="true" title="Welcome">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { VcAFrame, VcAColumn, VcABox } from 'vca-widget-base'
import 'vca-widget-base/dist/vca-widget-base.css'

export default {
  name: 'home',
  // all importet components have to be registered
  components: {
    HelloWorld, VcAFrame, VcAColumn, VcABox
  }
}
</script>
