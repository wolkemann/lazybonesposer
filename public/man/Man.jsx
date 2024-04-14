/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 scene.gltf --transform 
Files: scene.gltf [34.05KB] > C:\Users\ohtor\Desktop\le Fede\web-projects\lazyskeletonutils\public\man\scene-transformed.glb [196.21KB] (-476%)
Author: Renanzinho (https://sketchfab.com/Renanzinho3003)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/3d-character-rigged-wkinematics-322a59d5118e4f7ea867544adf6bed95
Title: 3D Character RIGGED - w/Kinematics
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Man(props) {
  const { nodes, materials } = useGLTF("man/scene-transformed.glb");
  return (
    <group {...props} dispose={null}>
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
  );
}

useGLTF.preload("man/scene-transformed.glb");
