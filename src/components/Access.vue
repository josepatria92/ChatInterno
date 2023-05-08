<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from '../boot/firebase'


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

}) 

/**
 * Validations
 */
const isValidEmail = val => { //email validation
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  
  return emailPattern.test(val) || "Ingrese Un Correo Valido";
};

const isPassword = val => { //password validation
  const password_data = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!#%*?&]{8,12}$/;

  return password_data.test(val) || "Ingrese Campo Valido";
};

/**
 * Log In User
 */
const logIn = () => {
 signInWithEmailAndPassword(auth, objectModel.value.email, objectModel.value.password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

/**
 * Reset Form
 */
const onReset = () => {
    objectModel.value.email = null;
    objectModel.value.password = null;
}
</script>

<template>
    <div>
        <q-form @submit="logIn" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="objectModel.email" type="text" label="Email" :rules="[isValidEmail]">
                <template v-slot:prepend>
                    <q-icon name="mail" />
                </template>
            </q-input>
            <q-input v-model="objectModel.password" filled :type="isPwd ? 'password' : 'text'"   :rules="[isPassword]">
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