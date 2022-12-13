import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

type RouterParams = {
    id: string;
}

function EditPost(){
    const { id } = useParams<RouterParams>();
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

    const updateData = () => {
        axios.put(`http://localhost:18080/v1/note/${id}`, {
            title,
            content
        }).then(() => { 
            window.location.href = `http://localhost:3000/post/${id}`;
        }).catch((e) => console.log(e.response.data))
    }

    /** return文終了後（レンダリング後）に実行される*/
    useEffect(() => {
        axios
        .get(`http://localhost:18080/v1/note/${id}`)            
        .then(response => {
            console.log(response);
            setTitle(response.data.title);
            setContent(response.data.content);
        })                              
        .catch((e) => {
            console.log(e.response.data)
        }); 
      }, [id]);

    /** useEffectより先に実行される*/
    return (
      <>
        <form>
            <label>タイトル</label>
            <input value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
        </form>
        <textarea value={content} onChange={(e) => {setContent(e.target.value)}}></textarea>
        {/** <input defaultValue={post?.title} onChange={(e) => {setTitle(e.target.value)}}></input>
         * <input defaultValue={post?.content} onChange={(e) => {setContent(e.target.value)}}></input>だと二つとも変更しない（いじらない）と更新されない*/}
        <button onClick={() => updateData()}>Edit</button>
      </>
    )
}

export default EditPost;