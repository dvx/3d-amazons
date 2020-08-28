import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState, useMemo } from 'react'
import { Canvas, ReactThreeFiber, useThree, useFrame, extend, useLoader } from 'react-three-fiber'
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import './styles.css'
import Controls from './components/util/Controls'

const DIMS = 4;
const SPACING = 2;

type GLTFResult = GLTF & {
  nodes: {
    Default: any
  }
}

function Queen() {
  const group = useRef();
  const { nodes } = useLoader<GLTFResult>(GLTFLoader, "models/arwing.glb");
  return (
    <group ref={group}>
      <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  //useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]} >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" transparent color={hovered ? 'hotpink' : '#000'} opacity={0.05} />
    </mesh>
  )
}

function Bounds(props: any) {
  const geom = useMemo(() => new THREE.BoxBufferGeometry(8, 8, 8), undefined);
  const lineDashMat = useMemo(() => new THREE.LineDashedMaterial({color: "#ffaa00", gapSize: .2, dashSize: .3}), undefined);
  return (
    <lineSegments position={[3, 3, 3]} onUpdate={(that: THREE.LineSegments) => that.computeLineDistances()}>
      <edgesGeometry attach="geometry" args={[geom]} />
      <lineDashedMaterial color="#ffaa00" dashSize={.3} gapSize={.1} attach="material"/>
    </lineSegments>
  )
}

const x = new THREE.Scene()

ReactDOM.render(
  <Canvas
    gl={{ antialias: true, alpha: true }} >
    <scene>
    <Controls
        enablePan={false}
        enableDamping
        damping={0.5}
        rotateSpeed={0.35}
        target={[ 3, 3, 3 ]}
      />
    </scene>
    <scene background={new THREE.Color('#ffaa00')}>

      <Bounds />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {[...Array(DIMS)].map((e, i) => [...Array(DIMS)].map((ee, ii) => [...Array(DIMS)].map((eee, iii) => <Box key={i + ii + iii} position={[i * SPACING, ii * SPACING, iii * SPACING]} />)))}
    </scene>
  </Canvas>,
  document.getElementById('root')
)

// TODO: https://stackoverflow.com/questions/56636971/fixed-position-shader-background-in-three-js
// TODO: https://github.com/react-spring/react-three-fiber/blob/master/recipes.md#heads-up-display-rendering-multiple-scenes
