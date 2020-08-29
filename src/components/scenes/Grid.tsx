import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import Controls from "../util/Controls";
import { useFrame, useThree } from "react-three-fiber";
import Ship from "../actors/Ship";

const DIMS = 4;
const SPACING = 2;

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(new THREE.Mesh())

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  //useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.001))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]} >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" transparent color={hovered ? 'hotpink' : '#000'} opacity={0.1} />
    </mesh>
  )
}

function Bounds(props: any) {
  const geom = useMemo(() => new THREE.BoxBufferGeometry(8, 8, 8), []);
  return (
    <lineSegments position={[3, 3, 3]} onUpdate={(that: THREE.LineSegments) => that.computeLineDistances()}>
      <edgesGeometry attach="geometry" args={[geom]} />
      <lineDashedMaterial color="#ffaa00" dashSize={.3} gapSize={.1} attach="material"/>
    </lineSegments>
  )
}

const Grid = (props: any) => {
  const scene = useRef<THREE.Scene>(new THREE.Scene())
  const { camera } = useThree()
  useFrame(({ gl }) => void ((gl.autoClear = false), gl.setClearColor('#000000', 0.), gl.render(scene.current, camera)), 100)

  return(
    <scene ref={scene}>
      <Controls
          enablePan={false}
          enableDamping
          damping={0.5}
          rotateSpeed={0.35}
          target={[ 3, 3, 3 ]}
        />
      <Bounds />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Ship />
      {[...Array(DIMS)].map((e, i) => [...Array(DIMS)].map((ee, ii) => [...Array(DIMS)].map((eee, iii) => <Box key={i + ii + iii} position={[i * SPACING, ii * SPACING, iii * SPACING]} />)))}
    </scene>
  );
}

export default Grid;
