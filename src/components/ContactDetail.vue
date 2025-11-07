<template>
    <article v-if="contact">
      <header style="display:flex;justify-content:space-between;align-items:center;">
        <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
        <div>
          <router-link :to="`/contacts/${contact.id}/edit`" style="margin-right:8px">Edit</router-link>
          <button @click="onDelete">Delete</button>
        </div>
      </header>
  
      <p><strong>Email:</strong> {{ contact.email }}</p>
      <p><strong>Phone:</strong> {{ contact.phone || '—' }}</p>
      <p><strong>Address:</strong> {{ contact.address || '—' }}</p>
      <p><strong>Notes:</strong> {{ contact.notes || '—' }}</p>
  
      <router-link to="/" style="display:inline-block;margin-top:12px">← Back</router-link>
    </article>
    <article v-else>
      <p>Contact not found.</p>
      <router-link to="/">← Back</router-link>
    </article>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { findById, remove } from './storage'
  const route = useRoute(); const router = useRouter()
  const contact = ref(null)
  onMounted(() => { contact.value = findById(route.params.id) })
  function onDelete(){
    if (!contact.value) return
    if (confirm(`Delete ${contact.value.firstName} ${contact.value.lastName}?`)){
      remove(contact.value.id); router.push('/')
    }
  }
  </script>
  