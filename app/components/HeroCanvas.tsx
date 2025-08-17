'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const HeroCanvas = () => {
    const mountRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !mountRef.current) return;

        const currentMount = mountRef.current;
        let mouseX = 0, mouseY = 0;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ canvas: currentMount, antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);

        const geometry = new THREE.IcosahedronGeometry(2.5, 8);
        const material = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float u_time;
                uniform vec2 u_mouse;
                varying vec2 vUv;

                float random (vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
                float noise (vec2 st) {
                    vec2 i = floor(st); vec2 f = fract(st);
                    float a = random(i); float b = random(i + vec2(1.0, 0.0));
                    float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
                    vec2 u = f*f*(3.0-2.0*f);
                    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
                }

                void main() {
                    vec2 st = vUv * 8.0;
                    st.x += u_time * 0.1;
                    float n = noise(st);
                    
                    float mouseDist = distance(vUv, u_mouse);
                    float colorMix = smoothstep(0.3, 0.15, mouseDist);

                    vec3 colorA = vec3(0.05, 0.04, 0.12); // background
                    vec3 colorB = vec3(0.10, 0.09, 0.18); // primary
                    vec3 colorC = vec3(0.94, 0.13, 0.66); // accent
                    vec3 colorD = vec3(0.00, 0.96, 1.00); // secondary

                    vec3 color = mix(colorA, colorB, n);
                    color = mix(color, colorC, colorMix * 0.8);
                    color = mix(color, colorD, colorMix * 0.2);


                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            uniforms: {
                u_time: { value: 0.0 },
                u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
            },
            wireframe: true,
        });

        const shape = new THREE.Mesh(geometry, material);
        scene.add(shape);

        const clock = new THREE.Clock();
        let frameId: number;

        const animate = () => {
            material.uniforms.u_time.value = clock.getElapsedTime();
            shape.rotation.x += 0.0005;
            shape.rotation.y += 0.0005;
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            if (!currentMount) return;
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX / window.innerWidth;
            mouseY = 1.0 - (event.clientY / window.innerHeight);
            material.uniforms.u_mouse.value.set(mouseX, mouseY);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return <canvas ref={mountRef} className="hero-canvas" />;
};

export default HeroCanvas;