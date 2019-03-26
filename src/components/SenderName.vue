<template>
    <div class="senderName">
        <p> Betreff: 
        <input v-model="message" placeholder="...">
        <!-- <p>Message is: {{ message }}</p> -->
        </p>
    </div>
</template>

<script>
export default {
    name: "SenderName"
}
</script>
