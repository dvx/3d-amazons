import React, { useRef, Suspense, useState } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
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

function SciFiFighterV1() {
  const group = useRef<THREE.Group>(new THREE.Group());
  const materials = useLoader(MTLLoader, "models/sci-fi-fighter/13897_Sci-Fi_Fighter_Ship_v1_l1.mtl")
  const model = useLoader(OBJLoader, "models/sci-fi-fighter/13897_Sci-Fi_Fighter_Ship_v1_l1.obj", loader => {
    materials.preload();
    (loader as OBJLoader).setMaterials(materials);
  })

  // cleaning up model
  //model.scene.rotateX(- Math.PI / 2)
  //model.scene.translateY(.35);
  //model.scene.rotateZ(Math.PI / 2)

  useConstructor(() => {
    model.rotateX(- Math.PI / 2)
    model.rotateZ(Math.PI/2)
    //model.scene.translateY(.35);
  })

  const [hovered, setHover] = useState(false)
  const [gameState, setGameState, updateGameState] = useGlobalState<Game>("game");

  
  useFrame(()=> {
    //@ts-ignore
    if (hovered) (model.children[0] as THREE.Mesh).material.emissive.g = 0.25;

    if (hovered) console.log(gameState)

    if (hovered) {
      updateGameState((gameState => { gameState.turn++ }))
      console.log(gameState?.gameIsOver());
    }

    //@ts-ignore
    else (model.children[0] as THREE.Mesh).material.emissive.g = 0;
  })

  return (
    <group ref={group}>
      <primitive onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} scale={[0.001, 0.001,0.001]} object={model} />
    </group>
  );
}

const Ship = (props: any) => {
    return(
      <Suspense fallback={<Loading />}>
        <SciFiFighterV1 />
      </Suspense>
    )
}

export default Ship;
