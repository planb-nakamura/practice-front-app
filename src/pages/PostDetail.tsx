import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "../components/modal";
import { useQuery } from "react-query";
import styled from "styled-components";
import Loading from "../components/Loading";

const Div = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-top: 50px;
  font-size: 40px;
`;

const Date = styled.p`
  text-align: right;
  margin: 80px 0 80px 0;
`;

const Content = styled.p`
  font-size: 18px;
  line-height: 1.5;
`;

const EditButton = styled.a`
  position: fixed;
  bottom: 10px;
  right: 80px;
  width: 60px;
  height: 38px;
  background: #fff;
  border: 2px solid #2a82a3;
  -moz-border-radius: 70px;
  -webkit-border-radius: 70px;
  color: #2a82a3;
  padding: 42px 30px 20px;
  display: block;
  text-align: center;
  font-weight: bold;
  font-size: 120%;
  display: flex;
  justify-content: center;
  align-items: end;
  -webkit-transition: background-color 0.5s ease-in;
  &:hover {
    background: #2a82a3;
    color: #fff;
    border: 2px solid #fff;
  }
`;

const DeleteButton = styled(EditButton)`
  right: 10px;
`;

type RouterParams = {
  id: string;
};

const fetchPost = async (id: string) => {
  const res = await fetch(`http://localhost:18080/v1/note/${id}`);
  return res.json();
};

function PostDetail() {
  const { id } = useParams<RouterParams>();
  const [modal, setModal] = useState(false);

  const { data, isLoading } = useQuery("post", () => fetchPost(id));

  if (isLoading) {
    return <Loading />;
  }

  const ShowModal = () => {
    setModal(true);
  };

  return (
    <Div>
      <Title>{data.title}</Title>
      <Date>{data.createdAt}</Date>
      <Content>{data.content}</Content>
      <Link to={`${id}/edit`}>
        <EditButton>Edit</EditButton>
      </Link>
      <DeleteButton onClick={ShowModal}>Del</DeleteButton>
      <Modal
        showFlag={modal}
        setShowModal={setModal}
        content="本当に削除してよろしいですか？"
      />
    </Div>
  );
}

export default PostDetail;
