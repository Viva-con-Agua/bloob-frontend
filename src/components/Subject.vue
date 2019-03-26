<template>
    <div class="subject">
        <p> Betreff: 
        <input v-model="message" placeholder="...">
        <!-- <p>Message is: {{ message }}</p> -->
        </p>
    </div>
</template>

<script>
export default {
    name: "Subject"
}
</script>
