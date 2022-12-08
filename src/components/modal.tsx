import React, { ReactNode } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

type RouterParams = {
  id: string;
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as React.CSSProperties;

const modalContent = {
  background: "white",
  padding: "10px",
  borderRadius: "3px",
};


const Modal = (props: {
  content: ReactNode;
  setShowModal(arg0: boolean): unknown; showFlag: any; 
}) => {
  const {id} = useParams<RouterParams>();

  const onDelete = (id: string) => {
    axios.delete(`http://localhost:18080/v1/note/${id}`)
    .then(() => {
    window.location.href = "http://localhost:3000";
  });
};

const closeModal = () => {
  props.setShowModal(false);
};

  return (
    <>
      {props.showFlag ? ( 
        <div id="overlay" style={overlay}>
          <div id="modalContent" style={modalContent}>
            <p>{props.content}</p>
            <button onClick={closeModal}>閉じる</button>
            <button onClick={() => onDelete(id)}>削除</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;