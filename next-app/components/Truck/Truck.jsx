'use client'
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fitty from 'fitty';
import '../hero.scss'

gsap.registerPlugin(TextPlugin);
import { useEffect } from 'react';

export default function HeroSection() {

  useEffect(() => {
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer || typeof THREE === 'undefined') return;

    const SCROLL_RESISTANCE = 0.7;
    const CAM_HEIGHT = 3;
    const ROTATE_SPEED = 0.0015;
    const OBJSIZE = 7;
    const OBJUP = 0.6;
    const _ASPECT_RATIO = 80 / 64;

    const calculateDimensions = () => {
      const width = canvasContainer.getBoundingClientRect().width;
      const height = width * (4 / 5); 
      return { width, height };
    };

    const { width, height } = calculateDimensions();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, _ASPECT_RATIO, 0.1, 50);
    camera.position.set(OBJSIZE, 2, 4);

    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    scene.add(new THREE.AmbientLight(0xffffff, 4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    let model;
    const loader = new GLTFLoader();
    loader.load('/models/fulltruck.glb', (gltf) => {
      model = gltf.scene;
      scene.add(model);

      const animate = () => {
        if (!isDragging && model) model.rotation.y += ROTATE_SPEED;
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = false;
    controls.minPolarAngle = Math.PI / CAM_HEIGHT;
    controls.maxPolarAngle = Math.PI / CAM_HEIGHT;
    controls.target.set(0, OBJUP, 0);

    let isDragging = false;
    controls.addEventListener('start', () => isDragging = true);
    controls.addEventListener('end', () => isDragging = false);

    const handleResize = throttle(() => {
      const { width, height } = calculateDimensions();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }, 200);
    window.addEventListener('resize', handleResize);

    const handleScroll = throttle(() => {
      if (!model) return;
      const scrollTop = window.scrollY;
      const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) * SCROLL_RESISTANCE;
      const scrollFraction = scrollTop / maxScroll;
      const currentAngle = CAM_HEIGHT - (CAM_HEIGHT * scrollFraction);
      controls.minPolarAngle = Math.PI / currentAngle;
      controls.maxPolarAngle = Math.PI / currentAngle;
    }, 30);
    window.addEventListener('scroll', handleScroll);

    function throttle(fn, limit) {
      let inThrottle;
      return function () {
        if (!inThrottle) {
          fn.apply(this, arguments);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  }, []);

  return (
    <section className="hero w-full min-h-[calc(60svh+20px)] " id='hero'>
      <div className="container justify-items-center items-center h-full min-h-[calc(50svh+50px)] ">
        <figure id="canvas-container" title="spin the truck" className='w-full pt-10 sm:pt-20 md:pt-10 justify-center  h-full min-h-[calc(50svh+50px)] items-center'>
          <canvas id="canvas" width="1280" height="1024" className="w-full aspect-[5/4] h-full"/>
        </figure>

      </div>
    </section>
  );
}
