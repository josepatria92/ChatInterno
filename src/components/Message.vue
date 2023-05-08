<script setup>
</script>

<template>
    <div style="width: 100%; max-width: 400px">
    <div class="row justify-end q-gutter-md q-mb-xs"> 
        <q-icon name="edit" color="green" /> 
        <q-icon name="delete" color="red" />
     </div>

        <q-chat-message
        :text="['hey, how are you?']"
        sent
      />
      <q-chat-message
        name="Jane"
        :text="['doing fine, how r you?']"
      />
    </div>
</template>