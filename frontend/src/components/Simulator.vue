<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default {
  data() {
    return {
      group: null,
      renderer: null,
      scene: null,
      camera: null,
      controls: null,
      mixer: null,
      animTime: 0,
      time: 0
    };
  },
  methods: {
    init: function() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      this.scene.background = new THREE.Color("#b1b1b1");

      this.group = new THREE.Group();

      //Light
      //this.scene.add(new THREE.AmbientLight(0xf0f0f0));
      var light1 = new THREE.PointLight("#ffffff", 1);
      light1.position.set(4, 4, -4);
      this.group.add(light1);

      var light2 = new THREE.PointLight("#ffffff", 1);
      light2.position.set(-4, 4, 4);
      this.group.add(light2);

      var light3 = new THREE.PointLight("#ffffff", 1);
      light3.position.set(-4, 4, -4);
      this.group.add(light3);

      var light4 = new THREE.PointLight("#ffffff", 1);
      light4.position.set(4, 4, 4);
      this.group.add(light4);

      // light.shadow = new THREE.LightShadow(
      //   new THREE.PerspectiveCamera(-1, 1, 1, 1000)
      // );
      // light.shadow.bias = -0.000222;
      // light.shadow.mapSize.width = 1024;
      // light.shadow.mapSize.height = 1024;

      //Helper
      var helper = new THREE.GridHelper(2000, 1000);
      helper.position.y = -1;
      helper.material.opacity = 0.5;
      helper.material.transparent = true;
      this.scene.add(helper);

      // Renderer
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight - 10);
      document.body.appendChild(this.renderer.domElement);

      // // Object
      // const geometry = new THREE.BoxGeometry(1, 1, 1);
      // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      // this.cube = new THREE.Mesh(geometry, material);
      // this.cube.castShadow = true;
      // this.scene.add(this.cube);

      //object 2

      var loader = new GLTFLoader();
      loader.load(
        "/drone/scene.gltf",
        // onLoad callback
        // Here the loaded data is assumed to be an object
        obj => {
          obj.scene.children[0].children[0].children[0].children.pop(12);
          this.group.add(obj.scene);
          this.scene.add(this.group);
          this.mixer = new THREE.AnimationMixer(this.group);
          obj.animations.forEach(clip => {
            this.mixer.clipAction(clip).play();
          });
          console.log(this.group);
          console.log(obj.animations);
        },

        // onProgress callback
        function(xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },

        // onError callback
        function(err) {
          console.error("An error happened: " + err);
        }
      );

      // Controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.camera.position.x = 8;
      this.camera.position.y = 12;
      this.camera.position.z = -20;

      this.controls.update();
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      if (this.mixer != null) {
        if (this.animTime < 2.1 || this.animTime >= 3.9) {
          this.mixer.setTime(2.1);
          this.animTime = 2.1;
        } else {
          this.animTime += 0.01;
          this.mixer.update(0.01);
        }
      }
      this.time += 0.1;
      if (this.time < 5) {
        this.group.position.y += 0.1;
      }

      if (this.time > 5 && this.time < 20) {
        this.group.position.z += 0.1;
      }
      if (this.time > 20 && this.time < 36) {
        this.group.rotation.y -= 0.01;
      }
      if (this.time > 36 && this.time < 51) {
        this.group.position.x -= 0.1;
      }
      if (this.time > 51 && this.time < 67) {
        this.group.rotation.y -= 0.01;
      }

      if (this.time > 67 && this.time < 70) {
        this.group.position.y -= 0.15;
      }
      if (this.time > 70) {
        this.mixer = null;
      }

      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>
