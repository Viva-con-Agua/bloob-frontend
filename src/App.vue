<template>
<!-- everything in this template is loaded on all pages and dosn't need to be included in views -->
  <div id="app">
    <!-- The top navigation of Pool Pages -->
    <WidgetTopNavigation />
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/compose">Bloob</router-link> |
        <router-link to="/about">Test Page</router-link>
      </div>
      <div id="content">
        <!-- this is where content from views is inserted -->
        <router-view/>
      </div>
      <!-- the bottom navigation of pool pages -->
    <WidgetBottomNavigation />
  </div>
</template>

<script>
  // Curly brackets are needed to import multiple components and non default components
  import {WidgetTopNavigation, WidgetBottomNavigation} from "vca-widget-navigation";
  //import 'element-ui/lib/theme-chalk/index.css';
  import 'vca-widget-base/dist/vca-widget-base.css'

  export default {
    name: 'App',
    //components registered here are available in all views
    components: {
      WidgetTopNavigation,
      WidgetBottomNavigation
    }
  }
</script>

<style>
/*
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*/
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

#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: min-content;
}
/*
#content {
    flex-grow: 1;
    display: flex;
    overflow: auto;
}
*/
</style>
