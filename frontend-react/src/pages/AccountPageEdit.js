import {Button, Input, Form} from "antd";
import React from "react";
import {Context} from "../store";
import {useState, useContext, useEffect} from "react";
import {updateUser, logoutUser} from "../store/actions";
import {message} from 'antd';
import Login from "../components/Login";

function AccountPageEdit(){

  const[state, dispatch]= useContext(Context);
  const[user, setUser]= useState([]);
  const[form]= Form.useForm();
  
    useEffect(()=>{
    fetch("http://localhost:8081/api/auth/" + state.auth.username)
    .then(response=>{
      if(response.ok){
        return response.json();
      }else{
        throw new Error("error fetching users!");
      }
    })
    .then(data=>{
      console.log(data);
      dispatch(updateUser(data));
      setUser(data);
      form.setFieldsValue({
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      })
    })
    .catch(error=>{
      displayError(error)
    });
  },[])

  const displayError= (error)=>{
    message.error(error.toString());
  }

  const onFinish= (values)=>{
    var update= {};

    if(values.password!= undefined){
      update= {
        userName: values.userName,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
      };
    }else{
      update= {
        userName: values.userName,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        passwordConfirmation: values.passwordConfirmation,
      };
    }
    fetch(`http://localhost:8081/api/auth/${user.userName}`,{
      method: "PUT",
      body: JSON.stringify(update),
      headers: {"Content-Type":"application/json"}
    }).then(response=>{
      if(response.ok){
        let successEvent= "Account successfully updated! Please log in again"
        displaySuccess(successEvent);
        dispatch(logoutUser());
      }else{
        console.log(update)
        throw new Error("Error updating account!");
      }
    }).catch(error=>{
      displayError(error)
    });

  const displayError= (error)=>{
    message.error(error.toString());
  }

  const displaySuccess= (success)=>{
    message.success(success);
  }
  }

  if(state.auth.token== undefined){
    return (
      <Login></Login>
    )
  }else{
  return (
    <div>
      <h1>Edit Account</h1>
      <div>
      <Form 
        name="basic"
        form={form}
        initialValues={{remember: true,}}
        autoComplete="off"
        style={{ margin:"30px"}}
        onFinish={onFinish}
      >
      <div>

        <h2>username:</h2>
        <Form.Item
          name="userName"
          rules={[
          {
            required: false,
            message: 'Please input your username!',
            whitespace: true,
          },
          {
            min: 6,
            message: 'Minimum length is 6 characters!',
            whitespace: true,
          },
          ]}
        >
          <Input size="default"/>
        </Form.Item>

        <h1>Firstname</h1>
        <Form.Item
          name="firstName"
          rules={[
          {
            required: false,
            message: 'Please input your first name!',
            whitespace: true,
          },
          {
            min: 3,
            message: 'Minimum length is 3 characters!',
            whitespace: true,
          },
          ]}
        >
          <Input/>
        </Form.Item>

        <h1>Lastname</h1>
        <Form.Item
          name="lastName"
          rules={[
          {
            required: false,
            message: 'Please input your last name!',
            whitespace: true,
          },
          {
            min: 3,
            message: 'Minimum length is 3 characters!',
            whitespace: true,
          },
          ]}
        >
          <Input/>
        </Form.Item>

        <h1>Email</h1>
        <Form.Item
          name="email"
          rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: false,
            message: 'Please input your E-mail!',
          },
          ]}
        >
          <Input/>
        </Form.Item>

        <h1>New Password</h1>
        <Form.Item
          name="password"
          rules={[
          {
            required: false,
            message: 'Please input your password!',
          },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            message: "Password must contain atleast: 1 lowercase letter, 1 uppercase letter, 1 number"
          },
          {
            min: 6,
            message: 'Minimum length is 6 characters!',
          }
          ]}
          hasFeedback
        >
          <Input.Password/>
        </Form.Item>

        <h1>Confirm New Password</h1>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
          {
            required: false,
            message: 'Please confirm your password!',
          },
          {
            min: 6,
            message: 'Minimum length is 6 characters!',
          },
          ({getFieldValue})=>({
            validator(_, value) {
            if(!value || getFieldValue('password')=== value){
              return Promise.resolve();
            }

            return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <h1>Save Profile Changes</h1>
        <Form.Item>
          <Button type="primary" htmlType="submit">
          Save
          </Button>
        </Form.Item>
      </div>
      </Form>
      </div>
    </div>
  )
    }
}

export default AccountPageEdit;