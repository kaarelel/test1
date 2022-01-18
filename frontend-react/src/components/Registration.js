import {useHistory} from "react-router-dom/cjs/react-router-dom.min";
import {Form, Input, Button, message} from 'antd';
import {Link} from 'react-router-dom';

function Registration(){
  const history=useHistory();
  const onFinish=(values)=>{

    const registration={
      userName: values.username,
      email: values.email,
      firstName: values.firstname,
      lastName: values.lastname,
      password: values.password,
      passwordConfirmation: values.confirm,
    };
    fetch("http://localhost:8081/api/auth/signup",{
      method: "POST",
      body: JSON.stringify(registration),
      headers: {"Content-Type":"application/json"}
    }).then(response=>{
      if(response.ok){
        let successEvent="Account successfully created!"
        displaySuccess(successEvent);
        return history.replace("/account")
      }else{
        throw new Error("Error signing up!");
      }
    }).catch(error=>{
      displayError(error)
    });

  const displayError=(error)=>{
    message.error(error.toString());
  }

  const displaySuccess=(success)=>{
    message.success(success);
  }
  }

  return (
    <div>
      <h1>Create Your Account</h1>
      <Form
      name="register"
      scrollToFirstError
      onFinish={onFinish}
      >

        <h1>Username</h1>
        <Form.Item
          name="username"
          rules={[
          {
            required: true,
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
          <Input type="text" size="default"/>
        </Form.Item>

        <h1>Firstname</h1>
        <Form.Item
          name="firstname"
          rules={[
          {
            required: true,
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
          <Input type="text"/>
        </Form.Item>

        <h1>Lastname</h1>
        <Form.Item
          name="lastname"
          rules={[
          {
            required: true,
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
          <Input type="text"/>
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
            required: true,
            message: 'Please input your E-mail!',
          },
          ]}
        >
          <Input type="text"/>
        </Form.Item>

        <h1>Password</h1>
        <Form.Item
          name="password"
          rules={[
          {
            required: true,
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

        <h1>Confirm password</h1>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          {
            min: 6,
            message: 'Minimum length is 6 characters!',
          },
          ({getFieldValue})=>({
            validator(_, value){
            if(!value || getFieldValue('password')===value){
              return Promise.resolve();
            }

            return Promise.reject(new Error('Given passwords do not match!'));
            },
          }),
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
          Register
          </Button>
        </Form.Item>
      </Form>
      <Link to="/account">Already have an account?</Link>
    </div>
  )
}

export default Registration;