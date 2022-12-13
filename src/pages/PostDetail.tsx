import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from "../components/modal";
import { useQuery } from 'react-query';

type RouterParams = {
  id: string;
}

const fetchPost = async (id: string) => {
  const res = await fetch(
    `http://localhost:18080/v1/note/${id}`,
    { method: 'GET' }
  );
  return res.json();
}


function PostDetail() {
  const { id } = useParams<RouterParams>();
  const [modal, setModal] = useState(false);

  const { data, isLoading } = useQuery('posts', () => fetchPost(id));
  console.log(data);

  if (isLoading) {
    return <span>Loading...</span>
  }

  const ShowModal = () => {
    setModal(true);
  };
    
  return (
    <>
      <p>{data.title}</p>
      <p>{data.content}</p>
      <Link to={`${id}/edit`}><button>Edit</button></Link>
      <button onClick={ShowModal}>Delete</button>
      <Modal showFlag={modal} setShowModal={setModal} content="本当に削除してよろしいですか"/>
    </>
  )
    
}

export default PostDetail;