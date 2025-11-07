import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '../components/ContactList.vue'
import ContactDetail from '../components/ContactDetail.vue'
import ContactForm from '../components/ContactForm.vue'

const routes = [
  { path: '/', name: 'home', component: ContactList },
  { path: '/contacts/new', name: 'new', component: ContactForm, props: { mode: 'create' } },
  { path: '/contacts/:id', name: 'detail', component: ContactDetail, props: true },
  { path: '/contacts/:id/edit', name: 'edit', component: ContactForm, props: r => ({ id: r.params.id, mode: 'edit' }) },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({ history: createWebHistory(), routes })


