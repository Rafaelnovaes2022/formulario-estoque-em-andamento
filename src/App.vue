<template>
  <div id="app">
    <Toast/>
    <Formulario />
    
  </div>
</template>

<script>
import Formulario from "./components/Formulario.vue";

export default {
  name: 'App',
  components: { Formulario},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("https://www.smnadv.com.br/wp-content/uploads/2020/02/Nova-NR-18-traz-mudanc%CC%A7as-importantes-para-a-construc%CC%A7a%CC%83o-civil-sotto-maior-e-nagel-advogados.jpg");
  animation: i;
  
}
</style>
