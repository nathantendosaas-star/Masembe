import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

// Particle Shader Material
const ParticleShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uFrequency: 0.05,
    uAmplitude: 5.0,
    uSpeed: 0.8,
    uColorGold: new THREE.Color('#D4AF37'),
    uColorChampagne: new THREE.Color('#F4E0AF'),
  },
  // Vertex Shader
  `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uSpeed;

  varying float vElevation;
  varying float vDistance;
  varying float vMouseEffect;

  // Simple 2D Noise function
  float hash(vec2 p) {
    p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
    return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Wave animation from center
    float distFromCenter = length(modelPosition.xz);
    float wave = noise(vec2(distFromCenter * uFrequency - uTime * uSpeed, uTime * uSpeed * 0.2));
    modelPosition.y += wave * uAmplitude;
    
    // Mouse Distort Field (Repel)
    float mouseDist = distance(uMouse, modelPosition.xz);
    float radius = 50.0;
    float mouseEffect = 0.0;
    if(mouseDist < radius) {
      mouseEffect = 1.0 - (mouseDist / radius);
      modelPosition.y += pow(mouseEffect, 2.0) * 20.0;
    }

    vElevation = modelPosition.y;
    vDistance = distFromCenter;
    vMouseEffect = mouseEffect;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    
    // Particle size relative to distance and mouse effect
    gl_PointSize = (1.5 + mouseEffect * 3.0) * (2000.0 / length(viewPosition.xyz));
  }
  `,
  // Fragment Shader
  `
  uniform vec3 uColorGold;
  uniform vec3 uColorChampagne;
  varying float vElevation;
  varying float vDistance;
  varying float vMouseEffect;

  void main() {
    float mixStrength = (vElevation + 5.0) / 15.0;
    vec3 color = mix(uColorGold, uColorChampagne, mixStrength + vMouseEffect * 0.5);
    
    // Circular shape
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    float alpha = 0.4 + vMouseEffect * 0.6;
    gl_FragColor = vec4(color, alpha);
  }
  `
);

// Line Shader Material
const LineShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uFrequency: 0.05,
    uAmplitude: 5.0,
    uSpeed: 0.8,
    uColorGold: new THREE.Color('#D4AF37'),
  },
  `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uSpeed;

  float hash(vec2 p) {
    p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
    return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float distFromCenter = length(modelPosition.xz);
    float wave = noise(vec2(distFromCenter * uFrequency - uTime * uSpeed, uTime * uSpeed * 0.2));
    modelPosition.y += wave * uAmplitude;

    float mouseDist = distance(uMouse, modelPosition.xz);
    float radius = 50.0;
    if(mouseDist < radius) {
      float mouseEffect = 1.0 - (mouseDist / radius);
      modelPosition.y += pow(mouseEffect, 2.0) * 20.0;
    }

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
  `,
  `
  uniform vec3 uColorGold;
  void main() {
    gl_FragColor = vec4(uColorGold, 0.1);
  }
  `
);

extend({ ParticleShaderMaterial, LineShaderMaterial });

function ParticleMesh() {
  const pointsRef = useRef<any>();
  const linesRef = useRef<any>();
  const { mouse, raycaster, camera } = useThree();
  const lerpMouse = useRef(new THREE.Vector2(0, 0));

  const { positions, lineIndices } = useMemo(() => {
    const points = [];
    const indices = [];
    const rings = 50;
    const segments = 120;
    const spacing = 5.0;

    for (let r = 0; r < rings; r++) {
      const radius = r * spacing;
      for (let s = 0; s < segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        points.push(x, 0, z);

        const curr = r * segments + s;
        const nextS = r * segments + ((s + 1) % segments);
        indices.push(curr, nextS);

        if (r < rings - 1) {
          const nextR = (r + 1) * segments + s;
          indices.push(curr, nextR);
        }
      }
    }
    return {
      positions: new Float32Array(points),
      lineIndices: new Uint32Array(indices)
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Smooth Raycasting to Y=0 Plane
    raycaster.setFromCamera(mouse, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersection);
    
    lerpMouse.current.lerp(new THREE.Vector2(intersection.x, intersection.z), 0.1);

    if (pointsRef.current) {
      pointsRef.current.material.uTime = time;
      pointsRef.current.material.uMouse = lerpMouse.current;
    }
    if (linesRef.current) {
      linesRef.current.material.uTime = time;
      linesRef.current.material.uMouse = lerpMouse.current;
    }
  });

  return (
    <group rotation={[Math.PI * 0.1, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        {/* @ts-ignore */}
        <particleShaderMaterial transparent />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            count={lineIndices.length}
            array={lineIndices}
            itemSize={1}
          />
        </bufferGeometry>
        {/* @ts-ignore */}
        <lineShaderMaterial transparent />
      </lineSegments>
    </group>
  );
}

export default function ParticleMesh3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 100, 250], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050505']} />
        <ParticleMesh />
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.1} 
            mipmapBlur 
            intensity={0.4} 
            radius={0.3}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
