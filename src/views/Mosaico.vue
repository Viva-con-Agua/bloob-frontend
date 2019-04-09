<template>
    <div>
        <iframe
            id="iframe"
            src="http://localhost:9006/index.html"
            style="min-width: 100%; border: none;"
            scrolling="no"
            @load="iframeLoaded"
        />
    </div>
</template>
<!-- TODO: get source of mosaico from a config file -->

<script>
import iFrameResize from 'iframe-resizer/js/iframeResizer'

export default {
  name: 'mosaico',

  data () {
    return {
      source: ''
    }
  },

  methods: {
    iframeLoaded () {
      iFrameResize({
        log: true,
        heightCalculationMethod: 'taggedElement',
        // 'taggedElement' searches for the lowest Element with a certain tag to set iframe height
        // default, 'bodyScroll', 'documentElementOffset' 
        // work on index but have 0 height in editor
        //
        // 'max', 'documentElementScroll' only show top bar and flicker
        // 'grow' only stops iframe from shrinking
        // 'lowestElement' adds a lot of dead space on index 
        //  and sizes very large on the editor, but no dead space
        enablePublicMethods: true, // Enable methods within iframe hosted page
        messageCallback         : function(messageData){ // Callback fn when message is received
					
					alert(messageData.message);
				},
      }, '#iframe')
    }
  }
}
</script>
