import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import Button from "../components/Button";

const Title = styled.h1`
  font-size: 40px;
  word-wrap: break-word;
  &:first-child {
    margin-top: 50px;
  }
`;

const Date = styled.p`
  text-align: right;
  margin: 80px 0 80px 0;
`;

const Content = styled.p`
  font-size: 18px;
  line-height: 1.5;
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
    <>
      <Title>{data.title}</Title>
      <Date>{data.createdAt.slice(0, -14).replace(/-/g, "/")}</Date>
      <Content>{data.content}</Content>
      <Link to={`${id}/edit`}>
        <Button buttonName="Edit"></Button>
      </Link>
      <Button buttonName="Delete" onClick={ShowModal}></Button>
      <Modal
        showFlag={modal}
        setShowModal={setModal}
        content="本当に削除してよろしいですか？"
      />
    </>
  );
}

export default PostDetail;
