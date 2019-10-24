<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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
      framesPerSecond: 30,
      axis10cm: null,
      axis1m: null,
      start: true,
      play: true,
      animation: [
        {
          action: "up",
          value: 1
        },
        {
          action: "forward",
          value: 2.5
        },
        // {
        //   action: "wait",
        //   value: 2
        // },
        // {
        //   action: "left",
        //   value: 5
        // },
        // {
        //   action: "rotateL",
        //   value: Math.PI / 2
        // },
        // {
        //   action: "backwards",
        //   value: 5
        // },
        // {
        //   action: "rotateR",
        //   value: Math.PI
        // },
        // {
        //   action: "right",
        //   value: 5
        // },
        {
          action: "down",
          value: 1
        }
      ]
    };
  },
  computed: {
    angleSpeed() {
      return Math.PI / 2 / this.framesPerSecond;
    },
    speed() {
      return 4 / 3 / 2.5;
    }
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
      this.scene.background = new THREE.Color("#cccccc");

      this.group = new THREE.Group();

      //Light
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

      //Helper
      this.axis10cm = new THREE.GridHelper(2000, 500);
      this.axis10cm.position.y = 0;
      this.axis10cm.material.opacity = 0.5;
      this.axis10cm.material.transparent = true;
      this.scene.add(this.axis10cm);

      this.axis1m = new THREE.GridHelper(2000, 50);
      this.axis1m.position.y = 0;
      this.axis1m.material.opacity = 1;
      this.axis1m.material.transparent = true;
      this.scene.add(this.axis1m);

      // Renderer
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight - 10);
      document.body.appendChild(this.renderer.domElement);

      //object 2

      var loader = new GLTFLoader();
      loader.load(
        "/drone/scene.gltf",
        // Here the loaded data is assumed to be an object
        obj => {
          obj.scene.children[0].children[0].children[0].children.pop(12);
          obj.scene.position.y += 1.5;
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
      this.camera.position.x = 10;
      this.camera.position.y = 24;
      this.camera.position.z = 40;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = -25;
      this.controls.dampingFactor = true;
      this.camera.zoom = 8;
      this.camera.updateProjectionMatrix();

      this.controls.update();
    },
    animate: function() {
      setTimeout(() => {
        requestAnimationFrame(this.animate);
      }, 1000 / this.framesPerSecond);
      //crop animation
      if (this.play) {
        if (this.animTime < 2.1 || this.animTime >= 3.9) {
          this.mixer.setTime(2.1);
          this.animTime = 2.1;
        } else {
          this.animTime += 0.05;
          this.mixer.update(0.05);
        }
      }

      if (this.start) {
        this.camera.zoom *= 0.97;
        this.camera.updateProjectionMatrix();
        if (this.camera.position.z < -40) {
          this.controls.autoRotate = false;
          this.start = false;
        }
      } else {
        this.move();
      }
      this.controls.update();

      this.renderer.render(this.scene, this.camera);
    },
    move: function() {
      if (this.animation.length > 0) {
        if (this.animation[0].value <= 0) {
          this.animation.shift();
          return;
        }
        switch (this.animation[0].action) {
          case "forward":
            this.group.translateZ(this.speed);
            this.animation[0].value -= 1 / this.framesPerSecond;
            break;
          case "backwards":
            this.group.translateZ(-this.speed);
            this.animation[0].value -= 1 / this.framesPerSecond;
            break;
          case "right":
            this.group.translateX(this.speed);
            this.animation[0].value -= 1 / this.framesPerSecond;
            break;
          case "left":
            this.group.translateX(-this.speed);
            this.animation[0].value -= 1 / this.framesPerSecond;
            break;
          case "up":
            this.group.translateY(this.speed);
            this.animation[0].value -= 1 / this.framesPerSecond;
            break;
          case "down":
            this.group.translateY(-this.speed);
            this.animation[0].value -= 1 / this.framesPerSecond;
            break;
          case "rotateR":
            this.group.rotation.y -= this.angleSpeed;
            this.animation[0].value -= this.angleSpeed;
            break;
          case "rotateL":
            this.group.rotation.y -= this.angleSpeed;
            this.animation[0].value -= this.angleSpeed;
            break;
          case "wait":
            this.animation[0].value -= 1 / this.framesPerSecond;
            break;
        }
      } else {
        this.play = false;
      }
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>
