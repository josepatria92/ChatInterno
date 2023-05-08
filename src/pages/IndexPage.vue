<script setup>
import { useAuth } from '@vueuse/firebase/useAuth';
import { db, auth } from '../boot/firebase'

const { isAuthenticated, user } = useAuth(auth)


</script>

<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

