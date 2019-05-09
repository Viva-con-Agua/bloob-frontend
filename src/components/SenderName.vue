<template>
  <div class="senderName">
    <p>
      Betreff:
      <input v-model="messageData" placeholder="..." />
      <!-- <p>Message is: {{ messageData }}</p> -->
    </p>
  </div>
</template>

<script>
export default {
  name: "SenderName"
};
</script>
