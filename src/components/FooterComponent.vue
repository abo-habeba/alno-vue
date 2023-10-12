<template>
  <div>
    <footer>
      <p class="text-center">Abo Habeba © {{ year }}</p>
    </footer>
  </div>
</template>
<script setup>
const year = new Date().getFullYear();
</script>
<style scoped>
footer {
  background-color: black;
  color: white;
  position: fixed;
  display: flex;
  bottom: 0px;
  left: 0px;
  right: 0px;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
}
footer > p {
  margin: 0px;
}
</style>
