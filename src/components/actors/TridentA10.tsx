import React, { useRef, Suspense, useState } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import useConstructor from "../util/UseConstructor";
import { useGlobalState } from "state-pool";
import { Game } from "../../game/game"

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

function TridentA10() {
  const group = useRef<THREE.Group>(new THREE.Group());
  const model = useLoader(GLTFLoader, "models/Trident-A10.glb");
  let originalMaterial: THREE.Material | THREE.Material[];

  // cleaning up model
  //model.scene.rotateX(- Math.PI / 2)
  //model.scene.translateY(.35);
  //model.scene.rotateZ(Math.PI / 2)

  useConstructor(() => {
    model.scene.rotateX(- Math.PI / 2)
    //model.scene.translateY(.35);
  })

  const [hovered, setHover] = useState(false)
  const [gameState, setGameState, updateGameState] = useGlobalState<Game>("game");

  
  useFrame(()=> {
    //@ts-ignore
    if (hovered) (model.scene.children[0] as THREE.Mesh).material.emissive.g = 0.25;

    if (hovered) console.log(gameState)

    if (hovered) {
      updateGameState((gameState => { gameState.turn++ }))
      console.log(gameState?.gameIsOver());
    }

    //@ts-ignore
    else (model.scene.children[0] as THREE.Mesh).material.emissive.g = 0;
  })

  return (
    <group ref={group}>
      <primitive onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} scale={[0.001, 0.001,0.001]} object={model.scene} />
    </group>
  );
}

const Ship = (props: any) => {
    return(
      <Suspense fallback={<Loading />}>
        <TridentA10 />
      </Suspense>
    )
}

export default Ship;
