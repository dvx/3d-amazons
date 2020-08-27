import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, ReactThreeFiber, useThree, useFrame, extend } from 'react-three-fiber'
import './styles.css'
import Controls from './components/util/Controls'

const DIMS = 4;
const SPACING = 2;

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
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" transparent color={hovered ? 'hotpink' : 'orange'} opacity={0.05} />
    </mesh>
  )
}

ReactDOM.render(
  <Canvas
    gl={{ antialias: true, alpha: true }}
    onCreated={({ gl, camera }) => { gl.setClearColor('#0e0b19'); camera.lookAt(3,3,3) }}>
    <Controls
      enablePan={false}
      enableDamping
      dampingFactor={0.5}
      rotateSpeed={0.35}
      target={[ 3, 3, 3 ]}
    />
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    {[...Array(DIMS)].map((e, i) => [...Array(DIMS)].map((ee, ii) => [...Array(DIMS)].map((eee, iii) => <Box key={i + ii + iii} position={[i * SPACING, ii * SPACING, iii * SPACING]} />)))}
  </Canvas>,
  document.getElementById('root')
)
