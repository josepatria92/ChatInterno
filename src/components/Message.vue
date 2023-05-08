<script setup>
import { collection, query, onSnapshot, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
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
        await deleteDoc(doc(db, 'chats', id));
        window.location.replace(window.location.origin);
    }
}

/**
 * Edit Message
 */
const prompt = ref(false);

const idSave = ref('')

const editMessage = async (id) => {
    idSave.value = id;
}

const saveMessage = ref('')

const saveEdit = async () => {
    var e = idSave.value
    console.log(e);
    await updateDoc(doc(db, 'chats', e), {
        message: saveMessage.value
    });
    window.location.replace(window.location.origin);
}

</script>

<template>
    <div style="width: 100%; max-width: 400px">
        <div v-for="message in messages" :key="message.id">
            <div class="row justify-end q-gutter-md q-mb-xs" v-if="message.uid == auth.currentUser.uid">
                <q-icon name="edit" color="green" @click="editMessage(message.id), prompt = true" />
                <q-icon name="delete" color="red" @click="deleteMessage(message.id)" />
            </div>
            <q-chat-message :text="[message.message]" :sent="message.uid == auth.currentUser.uid" :name="message.email" />
        </div>
        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">Edit Message</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input dense v-model="saveMessage" autofocus @keyup.enter="saveEdit(), prompt = false" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn flat label="Guardar" v-close-popup @click="saveEdit()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>