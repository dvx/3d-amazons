import ReactDOM from 'react-dom'
import React, {  } from 'react'
import { Canvas } from 'react-three-fiber'
import './styles.css'
import Main from './components/Main'

ReactDOM.render(
  <Canvas gl={{ antialias: true, alpha: true }} >
    <Main />
  </Canvas>,
  document.getElementById('root')
)

// TODO: https://stackoverflow.com/questions/56636971/fixed-position-shader-background-in-three-js
// TODO: https://github.com/react-spring/react-three-fiber/blob/master/recipes.md#heads-up-display-rendering-multiple-scenes
