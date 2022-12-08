import React, {useState} from 'react';
import axios from "axios";

function CreatePost(){
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

    const postData = () => {
        axios.post('http://localhost:18080/v1/note', {
            title,
            content
        }).then((res) => {
            console.log(res);
            window.location.href = "http://localhost:3000";
        });
    }

    return(
        <>
        <form>
            <label>タイトル</label>
            <input onChange={(e) => setTitle(e.target.value)}></input>
        </form>
        <textarea onChange={(e) => setContent(e.target.value)}></textarea>
        <button onClick={() => postData()}>Add</button>
        </>
        
    )
}

export default CreatePost;