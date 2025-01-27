import { useLayoutEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Outlines, useGLTF } from "@react-three/drei";

import "./App.css";
import { MODEL_PATH, SLIDERS_PROPS } from "./constants/settings";

function App() {
  const [bonesData, setBonesData] = useState(false);
  const [skeletonLoaded, setSkeletonLoaded] = useState(false);

  const { nodes, materials } = useGLTF(MODEL_PATH);

  useLayoutEffect(() => {
    // Save your bones position here for preloading
    // TODO: add some localStorage/persistent data support

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

  const handleCopyAllValues = () => {
    let clipboard = "";
    Object.keys(bonesData).forEach((nodeName) => {
      if (bonesData[nodeName].isBone) {
        clipboard += `nodes["${nodeName}"].rotation.x = ${bonesData[nodeName].rotation.x}
      nodes["${nodeName}"].rotation.y = ${bonesData[nodeName].rotation.y}
      nodes["${nodeName}"].rotation.z = ${bonesData[nodeName].rotation.z}
      `;
      }
    });

    navigator.clipboard.writeText(clipboard);
  };

  return (
    skeletonLoaded && (
      <div className="screen">
        <div className="canvas">
          <Canvas camera={{ position: [0, 0, 6], fov: 50, zoom: 10 }}>
            {
              // Copy your mesh here
            }
            <group dispose={null}>
              <primitive object={nodes._rootJoint} />
              <skinnedMesh
                geometry={nodes.Object_85.geometry}
                material={nodes.Object_85.material}
                skeleton={nodes.Object_85.skeleton}
                position={[0, -0.008, 0]}
                scale={0.161}
              >
                <Outlines thickness={0.008} color="#b200b2" />
              </skinnedMesh>
            </group>
            <OrbitControls />
            <ambientLight />
            <directionalLight />
          </Canvas>
        </div>

        <div className="menu">
          <p onClick={handleCopyAllValues}>Copy all</p>
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
