import { useRef, useEffect } from "react"
import { useThree, useFrame, Camera } from "react-three-fiber"
import { PerspectiveCamera } from "three"
import React from "react"
import Grid from "./scenes/Grid"
import Nebula from "./scenes/Nebula"

const Main = (props: any) => {
  const camera = useRef<Camera>(new PerspectiveCamera())
  const { size, setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(camera.current), [])
  useFrame(() => camera.current.updateMatrixWorld())

  return(
    <>
      <perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        onUpdate={(self: { updateProjectionMatrix: () => any }) => self.updateProjectionMatrix()}
      />
    <Nebula />
    <Grid />
  </>
  )
}

export default Main;

