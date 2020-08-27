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
  obj: {
      update: Function;
  };
}

const Controls = (props: any) => {
  const ref = useRef<OrbitRef>();
  const { camera, gl } = useThree();
  useFrame(() => {
      if (ref && ref.current) {
          ref.current.obj?.update();
      }
  });
  return (
      <orbitControls
          ref={ ref }
          args={ [ camera, gl.domElement ] }
          { ...props }
      />
  );
};

export default Controls;