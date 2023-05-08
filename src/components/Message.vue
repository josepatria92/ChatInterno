<script setup>
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db, auth } from '../boot/firebase'
import { ref } from 'vue'

/**
 * Get All messages
 */
let messages = ref([])

const q = query(collection(db, "chats"), orderBy('time'));
const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log(change.doc.id, " => ", change.doc.data());
            messages.value.push({
                id: change.doc.id,
                ...change.doc.data(),
            })
        }
        if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
        }
    });
});
</script>

<template>
    <div style="width: 100%; max-width: 400px">
        <div v-for="message in messages" :key="message.id">
            <div class="row justify-end q-gutter-md q-mb-xs">
                <q-icon name="edit" color="green" />
                <q-icon name="delete" color="red" />
            </div>
            <q-chat-message :text="[message.message]" :sent="message.uid == auth.currentUser.uid" :name="message.email"  />
        </div>
    </div>
</template>