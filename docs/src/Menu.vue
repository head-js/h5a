<template>
  <Sidebar :activeKey="active">
    <SidebarItem v-for="m in menus" :key="m.key" :title="m.title" :url="m.pathname" />
  </Sidebar>
</template>

<script>
import { Sidebar, SidebarItem } from 'vant';


export default {
  components: { Sidebar, SidebarItem },

  data() {
    return {};
  },

  computed: {
    menus() {
      const pathname = this.$route.path;
      const routes = this.$router.options.routes;
      return routes.map(r => ({
        title: r.name,
        key: r.path,
        pathname: `#${r.path}`,
      }));
    },

    active() {
      const pathname = this.$route.path;
      return this.menus.findIndex(m => m.key === pathname);
    },
  },
};
</script>
