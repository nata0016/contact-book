<template>
    <section>
      <header>
        <h2>Contacts</h2>
        <input v-model="q" type="search" placeholder="Search by first or last name…" aria-label="Search contacts" />
      </header>
  
      <p v-if="!filtered.length" style="color:#6b7280">No contacts found.</p>
      <ul>
        <li v-for="c in filtered" :key="c.id">
          <router-link :to="`/contacts/${c.id}`">
            {{ c.lastName }}, {{ c.firstName }}
          </router-link>
          <span style="color:#6b7280"> — {{ c.email }}</span>
        </li>
      </ul>
  
      <router-link to="/contacts/new" style="display:inline-block;margin-top:12px">+ New Contact</router-link>
    </section>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { getAll, sortByLastName } from './storage'
  const q = ref('')
  const contacts = ref(sortByLastName(getAll()))
  const filtered = computed(() => {
    const s = q.value.trim().toLowerCase()
    if (!s) return contacts.value
    return contacts.value.filter(c =>
      c.firstName.toLowerCase().includes(s) || c.lastName.toLowerCase().includes(s)
    )
  })
  </script>
  