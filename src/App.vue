<template>
  <main class="container">
    <header>
      <h1>Contact Book</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/contacts/new">New Contact</router-link>
      </nav>
    </header>

    <router-view />
  </main>
</template>

<script setup>
import './assets/style.css'
</script>

