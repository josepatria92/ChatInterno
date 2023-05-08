<script setup>
import { collection, query, onSnapshot, orderBy, doc, deleteDoc } from "firebase/firestore";
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
            messages.value.push({
                id: change.doc.id,
                ...change.doc.data(),
            })
        }
        if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
           
        }
    });
});

/**
 * Delete Message
 */
const deleteMessage = async (id) => {
    if (confirm()) {
        await deleteDoc(doc(db, 'chats' ,id));
        window.location.replace(window.location.origin);
    }
}

</script>

<template>
    <div style="width: 100%; max-width: 400px">
        <div v-for="message in messages" :key="message.id">
            <div class="row justify-end q-gutter-md q-mb-xs">
                <q-icon name="edit" color="green" />
                <q-icon name="delete" color="red" @click="deleteMessage(message.id)"/>
            </div>
            <q-chat-message :text="[message.message]" :sent="message.uid == auth.currentUser.uid" :name="message.email"  />
        </div>
    </div>
</template>