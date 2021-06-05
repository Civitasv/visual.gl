<template>
  <div class="dashboard" style="height: 100%">
    <v-overlay
      :value="overlay"
      class="d-flex justify-center align-center"
      style="width: 100%"
    >
      <v-progress-circular color="red" indeterminate></v-progress-circular>
    </v-overlay>
    <div class="file-input">
      <input
        type="file"
        name="file"
        id="inShpFile"
        accept=".zip"
        style="visibility: hidden; position: absolute; height: 0px"
      />
      <input
        id="inGeoJSONFile"
        type="file"
        style="visibility: hidden; position: absolute; height: 0px"
        accept="application/json"
      />
    </div>
    <v-app-bar
      app
      flat
      style="border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important"
    >
      <v-app-bar-nav-icon to="/home">
        <v-avatar size="24">
          <img src="@/assets/images/icon.png" alt="icon" />
        </v-avatar>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">visual.gl</v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="d-flex justify-center align-center">
        <v-switch
          v-model="$vuetify.theme.dark"
          hide-details
          flat
          color="#121212"
        ></v-switch>
        <v-menu offset-y rounded="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn plain v-bind="attrs" v-on="on">
              load data
              <v-icon right> mdi-chevron-down </v-icon>
            </v-btn>
          </template>

          <v-list dense flat>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="item.onClick"
            >
              <v-list-item-content>
                <v-btn text class="justify-start">
                  <v-icon left> {{ item.icon }} </v-icon>
                  {{ item.title }}
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn plain to="/home"> exit </v-btn>
      </div>
    </v-app-bar>
    <v-main app style="height: 100%">
      <v-container fluid fill-height style="padding: 0">
        <v-layout align-center justify-center>
          <v-fade-transition mode="out-in">
            <div id="map" style="width: 100%; height: 100%"></div>
          </v-fade-transition>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>
</style>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import shp from "shpjs";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
export default {
  data() {
    return {
      drawer: null,
      overlay: false,
      dark: false,
      items: [
        { onClick: this.addGeoJson, icon: "mdi-code-json", title: "GeoJson" },
        { onClick: this.addShp, icon: "mdi-shape", title: "Shapefile" },
        { onClick: this.addKML, icon: "mdi-xml", title: "KML" },
      ],
      map: null,
      view: null,
    };
  },
  components: {},
  methods: {
    addGeoJson() {
      document.getElementById("inGeoJSONFile").click();
    },
    addShp() {
      document.getElementById("inShpFile").click();
    },
    addKML() {},
    showMap() {
      this.view = new View({
        zoom: 0,
        center: [0, 0],
        projection: "EPSG:3857",
        constrainResolution: true,
      });
      this.map = new Map({
        // the map will be created using the 'map-root' ref
        target: "map",
        layers: [
          // adding a background tiled layer
          new TileLayer({
            source: new OSM(), // tiles are served by OpenStreetMap
          }),
        ],

        // the map view will initially show the whole world

        view: this.view,
      });
    },
    addListener() {
      const _this = this;
      document
        .getElementById("inShpFile")
        .addEventListener("change", function selectedFileChanged() {
          if (this.files.length === 0) {
            console.log("请选择文件！");
            return;
          }
          _this.overlay = true;
          const reader = new FileReader();
          reader.onload = function fileReadCompleted() {
            shp(this.result).then(async function (geojson) {
              addGeoJsonLayer(geojson);
            });
          };
          reader.readAsArrayBuffer(this.files[0]);
        });

      document
        .getElementById("inGeoJSONFile")
        .addEventListener("change", function selectedFileChanged() {
          if (this.files.length === 0) {
            console.log("请选择文件！");
            return;
          }
          _this.overlay = true;
          const reader = new FileReader();
          reader.onload = async function fileReadCompleted() {
            addGeoJsonLayer(this.result);
          };
          reader.readAsText(this.files[0]);
        });
      function addGeoJsonLayer(geojson) {
        const features = new GeoJSON().readFeatures(geojson, {
          featureProjection: "EPSG:3857",
        });
        const vectorSource = new VectorSource({
          features: features,
        });
        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });
        _this.map.addLayer(vectorLayer);
        _this.view.fit(vectorSource.getExtent());
        _this.overlay = false;
      }
    },
  },

  mounted() {
    this.showMap();
    this.addListener();
  },
};
</script>