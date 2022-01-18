import FollowedMemes from "../components/FollowedMemes";
import LikedMemes from "../components/LikedMemes";
import {Context} from "../store";
import {useContext, useState} from "react";
import {Dropdown, Menu} from "antd";
import {DownOutlined} from '@ant-design/icons';

function Meemzy(){
  const[state]=useContext(Context);
  const[key, setKey]=useState(1);

  const onClick =({key})=>{
    setKey(key)
  }

  const menu=(
    <Menu onClick={onClick}>
      <Menu.Item key="1">Your followed users</Menu.Item>
      <Menu.Item key="2">Your liked memes</Menu.Item>
    </Menu>
  )

  if(state.auth.token==undefined){
    return(
      <div>
        <h1>Meemzy</h1>
        <h3>Log in to use this page</h3>
      </div>
    )
  }else{
    if(key==1){
      return(
        <div>
          <h1>Your followed users' memes</h1>
          <Dropdown overlay={menu} placement="bottomCenter">
          <b className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Filter <DownOutlined />
          </b>
          </Dropdown>
          <FollowedMemes></FollowedMemes>
        </div>
      )
    }else{
      return (
        <div>
          <h1>Your liked memes</h1>
          <Dropdown overlay={menu} placement="bottomCenter">
          <b className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Filter <DownOutlined />
          </b>
          </Dropdown>
          <LikedMemes></LikedMemes>
        </div>
      )
    }
  }
}

export default Meemzy;