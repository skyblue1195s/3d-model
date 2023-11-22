import { useGLTF, useVideoTexture } from "@react-three/drei";
import {  useEffect, useMemo } from "react";
import * as THREE from "three"
type Props = {
  file: string
}
export function LoadGLTF(props: Props) {
  const {file} = props
  const gltf = useGLTF(file)
  const copiedScene = useMemo(() => gltf?.scene.clone(), [gltf?.scene]);
  const imageTextureLoader = useMemo(() => new THREE.TextureLoader(), []);
  const video = useVideoTexture('./video.mp4')
  const poster = ['POSTER1', 'POSTER2', 'POSTER3', 'POSTER4', 'POSTER5', 'Mesh238_M_13_0', 'Mesh239_M_12_0']
  useEffect(() => {

            copiedScene.traverse((node: any) => {
              const mesh = node as THREE.Mesh;
              const material = mesh.material as THREE.Material
              console.log(material)
              if (material && poster.includes(material.name)) {
                const path = `./${material.name}.jpg`
                const imageTexture = imageTextureLoader.load(path)
                mesh.material = new THREE.MeshStandardMaterial({
                  map: imageTexture,
              });
              }
              if (material && material.name === 'VIDEO1') {
                
                mesh.material = new THREE.MeshStandardMaterial({
                  map: video,
              });
              }
              if (mesh && mesh.name === 'Mesh238_M_13_0') {
                const path = `./POSTER1.jpg`
                const imageTexture = imageTextureLoader.load(path)
                mesh.material = new THREE.MeshStandardMaterial({
                  map: imageTexture,
              });
              }
              if (mesh &&  mesh.name === 'Mesh239_M_12_0') {
                const path = `./POSTER2.jpg`
                const imageTexture = imageTextureLoader.load(path)
                mesh.material = new THREE.MeshStandardMaterial({
                  map: imageTexture,
              });
              }
              if (mesh && mesh.name === 'Mesh240_M_11_0') {
                mesh.material = new THREE.MeshStandardMaterial({
                  map: video,
              });
              }

            });
}, [copiedScene]);

const onClickObject = (event: any) => {
  console.log(event)
}

  return (
      <primitive
          object={copiedScene}
          onClick={onClickObject}
      />
  )
}