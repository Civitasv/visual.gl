<template>
  <v-main>
    <v-container fluid fill-height style="padding: 0">
      <v-layout align-center justify-center>
        <div class="home d-flex flex-column align-center justify-center">
          <h1>visual.gl</h1>
          <div class="pages">
            <router-link
              to="/dashboard"
              class="link"
              data-title="ENTER NOW"
            ></router-link>
          </div>
        </div>
      </v-layout>
    </v-container>
  </v-main>
</template>

<style scoped>
.home {
  background: url("../assets/images/bg.jpg") no-repeat;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
}
.link {
  position: relative;
  display: inline-block;
  padding: 1.2em 2em;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  user-select: none;
  color: white;
}

.link::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(135deg, #81828275, #71717a96);
  border-radius: 4px;
  transition: box-shadow 0.5s ease, transform 0.2s ease;
  will-change: transform;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0))
    rotateY(var(--ry, 0)) translateZ(var(--tz, -12px));
}
.link:hover {
  background: linear-gradient(135deg, #00f8f875, #0000ee96);
}
.link:hover::before {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.link::after {
  position: relative;
  display: inline-block;
  content: attr(data-title);
  transition: transform 0.2s ease;
  font-weight: bold;
  letter-spacing: 0.01em;
  will-change: transform;
  transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0))
    rotateY(var(--ry, 0));
}

.pages {
  margin-top: 100px;
}
.home h1 {
  padding-top: 10vh;
  color: azure;
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
}
</style>

<script>
export default {
  data() {
    return {
      btnstyle: "background:transparent;color:whitesmoke;",
    };
  },
  components: {},
};
</script>