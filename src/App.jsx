import { useLayoutEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import "./App.css";
import { MODEL_PATH, SLIDERS_PROPS } from "./constants/settings";

function App() {
  const [bonesData, setBonesData] = useState(false);
  const [skeletonLoaded, setSkeletonLoaded] = useState(false);

  const { nodes, materials } = useGLTF(MODEL_PATH);

  // Save your bones poistion here for preloading
  // TODO: add some localStorage support
  useLayoutEffect(() => {
    setBonesData(nodes);
    setSkeletonLoaded(true);
  });

  const handleCopyValues = (field) => {
    navigator.clipboard.writeText(
      `nodes["${field}"].rotation.x = ${bonesData[field].rotation.x}
      nodes["${field}"].rotation.y = ${bonesData[field].rotation.y}
      nodes["${field}"].rotation.z = ${bonesData[field].rotation.z}
      `
    );
  };

  const handleChange = (e, coord, field) => {
    nodes[field].rotation[coord] = e.target.value;
    let newRotation = { ...nodes };

    setBonesData(newRotation);
  };

  return (
    skeletonLoaded && (
      <div className="screen">
        <div className="canvas">
          <Canvas>
            {
              // Copy your mesh here
            }
            <group dispose={null} position={[0, -7, 0]} scale={0.005}>
              <primitive object={nodes._rootJoint} />
              <skinnedMesh
                geometry={nodes.Object_7.geometry}
                material={materials["default"]}
                skeleton={nodes.Object_7.skeleton}
                position={[0, 1068.402, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={373.033}
              />
            </group>
            <OrbitControls />
            <ambientLight />
            <directionalLight />
          </Canvas>
        </div>

        <div className="menu">
          {Object.keys(bonesData).map((nodeName) => {
            if (!nodes[nodeName].isBone) {
              return <div key={nodeName}></div>;
            }
            return (
              <div className="boneProp" key={nodeName}>
                <div
                  className="bonePropName"
                  onClick={() => handleCopyValues(nodeName)}
                >
                  {nodeName}
                </div>

                <input
                  type="text"
                  key={`${nodeName}-rotation-x`}
                  value={bonesData[nodeName].rotation.x}
                  onChange={(e) => handleChange(e, "x", nodeName)}
                  className="propsInput"
                />
                <input
                  {...SLIDERS_PROPS}
                  value={bonesData[nodeName].rotation.x}
                  onChange={(e) => handleChange(e, "x", nodeName)}
                  className="propsSlider"
                />
                <br />
                <input
                  type="text"
                  key={`${nodeName}-rotation-y`}
                  value={bonesData[nodeName].rotation.y}
                  onChange={(e) => handleChange(e, "y", nodeName)}
                  className="propsInput"
                />
                <input
                  {...SLIDERS_PROPS}
                  value={bonesData[nodeName].rotation.y}
                  onChange={(e) => handleChange(e, "y", nodeName)}
                  className="propsSlider"
                />
                <br />
                <input
                  type="text"
                  key={`${nodeName}-rotation-z`}
                  value={bonesData[nodeName].rotation.z}
                  onChange={(e) => handleChange(e, "z", nodeName)}
                  className="propsInput"
                />
                <input
                  {...SLIDERS_PROPS}
                  value={bonesData[nodeName].rotation.z}
                  onChange={(e) => handleChange(e, "z", nodeName)}
                  className="propsSlider"
                />
                <br />
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default App;
