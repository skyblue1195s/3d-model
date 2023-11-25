import { Html, useGLTF, useVideoTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

type Props = {
  file: string;
};
export function LoadGLTF(props: Props) {
  const { file } = props;
  const gltf = useGLTF(file);
  const copiedScene = useMemo(() => gltf?.scene.clone(), [gltf?.scene]);

  const imageTextureLoader = useMemo(() => new THREE.TextureLoader(), []);
  const video = useVideoTexture("./video.mp4");
  let position = new THREE.Vector3();

  const poster = [
    "POSTER1",
    "POSTER2",
    "POSTER3",
    "POSTER4",
    "POSTER5",
    "Mesh238_M_13_0",
    "Mesh239_M_12_0",
  ];
  let meshData: THREE.Mesh | null = null;

  useEffect(() => {
    copiedScene.traverse((node: any) => {
      const mesh = node as THREE.Mesh;
      const material = mesh.material as THREE.Material;
      if (material && poster.includes(material.name)) {
        const path = `./${material.name}.jpg`;
        const imageTexture = imageTextureLoader.load(path);
        mesh.material = new THREE.MeshStandardMaterial({
          map: imageTexture,
        });
      }
      if (material && material.name === "VIDEO1") {
        position = mesh.position;
        const iframe = document.createElement("iframe");
        iframe.width = "480px";
        iframe.height = "360px";
        iframe.style.border = "0px";
        iframe.src = "https://www.youtube.com/embed/5h46b1Lm8DU?&autoplay=1";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        const texture = new THREE.Texture(iframe);
        texture.needsUpdate = true;
        const videoObject = new CSS3DObject(iframe);
        mesh.children = videoObject;
        // mesh.material = new THREE.MeshStandardMaterial({
        //   map: texture,
        // });
        // const videoObject = new CSS3DObject(iframe);
        // videoObject.position.set(mesh.position); // Position the video object at the desired location
        // console.log(mesh);
        // mesh.add(videoObject);
        // console.log(iframe);
        // const videoObject = new CSS3DObject(iframe);
        // videoObject.position.set(position.x, position.y, position.z);
        // videoObject.rotation.copy(mesh.rotation);
        // videoObject.scale.copy(mesh.scale);
        // mesh.add(videoObject);
      }
      if (mesh && mesh.name === "Mesh238_M_13_0") {
        const path = `./POSTER1.jpg`;
        const imageTexture = imageTextureLoader.load(path);
        mesh.material = new THREE.MeshStandardMaterial({
          map: imageTexture,
        });
      }
      if (mesh && mesh.name === "Mesh239_M_12_0") {
        const path = `./POSTER2.jpg`;
        const imageTexture = imageTextureLoader.load(path);
        mesh.material = new THREE.MeshStandardMaterial({
          map: imageTexture,
        });
      }
      if (mesh && mesh.name === "Mesh240_M_11_0") {
        // mesh.material = new THREE.MeshStandardMaterial({
        //   map: video,
        // });
        const iframe = document.createElement("iframe");
        iframe.style.width = "200px";
        iframe.style.height = "200px";
        iframe.style.border = "0px";
        iframe.src = "https://www.youtube.com/embed/5h46b1Lm8DU?&autoplay=1";
        const texture = new THREE.Texture(iframe);
        texture.needsUpdate = true;
        const material = new THREE.MeshBasicMaterial({
          map: texture,
        });

        mesh.material = material;
      }
    });
  }, [copiedScene]);

  const onClickObject = (event: any) => {
    console.log(event);
  };

  return (
    <primitive object={copiedScene} onClick={onClickObject}>
      {/* <Html wrapperClass="model" position={[0, 1.5, -1.5]} transform>
        <iframe
          width="1424"
          height="536"
          src="https://www.youtube.com/embed/y1JEtJqQXS4?list=RD5h46b1Lm8DU"
          title="KARIK - Mời Người Kế Tiếp (ft. Only C) | OFFICIAL MUSIC VIDEO"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </Html> */}
    </primitive>
  );
}
