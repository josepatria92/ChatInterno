<script setup>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import { useAuth } from '@vueuse/firebase/useAuth';
import { db, auth } from '../boot/firebase'

const { isAuthenticated, user } = useAuth(auth)


/**
 * Quasar Const
 */
const $q = useQuasar()

/**
 * Drawer open
 */
const leftDrawerOpen = ref(false)

/**
 * Screen height
 */
const style = computed(() => ({
  height: $q.screen.height + 'px'
}))


</script>


<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated v-if="isAuthenticated">
        <q-toolbar class="bg-grey-3 text-black" >
          <span class="q-subtitle-1 q-pl-md">
            Nombre de Usuario 
          </span>
          <q-space />
          <q-btn color="primary" flat label="Log Out"/>
        </q-toolbar>
      </q-header>
      <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="690" v-if="isAuthenticated">
        <q-table flat bordered grid  :rows="rows" :columns="columns" row-key="name" :filter="filter"
          hide-header>
          <template v-slot:top-left>
            <q-input outlined rounded label="Buscar Usuario" dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>

      <q-footer v-if="isAuthenticated">
        <q-toolbar class="bg-grey-3 text-black row">
          <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message"
            placeholder="Text" />
          <q-btn round flat icon="send" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>


<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px

  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688

  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px

  &__field.q-field--outlined .q-field__control:before
    border: none

  .q-drawer--standard
    .WAL__drawer-close
      display: none

@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0

@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none

.conversation__summary
  margin-top: 4px

.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>