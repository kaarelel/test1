import {useContext, useState} from "react";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";
import {Context} from "../store";
import {PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Upload, message} from "antd";
import {addMeme} from "../store/actions";
import "./pageStyles.css";

function MemeCreate(){
  const history=useHistory();
  const[state, dispatch]=useContext(Context);
  const initialState={
    fileList: []
  }
  const[fileList, setFileList]=useState({...initialState});
  const newMemeData=new FormData()


  const onFinish=(values)=>{
    createFormData(values);
    return fetch("http://localhost:8081/api/meme/create",{
      method: "POST",
      body: newMemeData
    }).then((response)=>{
      if(response.ok){
        message.success("Meme successfully created!")
        dispatch(addMeme(newMemeData))
        return history.replace("/account")
      }else{
        throw new Error("Error posting the meme!")
      }
    }).catch(error=>{
      message.error(error);
    });
  }

  const createFormData=(values)=>{
    newMemeData.append("userName", state.auth.username)
    newMemeData.append("memeName", values.memeName)
    newMemeData.append("image", fileList.fileList[0].originFileObj)
  }

  const handleChange=info=>{
    let infoList=[...info.fileList];
    infoList=infoList.slice(-1);
    setFileList({ fileList: [infoList[0]] });
  }

  const handleRemoval=()=>{
    setFileList({...initialState});
    return false;
  }

  const props={
  }

  if(state.auth.token==undefined || state.auth.token==null){
    return (
      <h1>Not logged in!</h1>
    )
  }else{
    return(
      <>
        <h1>Add a meme</h1>
        <br/>
        <Form
          name="createMeme"
          scrollToFirstError
          onFinish={onFinish}
        >
          <Form.Item>
            <Upload
              {...props}
              accept=".jpg,.png,.jpeg"
              onChange={handleChange}
              onRemove={handleRemoval}
              beforeUpload={()=>false}
              fileList={fileList.fileList}
              listType="picture-card"
              style={{minWidth:"1000px"}}
              >
              
              {fileList.fileList.length < 1 && <div ><PlusOutlined/><div >Upload</div></div>}
            </Upload>
          </Form.Item>
          <h1 style={{marginTop: "10px"}}>Meme name</h1>
          <Form.Item 
            name="memeName"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Input required!",
              },
              {
                max: 100,
                message: "Maximum characters: 50",
              }
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default MemeCreate;