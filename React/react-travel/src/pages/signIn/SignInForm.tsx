import styles from "./SignInForm.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { signIn } from "../../redux/user/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const SignInForm = () => {

  const loading = useSelector(s => s.user.loading)
  const jwt = useSelector(s => s.user.token)  // 获取到token，并且会自动的持久化
  const error = useSelector(s => s.user.error)

  const dispatch = useDispatch();
  const history = useHistory();

  // 如果token不为空，说明用户已经登录，跳转到首页
  // 这里监听jwt,当调用signIn接口后,会生成token,token会被存储到store中,则useSelector会监听到jwt的变化
  // 再次执行useEffect,然后跳转到首页
  useEffect(()=>{ 
    if(jwt !== null) {
      history.push("/");
    }
  }, [jwt])

  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(signIn({
      email: values.username,
      password: values.password
    }))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
