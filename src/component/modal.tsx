import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

type Props = {
  type: "image" | "video";
  url: string;
  isShow: boolean;
};
export function ModalPopup(props: Props) {
  const { type, url, isShow } = props;
  const [show, setShow] = useState(isShow);

  useEffect(() => {
    setShow(isShow);
  }, [isShow, url]);

  return (
    <Modal show={show} onHide={() => setShow(false)} backdrop={false}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {type === "image" && (
          <img className="modal-content" id="img01" src={url} />
        )}
        {type === "video" && (
          <video className="w-100" height={300} controls autoPlay={true}>
            <source src={url} type="video/mp4" />
          </video>
        )}
      </Modal.Body>
    </Modal>
  );
}
