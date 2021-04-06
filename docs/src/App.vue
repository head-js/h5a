<template>
  <div :class="$style._">
    <Row type="flex" justify="space-around">
      <Col span="20"><h1>Hello Vant</h1></Col>
    </Row>
    <Row type="flex" justify="space-around">
      <Col span="6">
        <Menu />
      </Col>
      <Col span="14" :class="$style.RouterView">
        <router-view />
      </Col>
    </Row>
  </div>
</template>

<script>
import { Row, Col } from 'vant';
import Menu from './Menu.vue';


export default {
  components: { Row, Col, Menu },

  data() {
    return {};
  },
};
</script>

<style module>
._ {
  h1 {
    color: #4994df;
    text-align: center;
  }

  h2 {
    color: #4fc08d;
    text-align: center;
  }
}

.RouterView {
  border-bottom: 4px solid #4994df;
}
</style>
