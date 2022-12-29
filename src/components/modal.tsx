import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

type RouterParams = {
  id: string;
};

const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divin = styled.div`
  background: #ffffff;
  padding: 120px 80px 40px;
  border: 3px solid #dcdcdc;
  border-radius: 5px;
`;

const Up = styled.button`
  display: block;
  margin: 60px auto 0;
  padding: 15px 50px;
  background-color: #000000;
  color: #ffffff;
  font-weight: bold;
  border: 1px solid #000000;
  border-radius: 5px;
`;

const Down = styled.button`
  display: block;
  margin: 20px auto 0;
  padding: 15px 30px;
  background-color: #7d7d7d;
  color: #ffffff;
  font-weight: bold;
  border: 1px solid #555555;
  border-radius: 5px;
`;

const Modal = (props: {
  content: string;
  setShowModal(arg0: boolean): unknown;
  showFlag: boolean;
}) => {
  const { id } = useParams<RouterParams>();
  const history = useHistory();

  const deletePost = async (id: string) => {
    //なぜ引数をid: RouterParamsとするとエラーが出るのか
    await fetch(`http://localhost:18080/v1/note/${id}`, { method: "DELETE" });
    history.push("/");
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
            <Up onClick={closeModal}>閉じる</Up>
            <Down onClick={() => deletePost(id)}>削除</Down>
          </Divin>
        </Div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
