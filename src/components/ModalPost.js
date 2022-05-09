import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Divider, Input, Modal, Upload, Spin, Alert } from "antd";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { UserContext } from "../UserContext";
import {
  avatar,
  FeelingIcon,
  LiveIcon,
  PhotoIcon,
  PublicIcon,
} from "../assets/images";
import clsx from "clsx";

const { TextArea } = Input;

function ModalPost({
  isVisible,
  handleClose,
  handleSubmit,
  text,
  handleChangeText,
  children,
  editModal,
  isLoading = false,
  disableSubmitButton=false,
}) {
  const { user } = useContext(UserContext);

  return (
    <Modal
      className="modal"
      visible={isVisible}
      title={
        <div className="w-full font-bold text-black text-xl center">
          {editModal ? "Edit Post" : "Create Post"}
        </div>
      }
      onCancel={isLoading ? undefined : handleClose}
      footer={[
        <div
          key="create Post"
          className={clsx([
            "w-full h-[48px] font-bold text-white text-base rounded-lg hover:text-white center",
            isLoading || disableSubmitButton
              ? "bg-facebook-gray cursor-not-allowed"
              : "bg-facebook-blue hover:bg-[#166fe5] hover:border-[#166fe5] cursor-pointer",
          ])}
          onClick={isLoading ? undefined : handleSubmit}
        >
          {editModal ? "Save" : "Post"}
        </div>,
      ]}
    >
      <Spin spinning={isLoading}>
        <div className="flex w-full gap-2 center">
          <Avatar
            size={40}
            src={user.avatar || avatar}
            className="cursor-pointer hover:opacity-80"
          />
          <div className="flex flex-col flex-1">
            <span className="text-base font-semibold cursor-pointer">
              {user.fullName}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[13px] text-facebook-medium-gray cursor-pointer">
                {moment().fromNow()}
              </span>
              <PublicIcon />
            </span>
          </div>
        </div>
        <TextArea
          className="mt-4 w-[full] p-0 text-2xl"
          bordered={false}
          autoFocus
          placeholder={`What's on your mind, ${user.fullName}?`}
          autoSize={{ minRows: 5 }}
          value={text}
          onChange={handleChangeText}
        />
        <div className="m-auto">{children}</div>
      </Spin>
    </Modal>
  );
}

export default ModalPost;
