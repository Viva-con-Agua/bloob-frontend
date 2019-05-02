<template>
  <div>
    <iframe
      id="mosaico-iframe"
      src="http://localhost:9006/index.html"
      style="min-width: 100%; border: none;"
      scrolling="no"
      @load="iFrameLoaded"
    ></iframe>
  </div>
</template>

<script>
import iFrameResize from "iframe-resizer/js/iframeResizer";

export default {
  name: "Mosaico",
  data() {
    return {};
  },

  methods: {
    handleClose() {
      this.$router.go(-1);
    },
    iFrameLoaded() {
      //workaround for "'this' is undefined" var that = this;
      iFrameResize(
        {
          log: false,
          heightCalculationMethod: "taggedElement",
          onMessage: function(messageData) {
            // Callback fn when message is received
            alert(messageData.message);
          }
        },
        "#mosaico-iframe"
      );
    }
  }
};
</script>
