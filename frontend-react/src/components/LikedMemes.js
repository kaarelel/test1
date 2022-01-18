import{Context} from "../store";
import{useState, useEffect, useContext} from "react";
import{message} from 'antd';
import{Link} from "react-router-dom";

function LikedMemes(){
  const[state]=useContext(Context);
  const[memes, setMemes]=useState([]);

  useEffect(()=>{
    getMemes();
  },[])

  function getMemes(){
    fetch("http://localhost:8081/api/meme/like/" + state.auth.username)
    .then(response=>{
      if(response.ok){
        return response.json();
      }else{
        throw new Error("Error fetching liked memes!");
      }
    })
    .then(data=>{
      setMemes(data);
    })
    .catch(error=>{
      message.error(error.toString());
    });
  }

  const displayLikedUserMemes=(meme, index)=>{
    return (
      <div style={{backgroundColor: "rgb(240, 240, 240)", paddingTop: "5px", minHeight:"170px", minWidth:"400px", padding: "10px", borderRadius: "5px", display: "", marginBottom: "10px", textAlign: "left"}} key={index}>
        <Link to={`/memes/${meme.memeID}`}><img src={meme.imageURL} width="150" height="150" style={{ float: "left", marginRight: "10px", cursor: "pointer"}}/></Link>
        <Link to={`/memes/${meme.memeID}`}>
        <h2 style={{color:"black"}}>{meme.memeName}</h2>
        </Link>
        <Link to={`/user/${meme.userName}`}>
        <p style={{color:"black"}}><b>Author:</b>{meme.userName}</p>
        </Link>
      </div>
    )
  }
  
  if(memes.length==0){
    return (<h3>Like memes to start seeing them here</h3>)
  }else{
    return(
      <div>
        {memes.map((meme, index)=>(
          displayLikedUserMemes(meme, index)
        ))}
      </div>
    )
  }
}

export default LikedMemes;