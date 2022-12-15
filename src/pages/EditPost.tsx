import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useQuery, QueryClient, useMutation } from 'react-query';
import { css } from "@emotion/react";
import Loading from '../components/Loading';
import styled from 'styled-components';
import { MissedVideoCallRounded } from '@material-ui/icons';

const Div = styled.div`
  width: 50%;
  margin: 0 auto;
`

const Middle = styled.div`
    text-align: center;
`
const Input = styled.input`
    width: 100%;
    margin-top: 50px;
    padding: 20px;
    font-size: 120%;
    border: 3px solid #dcdcdc;
    box-sizing:border-box;
`

const Textarea = styled.textarea`
    width: 100%;
    margin-top: 50px;
    padding: 20px;
    font-size: 120%;
    min-height: 400px;
    resize: none;
    border: 3px solid #dcdcdc;
    box-sizing:border-box;
`

const Submit = styled.button`
    color: #FFF;
    text-decoration: none;
    font-weight: bold;
    background: #000;
    border: 2px solid #000;
    border-radius: 5px;
    padding: 15px 20px;
    margin-top: 10px;
    width: 30%;
    &:hover{
    background: #FFF;
	color: #000;
    -webkit-transition: background-color 0.5s ease-in;
}`

type RouterParams = {
    id: string;
}

function EditPost(){
    const { id } = useParams<RouterParams>();
    const queryClient = new QueryClient();

    const fetchPost = async (id: string) => {
        const res = await fetch(
          `http://localhost:18080/v1/note/${id}`,
          { method: 'GET' }
        );
        return res.json();
      }

    const { data, isLoading } = useQuery('posts', () => fetchPost(id));

    if (isLoading) {
        return <Loading/ >
    }

    // const updateData = () => {
    //     axios.post(`http://localhost:18080/v1/note/${id}`, {
    //         title,
    //         content
    //     }).then(() => { 
    //         window.location.href = `http://localhost:3000/post/${id}`;
    //     }).catch((e) => console.log(e.response.data))
    // }

    // const mutation = useMutation(updateData, {
    //     onSuccess: () => {
    //         // `posts`キーのクエリを無効化して再取得
    //         queryClient.invalidateQueries('posts');
    //       },
    // })

    /** return文終了後（レンダリング後）に実行される*/
    // useEffect(() => {
    //     axios
    //     .get(`http://localhost:18080/v1/note/${id}`)            
    //     .then(response => {
    //         console.log(response);
    //         setTitle(response.data.title);
    //         setContent(response.data.content);
    //     })                              
    //     .catch((e) => {
    //         console.log(e.response.data)
    //     }); 
    //   }, [id]);

    /** useEffectより先に実行される*/
    return (
      <Div>
        <form>
            <Input value={data.title}></Input>
        </form>
        <Textarea value={data.content}></Textarea>
        {/** <input defaultValue={post?.title} onChange={(e) => {setTitle(e.target.value)}}></input>
         * <input defaultValue={post?.content} onChange={(e) => {setContent(e.target.value)}}></input>だと二つとも変更しない（いじらない）と更新されない*/}
        <Middle><Submit>Edit</Submit></Middle>
      </Div>
    )
}

export default EditPost;