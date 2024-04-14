# Lazy Skeleton Utils for R3F

lazyskeletonutils is a small react app developed for internal use as a helper to manipulate the bones of skeletons used in Three.js, with a specific focus on R3F.

## Installation and launch

1. Clone this project and run `npm install`

2. launch the project `npm run dev`

## Usage

- put your mesh inside `./public/` folder

- modify `MODEL_PATH` according to where you put your .glb/.gltf file

- go inside App.jsx and insert the mesh component after the comment "copy your mesh here". I recommend to use [gltfjsx](https://github.com/pmndrs/gltfjsx) for creating the jsx component

- everything should work!

## Options and settings

- you can modify the sliders settings inside `settings.js`
