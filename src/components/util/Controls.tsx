import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend, ReactThreeFiber, useThree, useFrame } from 'react-three-fiber';
import React, { useRef } from 'react';
extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
    }
  }
}

interface OrbitRef {
  update: Function;
}

const Controls = (props: any) => {
  const ref = useRef<OrbitRef>();
  const { camera, gl: { domElement } } = useThree();
  useFrame(() => {
    ref?.current?.update();
  });
  return (
    <orbitControls
      ref={ ref }
      args={ [ camera, domElement ] }
      { ...props }
    />
  );
};

export default Controls;