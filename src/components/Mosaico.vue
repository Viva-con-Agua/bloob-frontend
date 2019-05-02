<template>
  <div>
    <iframe
      id="mosaico-iframe"
      src="http://localhost:9006/editor.html"
      style="min-width: 100%; border: none;"
      scrolling="no"
      @load="iFrameLoaded"
    ></iframe>
  </div>
</template>

<script>
import iFrameResize from "iframe-resizer/js/iframeResizer";
import { mapState, mapActions } from "vuex";

const messageStore = "message";

export default {
  name: "Mosaico",
  data() {
    return {};
  },
  computed: {
    ...mapState(messageStore, {
      mosaicoMessageData: "messageBody"
    })
  },
  methods: {
    ...mapActions(messageStore, {
      doUpdateMessageBody: "doUpdateMessageBody"
    }),
    iFrameLoaded() {
      //workaround for "'this' is undefined"
      var that = this;
      iFrameResize(
        {
          log: false,
          heightCalculationMethod: "taggedElement",
          onMessage: function(messageData) {
            if (!messageData.message) {
              console.error("Message property missing in messageData object.");
              return;
            }

            if (messageData.message.messageType != "MosaicoState") {
              console.log("MessageType property missing in messageData.message object.");
              return;
            }

            var mosaicoState = messageData.message.messageBody;
            that.doUpdateMessageBody(mosaicoState);
            alert(mosaicoState.jsonData);
          }
        },
        "#mosaico-iframe"
      );
    }
  }
};
</script>
