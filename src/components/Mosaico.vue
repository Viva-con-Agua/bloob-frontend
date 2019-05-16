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
import iFrameResizer from "iframe-resizer/js/iframeResizer";
import { mapGetters, mapActions } from "vuex";

const messageStore = "message";

export default {
  name: "Mosaico",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(messageStore, {
      getMessageData: "getMessageData"
    })
  },
  methods: {
    ...mapActions(messageStore, {
      doUpdateMessageData: "doUpdateMessageData"
    }),
    iFrameLoaded() {
      var that = this; //workaround for "'this' is undefined"
      iFrameResizer(
        {
          log: false,
          heightCalculationMethod: "taggedElement",
          onMessage: function(messageData) {
            if (!messageData.message) {
              return;
            }

            if (messageData.message.messageType !== "MosaicoState") {
              return;
            }

            var mosaicoState = messageData.message.payload;
            that.doUpdateMessageData(mosaicoState);
          }
        },
        "#mosaico-iframe"
      );

      var mosaicoRequestInitMessage = {
        message: {
          messageType: "MosaicoRequestInit",
          payload: this.getMessageData
        }
      };
      document
        .getElementById("mosaico-iframe")
        .iFrameResizer.sendMessage(mosaicoRequestInitMessage);
    }
  }
};
</script>
