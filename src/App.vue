<template>
  <div id="app">
    <WidgetTopNavigation />
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/compose">Bloob</router-link> |
        <router-link to="/about">Test Page</router-link>
      </div>
      <div id="content">
        <router-view/>
      </div>
    <WidgetBottomNavigation />
  </div>
</template>

<script>
  import {WidgetTopNavigation, WidgetBottomNavigation} from "vca-widget-navigation";
  //import 'element-ui/lib/theme-chalk/index.css';
  import 'vca-widget-base/dist/vca-widget-base.css'

  export default {
    name: 'App',
    components: {
      WidgetTopNavigation,
      WidgetBottomNavigation
    }
  }
</script>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
