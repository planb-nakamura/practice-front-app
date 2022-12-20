import React, { ReactNode } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

type RouterParams = {
  id: string;
};

const Div = styled.div`
  position: "fixed";
  top: 0;
  left: 0;
  width: "100%";
  height: "100%";
  background-color: "rgba(0,0,0,0.5)";
  display: "flex";
  align-items: "center";
  justify-content: "center";
`;

const Divin = styled.div`
  background: "white";
  padding: "10px";
  border-radius: "3px";
`;

const Modal = (props: {
  content: ReactNode;
  setShowModal(arg0: boolean): unknown;
  showFlag: any;
}) => {
  const { id } = useParams<RouterParams>();

  const deletePost = async (id: string) => {
    //なぜ引数をid: RouterParamsとするとエラーが出るのか
    await fetch(`http://localhost:18080/v1/note/${id}`, { method: "DELETE" });
    window.location.href = "http://localhost:3000"; //ここ変更
    // history.push('/');
  };

  const closeModal = () => {
    props.setShowModal(false);
  };

  return (
    <>
      {props.showFlag ? (
        <Div>
          <Divin>
            <p>{props.content}</p>
            <button onClick={closeModal}>閉じる</button>
            <button onClick={() => deletePost(id)}>削除</button>
          </Divin>
        </Div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
