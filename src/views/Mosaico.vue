<template>
    <modal>
        <div>
            <iframe
                    id="iframe"
                    src="http://localhost:9006/index.html"
                    style="min-width: 100%; border: none;"
                    scrolling="no"
                    @load="iframeLoaded"
            />
        </div>
        <button @click="$router.go(-1)">close</button>
    </modal>
</template>
<!-- TODO: get source of mosaico from a config file -->

<script>
  import iFrameResize from 'iframe-resizer/js/iframeResizer'

  export default {
    name: 'mosaico',

    data() {
      return {
        source: '',
        mailBody: ''
      }
    },

    methods: {
      iframeLoaded() {
        //workaround for "'this' is undefined"
        var that = this;
        iFrameResize({
          log: false,
          heightCalculationMethod: 'taggedElement',
          // 'taggedElement' searches for the lowest Element with the 'data-iframe-height' tag to set iframe height
          //
          // default, 'bodyScroll', 'documentElementOffset'
          // work on index but have 0 height in editor
          //
          // 'max', 'documentElementScroll' only show top bar and flicker
          // 'grow' only stops iframe from shrinking
          // 'lowestElement' adds a lot of dead space on index
          //  and is very large on the editor, but no dead space
          enablePublicMethods: true, // Enable methods within iframe hosted page

          messageCallback: function (messageData) { // Callback fn when messageData is received
            //alert(messageData.messageData);
            //this is undefined in this context
            //that.mailBody=messageData.messageData;
            //commit data to vuex store
            that.$store.commit('messageData', messageData.messageData);
          },
        }, '#iframe')
      }
    }
  }
</script>
