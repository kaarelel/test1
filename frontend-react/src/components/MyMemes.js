import {useEffect, useState, useContext} from "react";
import {Context} from "../store";
import {message} from 'antd';
import {updateMemes} from "../store/actions";
import {Link} from "react-router-dom";
import {Col, Row} from "antd";

function MyMemes(){

  const[state, dispatch]=useContext(Context);
  const[memes, setMemes]=useState([]);

  useEffect(()=>{
    fetch("http://localhost:8081/api/meme/")
    .then(response=>{
      if(response.ok){
        return response.json();
      }else{
        throw new Error("Error fetching memes!");
      }
    })
    .then(data=>{
      dispatch(updateMemes(data));
      setMemes(data);
    })
    .catch(error=>{
      message.error(error.toString());
    });
  },[])

  return(
    <>
      <Col>
        <Row>
        {memes.map((meme, index)=>(state.auth.username===meme.userName &&( 
          <div key={index}>
            <Link to={`/memes/${meme.memeID}`}>
              <div>
                <b>{meme.memeName}</b>
                <br/>
                <img src={meme.imageURL} title={meme.memeName} width="150" height="150"/>
              </div>
            </Link>
          </div>
        )))}
        </Row>
      </Col>
    </>
  )
}

export default MyMemes;