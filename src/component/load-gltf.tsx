import { useGLTF, useVideoTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

type Props = {
  file: string;
  setIsVideo: (value: boolean) => void;
  setUrl: (src: string) => void;
  setIsShow: (value: boolean) => void;
};
export function LoadGLTF(props: Props) {
  const { file, setIsVideo, setUrl, setIsShow } = props;
  const gltf = useGLTF(file);
  const copiedScene = useMemo(() => gltf?.scene.clone(), [gltf?.scene]);

  const imageTextureLoader = useMemo(() => new THREE.TextureLoader(), []);
  const video = useVideoTexture("./video.mp4", { muted: true });
  const poster = [
    "POSTER1",
    "POSTER2",
    "POSTER3",
    "POSTER4",
    "POSTER5",
    "Mesh238_M_13_0",
    "Mesh239_M_12_0"
  ];

  useEffect(() => {
    copiedScene.traverse((node: any) => {
      const mesh = node as THREE.Mesh;
      console.log("mesh", mesh);
      const material = mesh.material as THREE.Material;
      if (material && poster.includes(material.name)) {
        const path = `./${material.name}.jpg`;
        const imageTexture = imageTextureLoader.load(path);
        mesh.material = new THREE.MeshStandardMaterial({
          map: imageTexture
        });
        mesh.material.name = material.name;
      }
      if (material && material.name === "POSTER1") {
        mesh.addEventListener("onPointerOver ", onHoverObject);
      }
      if (material && material.name === "VIDEO1") {
        mesh.material = new THREE.MeshStandardMaterial({
          map: video
        });
        mesh.material.name = "VIDEO1";
      }
      if (mesh && mesh.name === "Mesh238_M_13_0") {
        const path = `./POSTER1.jpg`;
        const imageTexture = imageTextureLoader.load(path);
        mesh.material = new THREE.MeshStandardMaterial({
          map: imageTexture
        });
      }
      if (mesh && mesh.name === "Mesh239_M_12_0") {
        const path = `./POSTER2.jpg`;
        const imageTexture = imageTextureLoader.load(path);
        mesh.material = new THREE.MeshStandardMaterial({
          map: imageTexture
        });
      }
      if (mesh && mesh.name === "Mesh240_M_11_0") {
        mesh.material = new THREE.MeshStandardMaterial({
          map: video
        });
      }
    });
  }, [copiedScene]);

  const onClickObject = (event: any) => {
    const isVideoFound = isObjectFound(event, "VIDEO1");
    setIsVideo(isVideoFound);
    if (isVideoFound) {
      setUrl(`./video.mp4`);
      setIsShow(true);
    }
    poster.forEach((item) => {
      if (isObjectFound(event, item)) {
        setUrl(`./${item}.jpg`);
        setIsShow(true);
      }
    });
  };

  const isObjectFound = (event: any, name: string): boolean => {
    const { intersections } = event;
    const reducedIntersections = intersections.slice(0, 3);
    // reducedIntersections.map((item) => console.log(item.object.name));
    if (name === "Plane1835") {
      const objectFound = reducedIntersections.findIndex(
        (intersection: any) => intersection.object.name === name
      );
      return objectFound > -1;
    }
    const objectFound = reducedIntersections.findIndex(
      (intersection: any) => intersection.object.material.name === name
    );
    return objectFound > -1;
  };

  const onHoverObject = (event: any) => {
    isObjectFound(event, "POSTER1");
    // console.log(event);
    // const poster1 = isObjectHoverFound(event, "POSTER1");
    // const poster2 = isObjectHoverFound(event, "POSTER2");
    // const poster3 = isObjectHoverFound(event, "POSTER3");
    const poster5 = isObjectFound(event, "POSTER5");
    const video = isObjectFound(event, "Plane1835");
    if (poster5 || video) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }
  };

  const onPointerOut = () => {
    document.body.style.cursor = "auto";
  };

  return (
    <>
      <primitive
        object={copiedScene}
        onPointerOver={onHoverObject}
        onPointerOut={onPointerOut}
        onClick={onClickObject}
        scale={2}
      />
    </>
  );
}
