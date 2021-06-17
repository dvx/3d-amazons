import { useRef, useEffect } from "react"
import { useThree, useFrame, Camera } from "react-three-fiber"
import { PerspectiveCamera } from "three"
import React from "react"
import Grid from "./scenes/Grid"
import Nebula from "./scenes/Nebula"

import { store, useGlobalState } from 'state-pool';
import { Game } from "../game/game"
import * as constants from "../constants";

store.setState("game", new Game(constants.DIMS));

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

