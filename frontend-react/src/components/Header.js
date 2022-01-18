import {Menu} from "antd";
import {Link} from "react-router-dom";
import "../index.less";

function Header(){

  return(
    <Menu mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item><Link to="/meemzy">Meemzy</Link></Menu.Item>
      <Menu.Item><Link to="/memes">Memes</Link></Menu.Item>
      <Menu.Item><Link to="/account">Account</Link></Menu.Item>
    </Menu>
  )
};

export default Header;