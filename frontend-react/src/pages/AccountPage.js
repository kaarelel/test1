import {useContext} from "react";
import {Context} from "../store";
import {Button} from "antd";
import {Link} from "react-router-dom";
import React from "react";
import Login from "../components/Login";
import {logoutUser} from "../store/actions";
import MyMemes from "../components/MyMemes";

function AccountPage(){
  const[state, dispatch]=useContext(Context);

  function logout(){
    dispatch(logoutUser());
  }

  if(state.auth.token==undefined){
    return(
      <Login></Login>
    )
  }else{
    return(
      <div>
        <h1>{state.auth.username}</h1>
        <br/>
        <Link to="/account/edit">
          <Button type="primary" htmlType="button">Edit account</Button>
        </Link>
        <span>
          <Button type="default" htmlType="logout" onClick={()=>logout()}>Logout</Button>
        </span>
        <br/>
        <br/>
        <h1>My Memes</h1>
        <Link to="/create">Create a new meme</Link>
        <br/>
        <br/>
        <MyMemes></MyMemes>
      </div>
    )
  }
}

export default AccountPage;