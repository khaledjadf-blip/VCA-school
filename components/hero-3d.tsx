"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";

function Diploma({ position }: { position: [number, number, number] }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.18;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.45}>
      <group ref={ref} position={position}>
        <mesh>
          <boxGeometry args={[1.4, 0.08, 0.9]} />
          <meshStandardMaterial color="#ffffff" roughness={0.42} />
        </mesh>
        <mesh position={[0.52, 0.08, 0.26]}>
          <torusGeometry args={[0.13, 0.018, 12, 32]} />
          <meshStandardMaterial color="#d45213" />
        </mesh>
      </group>
    </Float>
  );
}

function Shield({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.05} rotationIntensity={0.3} floatIntensity={0.38}>
      <group position={position} rotation={[0.16, -0.28, 0]}>
        <mesh>
          <cylinderGeometry args={[0.56, 0.42, 0.18, 5]} />
          <meshStandardMaterial color="#0b2b44" metalness={0.12} roughness={0.28} />
        </mesh>
        <mesh position={[0.08, 0.12, 0]} rotation={[0, 0, -0.6]}>
          <boxGeometry args={[0.12, 0.48, 0.08]} />
          <meshStandardMaterial color="#d45213" />
        </mesh>
        <mesh position={[-0.14, 0.1, 0]} rotation={[0, 0, 0.65]}>
          <boxGeometry args={[0.12, 0.26, 0.08]} />
          <meshStandardMaterial color="#d45213" />
        </mesh>
      </group>
    </Float>
  );
}

function Book({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.35} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={position} rotation={[0.22, 0.4, 0.06]}>
        <mesh>
          <boxGeometry args={[0.88, 0.16, 1.1]} />
          <meshStandardMaterial color="#d45213" roughness={0.36} />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <boxGeometry args={[0.08, 0.035, 1.08]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
}

function ForkliftMark({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.15} rotationIntensity={0.2} floatIntensity={0.34}>
      <group position={position} rotation={[0.1, -0.35, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.05, 0.28, 0.26]} />
          <meshStandardMaterial color="#0b2b44" roughness={0.34} />
        </mesh>
        <mesh position={[0.42, 0.34, 0]}>
          <boxGeometry args={[0.34, 0.52, 0.22]} />
          <meshStandardMaterial color="#164769" />
        </mesh>
        <mesh position={[0.76, -0.02, 0.02]}>
          <boxGeometry args={[0.08, 0.86, 0.08]} />
          <meshStandardMaterial color="#d45213" />
        </mesh>
        <mesh position={[1.02, -0.36, 0.02]}>
          <boxGeometry args={[0.62, 0.06, 0.06]} />
          <meshStandardMaterial color="#d45213" />
        </mesh>
        {[-0.36, 0.35].map((x) => (
          <mesh key={x} position={[x, -0.2, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.16, 0.05, 12, 28]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-3, -2, 4]} intensity={0.7} color="#d45213" />
      <Diploma position={[-1.6, 0.7, 0]} />
      <Shield position={[1.45, 0.7, -0.4]} />
      <Book position={[-1.05, -0.95, 0.15]} />
      <ForkliftMark position={[1.15, -0.85, 0]} />
      <mesh position={[0, 0, -0.75]}>
        <torusGeometry args={[1.08, 0.018, 16, 96]} />
        <meshStandardMaterial color="#d45213" transparent opacity={0.45} />
      </mesh>
    </>
  );
}

export function Hero3D() {
  return (
    <div className="h-[330px] w-full sm:h-[420px] lg:h-[520px]" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 44 }} dpr={[1, 1.6]} performance={{ min: 0.5 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
