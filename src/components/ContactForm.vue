<template>
    <article>
      <h2 v-if="mode==='create'">New Contact</h2>
      <h2 v-else>Edit Contact</h2>
  
      <form @submit.prevent="onSubmit">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <label>First Name <input v-model.trim="model.firstName" required /></label>
          <label>Last Name <input v-model.trim="model.lastName" required /></label>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <label>Email <input type="email" v-model.trim="model.email" required /></label>
          <label>Phone <input v-model.trim="model.phone" /></label>
        </div>
        <label>Address <input v-model.trim="model.address" /></label>
        <label>Notes <textarea rows="3" v-model.trim="model.notes" /></label>
  
        <div style="margin-top:8px;">
          <button type="submit">{{ mode==='create' ? 'Create' : 'Save changes' }}</button>
          <router-link :to="cancelTo" style="margin-left:8px">Cancel</router-link>
        </div>
      </form>
    </article>
  </template>
  
  <script setup>
  import { reactive, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { create, update, findById } from './storage'
  
  const props = defineProps({ id: { type:String, default:null }, mode: { type:String, required:true } })
  const router = useRouter()
  const model = reactive({ firstName:'', lastName:'', email:'', phone:'', address:'', notes:'' })
  const cancelTo = computed(() => props.mode==='create' ? '/' : `/contacts/${props.id}`)
  
  onMounted(() => {
    if (props.mode === 'edit' && props.id) {
      const existing = findById(props.id)
      if (existing) Object.assign(model, existing)
    }
  })
  
  function onSubmit(){
    if (props.mode === 'create') {
      const item = create(model)
      router.push(`/contacts/${item.id}`)
    } else {
      const saved = update(props.id, model)
      if (saved) router.push(`/contacts/${saved.id}`)
    }
  }
  </script>
  