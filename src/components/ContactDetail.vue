<template>
    <article v-if="contact">
      <header class="contact-header">
        <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
        <div class="actions">
          <router-link
            :to="`/contacts/${contact.id}/edit`"
            class="contrast outline"
          >
            ✏️ Edit
          </router-link>
          <button
            @click="onDelete"
            class="secondary outline danger-btn"
          >
            🗑️ Delete
          </button>
        </div>
      </header>
  
      <div class="contact-info">
        <p><strong>Email:</strong> {{ contact.email }}</p>
        <p><strong>Phone:</strong> {{ contact.phone || '—' }}</p>
        <p><strong>Address:</strong> {{ contact.address || '—' }}</p>
        <p><strong>Notes:</strong> {{ contact.notes || '—' }}</p>
      </div>
  
      <router-link to="/" class="back-link">← Back to contacts</router-link>
    </article>
  
    <article v-else>
      <p>Contact not found.</p>
      <router-link to="/" class="back-link">← Back</router-link>
    </article>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { findById, remove } from './storage'
  
  const route = useRoute()
  const router = useRouter()
  const contact = ref(null)
  
  onMounted(() => {
    contact.value = findById(route.params.id)
  })
  
  function onDelete() {
    if (!contact.value) return
    if (confirm(`Delete ${contact.value.firstName} ${contact.value.lastName}?`)) {
      remove(contact.value.id)
      router.push('/')
    }
  }
  </script>
  
  <style scoped>
  .contact-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    color: var(--brand-color, #0f766e);
  }
  
  .actions {
    display: flex;
    gap: 0.5rem;
  }
  
  button,
  .contrast,
  .secondary {
    border-radius: 8px;
    padding: 0.4rem 0.8rem;
    font-weight: 500;
    cursor: pointer;
  }
  
  .danger-btn {
    background: #fee2e2;
    color: #991b1b;
  }
  
  .danger-btn:hover {
    background: #fca5a5;
  }
  
  .back-link {
    display: inline-block;
    margin-top: 1rem;
    color: var(--brand-color, #0f766e);
    text-decoration: none;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  .contact-info p {
    margin: 0.3rem 0;
  }
  </style>
  
  