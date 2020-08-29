import React, { useRef, Suspense } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function ArWing() {
  const group = useRef<THREE.Group>(new THREE.Group());
  const model = useLoader(GLTFLoader, "models/Trident-A10.glb");

  // cleaning up model
  model.scene.rotateX(- Math.PI / 2)
  model.scene.translateY(.35);
  //model.scene.rotateZ(Math.PI / 2)
  
  useFrame(()=> {
    //group.current.rotation.x += 0.0;
  })

  return (
    <group ref={group}>
      <primitive onPointerOver={() => console.log('hover!')} scale={[0.0005, 0.0005,0.0005]} object={model.scene} />
    </group>
  );
}

const Ship = (props: any) => {
    return(
      <Suspense fallback={<Loading />}>
        <ArWing />
      </Suspense>
    )
}

export default Ship;
