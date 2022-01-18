import {useContext, useState, useEffect, useRef} from "react"
import {useParams} from "react-router";
import OtherUserMemes from "../components/OtherUserMemes";
import {UserAddOutlined, UserDeleteOutlined} from '@ant-design/icons';
import {Button, message, Tooltip} from "antd";
import {Context} from "../store";
import "./pageStyles.css";

function OtherUserPage(){
  const[state]=useContext(Context)
  const[data, setData]=useState([]);
  const[setUser]=useState([]);
  const{userName}=useParams();
  var tempArray=[];
  
  useEffect(()=>{
    followedUsersArray();
  },[data])

  async function followedUsersArray(){
    fetch("http://localhost:8081/api/meme/followed/" + state.auth.username)
    .then(response=>{
      if(response.ok){
        return response.json();
      }else{
        throw new Error("Error fetching memes!");
      }
    })
    .then(allData=>{
      for(var i=0; i<allData.length; i++){
        tempArray.push(allData[i].userName)
      }
      setData(tempArray)
    })
    .catch(error=>{
      message.error(error.toString());
    });
  }

  const followUser=()=>{
    const data={
      followedUser: userName,
      followingUser: state.auth.username
    }
    fetch("http://localhost:8081/api/auth/follow",{
      method: "PUT",
      body: JSON.stringify(data),
      headers:{"Content-Type":"application/json"}
    }).then(response=>{
      if(response.ok){
        return response.json()
      }else{
        throw new Error("User has already been followed")
      }
    }).then(()=>{
      message.success("User followed successfully!")
    }).catch(error=>{
      message.error(error.toString())
    });
  }

  const unFollowUser=()=>{
    const data={
      followedUser: userName,
      followingUser: state.auth.username
    }
    fetch("http://localhost:8081/api/auth/unfollow",{
      method: "PUT",
      body: JSON.stringify(data),
      headers:{"Content-Type":"application/json"}
    }).then(response=>{
      if(response.ok){
        return response.json()
      }else{
        throw new Error("User has already been unfollowed")
      }
    }).then(()=>{
      message.success("User unfollowed successfully!")
    }).catch(error=>{
      message.error(error.toString())
    });
  }

  useEffect(()=>{
    getUser();

    async function getUser(){
    fetch("http://localhost:8081/api/auth/" + userName)
    .then(response=>{
      if(response.ok){
        return response.json();
      }else{
        throw new Error("Error fetching memes!");
      }
    })
    .then(userData=>{
      setUser(userData);
    })
    .catch(error=>{
      message.error(error.toString());
    });
  }
  },[])

  const form=useRef();

  if(data.includes(userName)){
    return(
      <div style={{padding:"10px 30px", width:"400px"}}>
        <div style={{minHeight: "110px"}}>
          <h1 style={{fontWeight:"700", textAlign:"left", marginLeft:"125px"}}>{userName}'s memes</h1>
          <Tooltip placement="right" title="Unfollow"><Button icon={<UserDeleteOutlined/>} shape="circle" style={{border:"none", float:"left", marginLeft:"5px"}} onClick={unFollowUser}></Button></Tooltip>
        </div>
        <p className="footer" style={{ margin: "10px 3% 10px 3%" }}/>
        <OtherUserMemes></OtherUserMemes>
      </div>
      
    )
  }else{
    return(
      <div style={{padding:"10px 30px", width:"400px"}}>
        <div style={{minHeight: "110px"}}>
          <h1 style={{fontWeight:"700", textAlign:"left", marginLeft:"125px"}}>{userName}'s memes</h1>
          <form ref={form}>
            <input type="text" name="to_name" value={userName} style={{display:"none"}}/>
            <input type="text" name="from_name" value={state.auth.username} style={{display:"none"}}/>
          <Tooltip placement="right" title="Follow"><Button icon={<UserAddOutlined/>} shape="circle" style={{border:"none", float:"left", marginLeft:"5px"}} htmlType="submit" onClick={followUser}></Button></Tooltip>
          </form>
        </div>
        <p className="footer" style={{ margin: "10px 3% 10px 3%" }}/>
        <OtherUserMemes></OtherUserMemes>
      </div>
    )
  }
}

export default OtherUserPage;