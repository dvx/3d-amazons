import React, { useRef, useEffect } from "react";
import { useThree, useFrame, Camera } from "react-three-fiber";
import * as THREE from "three";
import { OrthographicCamera } from "three";
import { StarNest } from "../../shaders/StarNest";

function Plane(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>();
  const { size } = useThree();
  let time = 0;
  useFrame(({ camera }) => {
    time+= 0.1;
    StarNest.uniforms.iMouse.value.set(Math.abs(Math.sin(camera.rotation.x + camera.rotation.z)), Math.abs(Math.sin(camera.rotation.y)), 1);
    StarNest.uniforms.iResolution.value.set(size.width, size.height, 1);
    StarNest.uniforms.iTime.value = time;
  })
  return (
    <mesh
      {...props}
      scale={[2, 2, 2]}
      ref={mesh}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 1]}/>
      <meshStandardMaterial attach="material" color={'#aacc33'}  />
      <shaderMaterial attach="material" uniforms={StarNest.uniforms} vertexShader={StarNest.vertexShader} fragmentShader={StarNest.fragmentShader} />
    </mesh>
  )
}

const Nebula = (props: any) => {
  const camera = useRef<Camera>(new OrthographicCamera(
    -1, // left
     1, // right
     1, // top
    -1, // bottom
    -1, // near,
     0, // far    
  ))
  const scene = useRef<THREE.Scene>(new THREE.Scene())
  //const { setDefaultCamera } = useThree()
  //useEffect(() => void setDefaultCamera(camera.current), [])
  useFrame(({ gl }) => void ((gl.autoClear = true), gl.render(scene.current, camera.current)), 10)
  return(
    <scene ref={scene}>
      <ambientLight />
      <Plane position={[0,0,0]} />
    </scene>
  );
}

export default Nebula;
