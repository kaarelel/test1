import {Context} from "../store";
import {updateMemes} from "../store/actions";
import {useState, useEffect, useContext} from "react";
import {message, Select} from 'antd';
import {Link} from "react-router-dom";

function Memes(){
  const[state, dispatch]=useContext(Context);
  const[memes, setMemes]=useState([]);
  const{Option}=Select;

  useEffect(()=>{
    getMemes();

    async function getMemes(){
    fetch("http://localhost:8081/api/meme/")
    .then(response=>{
      if(response.ok){
        //console.log('See peaks teiste kasutajate memid ülesleidma')
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
  }
  },[])

  const checkAccount=(meme, index)=>{
    if(meme.userName==state.auth.username){
      return(
        <div key={index}>
        <div>
          <Link to={`/memes/${meme.memeID}`}><img src={meme.imageURL} width="150" height="150"/></Link>
          <Link to={`/memes/${meme.memeID}`}>
          <h2>{meme.memeName}</h2>
          </Link>
          <Link to={`/account`}>
          <p><b>Author: </b> {meme.userName}</p>
          </Link>
        </div>
        </div>

        
      )
    }
  }
  
    return(
    <>
      <h1>Memes</h1>
      <div>
        <div>
          <br/>
          {memes.map((meme, index)=>(
            checkAccount(meme, index)
          ))}
        </div>
      </div>
    </>
    )
}

export default Memes;