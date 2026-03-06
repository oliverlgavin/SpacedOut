"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils/cn";

/* ─── Shaders ─── */

const earthVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vUv = uv;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = /* glsl */ `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform vec3 sunDirection;

  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vec3 dayColor = texture2D(dayTexture, vUv).rgb;
    vec3 nightColor = texture2D(nightTexture, vUv).rgb;

    float cosAngle = dot(normalize(vWorldNormal), normalize(sunDirection));
    float dayMix = smoothstep(-0.15, 0.25, cosAngle);
    float diffuse = clamp(cosAngle, 0.08, 1.0);

    vec3 litDay = dayColor * (0.4 + 0.6 * diffuse);
    vec3 litNight = nightColor * 1.8;

    vec3 color = mix(litNight, litDay, dayMix);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const atmosphereVertexShader = /* glsl */ `
  varying vec3 vVertexNormal;

  void main() {
    vVertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = /* glsl */ `
  varying vec3 vVertexNormal;

  void main() {
    float intensity = pow(0.65 - dot(vVertexNormal, vec3(0.0, 0.0, 1.0)), 5.0);
    gl_FragColor = vec4(0.0, 0.83, 1.0, 1.0) * intensity * 0.7;
  }
`;

/* ─── Helper ─── */

function latLonToVector3(
  lat: number,
  lon: number,
  radius: number
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

/* ─── ISS Marker ─── */

function ISSMarker({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const position = useMemo(
    () => latLonToVector3(latitude, longitude, 2.06),
    [latitude, longitude]
  );

  useFrame((state) => {
    if (groupRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.25;
      groupRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Dot */}
      <mesh>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#ff4444" />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color="#ff4444" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/* ─── Atmosphere ─── */

function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[2.15, 64, 64]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Earth ─── */

function Earth({
  issPosition,
}: {
  issPosition?: { latitude: number; longitude: number } | null;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const [dayMap, nightMap] = useTexture([
    "/textures/earth-day.jpg",
    "/textures/earth-night.jpg",
  ]);

  const sunDirection = useMemo(
    () => new THREE.Vector3(5, 3, 5).normalize(),
    []
  );

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: dayMap },
        nightTexture: { value: nightMap },
        sunDirection: { value: sunDirection },
      },
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
    });
  }, [dayMap, nightMap, sunDirection]);

  // Slow rotation — full revolution in ~40 seconds
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={meshRef} material={material}>
        <sphereGeometry args={[2, 64, 64]} />

        {/* ISS marker is a child of the rotating mesh
            so it stays pinned to the correct geographic position */}
        {issPosition && (
          <ISSMarker
            latitude={issPosition.latitude}
            longitude={issPosition.longitude}
          />
        )}
      </mesh>

      <Atmosphere />
    </group>
  );
}

/* ─── Main Export ─── */

interface Globe3DProps {
  issPosition?: { latitude: number; longitude: number } | null;
  size?: number;
  className?: string;
}

export function Globe3D({ issPosition, size = 280, className }: Globe3DProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        resize={{ debounce: 0 }}
      >
        <ambientLight intensity={0.06} />
        <Earth issPosition={issPosition} />
      </Canvas>
    </div>
  );
}
