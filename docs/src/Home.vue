<template>
  <div>
    <h2>Home</h2>
    <p><Button type="primary" @click="onClick">Click</Button></p>
    <p><Button type="warning" @click="onException">Exception</Button></p>
    <p><Button type="danger" @click="onException">Uncaught Exception</Button></p>
  </div>
</template>

<script>
import { Button } from 'vant';


export default {
  components: { Button },

  data() {
    return {};
  },

  methods: {
    onClick() {
      console.log('click');
      h5a('send', 'track', 'CLICK');
    },

    onException() {
      console.error('exception');
      a = b;
      // h5a('send', 'exception', args);
    },
  },
};
</script>

<style scoped>
</style>
