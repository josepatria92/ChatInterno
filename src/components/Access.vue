<script setup>
import { ref } from 'vue'

/**
 * View password 
 */
const isPwd = ref(true);

/**
 * Object form data
 */
const objectModel = ref({
    email: '',
    password: '',
    nickName: '',

}) 
</script>

<template>
    <div>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="objectModel.email" type="text" label="Email">
                <template v-slot:prepend>
                    <q-icon name="mail" />
                </template>
            </q-input>
            <q-input v-model="nickName" type="text" filled label="Nick Name" />
            <q-input v-model="objectModel.password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
                <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="isPwd = !isPwd" />
                </template>
            </q-input>
            <div class="row justify-center">
                <q-btn label="Reset" type="reset" color="primary" flat />
                <q-btn label="Submit" type="submit" color="primary" flat />
            </div>
        </q-form>

    </div>
</template>