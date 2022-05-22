import { Button, Divider, Form, Input, Modal, Alert,Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../apis";
import { UserContext } from "../UserContext";
import clsx from "clsx";

function WelcomePage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState();
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const user = (await API.login(values)).data;
    setIsLoading(false);
    if (user.fullName) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("homepage");
    } else {
      console.log("login fail");
      setLoginFailed(true);
    }
  };

  const handleSignUp = async (values) => {
    const user = (
      await API.register({
        ...values,
        fullName: values.firstName + values.surName,
      })
    ).data;
    if (user.fullName) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("homepage");
    } else {
      setError(user.error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (user) navigate("homepage");
  }, []);

  return (
    <Spin spinning={isLoading}>
      <div className="bg-facebook-gray h-screen w-screen center pb-[120px] px-5 min-h-[700px] overflow-hidden">
        <Modal
          className="modal rounded-full"
          visible={showModal}
          title={
            <div className="w-full text-black flex flex-col justify-evenly gap-2">
              <span className="text-[32px] font-bold">Sign up</span>
              <span className="text-[15px] font-normal text-facebook-medium-gray">
                It's quick and easy.
              </span>
            </div>
          }
          onCancel={handleCloseModal}
          footer={false}
        >
          {error && <Alert message={error} type="error" className="my-4" />}
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={handleSignUp}
          >
            <Input.Group className="text-[17px] center gap-2">
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
                className="w-1/2"
              >
                <Input
                  className="rounded-lg h-[48px]"
                  placeholder="First Name"
                />
              </Form.Item>
              <Form.Item
                name="surName"
                rules={[
                  { required: true, message: "Please input your surname!" },
                ]}
                className="w-1/2"
              >
                <Input className="rounded-lg h-[48px]" placeholder="Surname" />
              </Form.Item>
            </Input.Group>

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your mobile phone or email address!",
                },
              ]}
            >
              <Input
                className="h-[48px] rounded-lg"
                placeholder="Mobile phone or email address"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            >
              <Input.Password
                className="h-[48px] rounded-lg"
                placeholder="New password"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                className="h-[48px] rounded-lg"
                placeholder="Confirm password"
              />
            </Form.Item>
            <Form.Item>
              <div key="Sign up" className="w-full center mb-[16px]">
                <Button
                  htmlType="submit"
                  className="w-2/5 h-[40px] bg-facebook-green font-bold text-white text-base rounded-lg hover:text-white hover:bg-[#36a420] hover:border-[#36a420] cursor-pointer focus:bg-facebook-green focus:text-white focus:border-facebook-green"
                >
                  Sign up
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
        <div className="flex justify-center items-center w-[980px] gap-2 md:flex-row flex-col">
          <div className="flex md:items-start items-center flex-col flex-1">
            <span className="text-facebook-blue font-bold text-6xl">
              facebook
            </span>
            <span className="text-3xl md:px-0 md:pb-0 px-8 pb-5">
              Facebook helps you connect and share with the people in your life.
            </span>
          </div>
          <div
            className={clsx([
              "bg-white rounded-lg w-[396px] h-[350px] p-4 shadow-xl",
              loginFailed ? "h-[400px]" : "h-[350px]",
            ])}
          >
            {loginFailed && (
              <Alert
                message={"Login failed"}
                type="error"
                className="mt-2 mb-4"
              />
            )}
            <Form
              name="basic"
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  className="h-[52px] px-4 py-[14px] text-[17px] rounded-lg"
                  placeholder="Email address or phone number"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  className="h-[52px] px-4 py-[14px] text-[17px] rounded-lg"
                  placeholder="Password"
                />
              </Form.Item>
              <Button
                htmlType="submit"
                className="w-full h-[48px] bg-facebook-blue font-extrabold text-white text-xl rounded-lg hover:text-white hover:bg-[#166fe5] hover:border-[#166fe5]"
              >
                Log In
              </Button>

              <Button type="link" className="w-full mt-2 underline">
                <span className="hover:underline">Forgotten Password?</span>
              </Button>
              <Divider className="mt-2 mb-4" />
              <div className="center w-full">
                <Button
                  className="w-[197px] h-[48px] bg-facebook-green text-white text-[17px] font-bold rounded-lg hover:text-white hover:bg-[#36a420] focus:bg-facebook-green focus:text-white focus:border-facebook-green hover:border-[#36a420]"
                  onClick={handleShowModal}
                >
                  Create New Account
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default WelcomePage;
