import {useContext} from "react";
import {Context} from "../store";
import {Form, Input, Button, message} from 'antd';
import {Link} from 'react-router-dom';
import {loginUser} from "../store/actions";

function Login(){
  const [state, dispatch]= useContext(Context)
  console.log(state)

  const onFinish= (values)=>{
    const loginAttempt={
      userName: values.userName,
      password: values.password,
    };
    fetch("http://localhost:8081/api/auth/login/",{
      method: "POST",
      body: JSON.stringify(loginAttempt),
      headers: {"Content-Type":"application/json"}
    }).then((response)=>{
      if(response.ok){
        fetchUserData(loginAttempt)
      }else{
        throw new Error("Input field has incorect credentials");
      }
    }).catch(error=>{
      displayError(error)
    });
  }

  function fetchUserData(loginAttempt){
    fetch("http://localhost:8081/api/auth/" + loginAttempt.userName)
    .then(response=>{
      return response.json();
    })
    .then(data=>{
      const loginState={
        username: loginAttempt.userName,
        token: data.password
      }
      dispatch(loginUser(loginState))
      displaySuccess("Login successful!")
    }).catch(error=>{
      displayError(error)
    });
  }

  const displayError=(error)=>{
    message.error(error.toString());
  }

  const displaySuccess=(success)=>{
    message.success(success);
  }
  
  return(
    <div>
      <h1>Log In</h1>
      <Form 
        name="basic"
        initialValues={{remember: true,}}
        autoComplete="off"
        onFinish={onFinish}
      >
      <br/>
      <h1>Username</h1>
      <Form.Item
        name="userName"
        rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
        ]}
      >
        <Input/>
      </Form.Item>
      <h1>Password</h1>
      <Form.Item
        label=""
        name="password"
        rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
        {
          min: 6,
          message: 'Minimum length is 6 characters!',
        }
        ]}
      >
        <Input.Password/>
      </Form.Item>
      <br/>
      <Form.Item wrapperCol={{}}>
        <Button type="primary" htmlType="login">
        Login
        </Button>
      </Form.Item>
      </Form>
      <Link to="account/registration">Create new account</Link>
    </div>
  );
};

export default Login;