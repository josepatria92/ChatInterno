<script setup>
</script>

<template>
    <div style="width: 100%; max-width: 400px">
        <q-chat-message
        name="me"
        :text="['hey, how are you?']"
        sent
      />
      <q-chat-message
        name="Jane"
        :text="['doing fine, how r you?']"
      />
    </div>
</template>