import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from "../components/modal";

type RouterParams = {
  id: string;
}

type Post = {//typeを定義する理由はコードを見るだけでapiからどういったレスポンスが来ているのか把握できるため。
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updateAt: string;
  }

function PostDetail() {
    const {id} = useParams<RouterParams>();
    const [post, setPost] = useState<Post>();
    const [modal, setModal] = useState(false);

    const ShowModal = () => {
      setModal(true);
    };
    
    useEffect(() => {
        axios
        .get(`http://localhost:18080/v1/note/${id}`)            
        .then(response => {
            setPost(response.data);
        })                              
        .catch(() => {
            alert('通信に失敗しました');
        }); 
      }, [id]);

    return (
      <>
        {<p>{post?.title}</p>}{/**postがnullかundefinedでない時post.titleの値を返す*/}
        {<p>{post?.content}</p>}
        <Link to={`${id}/edit`}><button>Edit</button></Link>
        <button onClick={ShowModal}>Delete</button>
        <Modal showFlag={modal} setShowModal={setModal} content="本当に削除してよろしいですか"/>
      </>
    )

}

export default PostDetail;