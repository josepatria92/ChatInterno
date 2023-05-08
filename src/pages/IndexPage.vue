<script setup>
import { useAuth } from '@vueuse/firebase/useAuth';
import { db, auth } from '../boot/firebase'
import Access from 'components/Access.vue';
import Message from 'components/Message.vue';

const { isAuthenticated, user } = useAuth(auth)


</script>

<template>
  <q-page class="flex flex-center">
    <Access v-if="!isAuthenticated"/>
    <Message v-if="isAuthenticated"/>
  </q-page>
</template>

