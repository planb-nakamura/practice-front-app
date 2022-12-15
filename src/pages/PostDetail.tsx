import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from "../components/modal";
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Loading from '../components/Loading';

const Div = styled.div`
  width: 50%;
  margin: 0 auto;
`

const Title = styled.h1`
  
`

const Date = styled.p`
  text-align: right;
  margin: 50px 0 50px 0;
`

const Content = styled.p`
  overflow-wrap:  break-word;
`

const EditButton = styled.button`
  position: fixed;
  bottom: 10px; 
  right: 80px;
  width: 60px;
	height: 38px;
	background: #FFF;
	border: 2px solid #2a82a3;
	-moz-border-radius: 70px;
	-webkit-border-radius: 70px;
	color: #2a82a3;
	padding: 42px 30px 20px;
	display: block;
	text-align: center;
	font-weight: bold;
	font-size: 120%;
	-webkit-transition: background-color 0.5s ease-in;
  &:hover{
    background: #2a82a3;
	  color: #FFF;
	  border: 2px solid #FFF;
}`

const DeleteButton = styled.button`
  position: fixed;
  bottom: 10px; 
  right: 10px;
  width: 60px;
	height: 38px;
	background: #FFF;
	border: 2px solid #2a82a3;
	-webkit-border-radius: 70px;
	color: #2a82a3;
	padding: 42px 30px 20px;
	display: block;
	text-align: center;
	font-weight: bold;
	font-size: 120%;
	-webkit-transition: background-color 0.5s ease-in;
  &:hover{
    background: #2a82a3;
	  color: #FFF;
	  border: 2px solid #FFF;
}`

type RouterParams = {
  id: string;
}

const fetchPost = async (id: string) => {
  const res = await fetch(
    `http://localhost:18080/v1/note/${id}`,
    { method: 'GET' }
  );
  console.log(res)
  return res.json();
}


function PostDetail() {
  const { id } = useParams<RouterParams>();
  const [modal, setModal] = useState(false);

  const { data, isLoading } = useQuery('posts', () => fetchPost(id));
  console.log(data);

  if (isLoading) {
    return <Loading/ >
  }
  
  const ShowModal = () => {
    setModal(true);
  };
    
  return (
    <Div>
      <Title>{data.title}</Title>
      <Date>{data.createdAt}</Date>
      <Content>{data.content}</Content>
      <Link to={`${id}/edit`}><EditButton>Edit</EditButton></Link>
      <DeleteButton onClick={ShowModal}>Delete</DeleteButton>
      <Modal showFlag={modal} setShowModal={setModal} content="本当に削除してよろしいですか"/>
    </Div>
  )
}

export default PostDetail;