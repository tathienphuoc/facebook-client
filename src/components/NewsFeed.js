import { PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Divider,
  Input,
  Modal,
  Upload,
  Spin,
  Alert,
  message,
  Button,
  Space,
} from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import API from "../apis";
import ModalPost from "./ModalPost";
import {
  avatar,
  FeelingIcon,
  LiveIcon,
  PhotoIcon,
  PublicIcon,
} from "../assets/images";
import { UserContext } from "../UserContext";
import NewsFeedItem from "./NewsFeedItem";
import Post from "./Post";
import { getBase64 } from "../utils";
import { v4 as uuidv4 } from "uuid";

const { TextArea } = Input;

// const error = () => {
//   message.error("Please delete invalid media");
// };

function NewsFeed({ data }) {
  const { user } = useContext(UserContext);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [posts, setPosts] = useState();
  const [textPost, setTextPost] = useState();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState(false);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [validMedia, setValidMedia] = useState(true);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCloseModal = () => {
    setIsVisibleModal(false);
  };

  const handleShowModal = () => {
    setIsVisibleModal(true);
  };

  useEffect(() => setValidMedia(!files.some((file) => file.error)), [files]);

  const handleChange = ({ fileList }) => setFiles(fileList);

  const dummyRequest = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      if (file.type.split("/")[0] !== "image") {
        onError("You can only upload image!", "You can only upload image!");
      } else {
        onSuccess("ok");
      }
    }, 0);
  };

  useEffect(() => setPosts(data), [data]);

  const handleSubmitPost = async () => {
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("text", textPost);
    files.forEach((file) => formData.append("files", file.originFileObj));
    setIsLoading(true);
    const post = (await API.savePost(formData)).data;
    setFiles([]);
    setPosts([...posts, post]);
    setIsVisibleModal(false);
    setTextPost("");
    setIsLoading(false);
  };

  // const handleEditPost = async (formData) => {
  //   const post = (await API.updatePost(formData)).data;

  //   setPosts([posts.filter((p) => p.id !== post.id), post]);
  // };

  const handleEditPost = async (post) => {
    setPosts([posts.filter((p) => p.id !== post.id), post]);
    // console.log(post);
    // setPosts([...posts, post]);
  };

  const handleDeletePost = async (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
    await API.deletePost(postId, user.id);
  };

  const handleChangeTextPost = (e) => {
    setTextPost(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen mb-10 lg:mr-[340px] xl:mr-0">
      <ModalPost
        isVisible={isVisibleModal}
        handleClose={handleCloseModal}
        handleSubmit={validMedia ? handleSubmitPost : undefined}
        text={textPost}
        handleChangeText={handleChangeTextPost}
        isLoading={isLoading}
        disableSubmitButton={!validMedia}
      >
        <Upload
          listType="picture-card"
          fileList={files}
          onPreview={handlePreview}
          onChange={handleChange}
          customRequest={dummyRequest}
        >
          <div>
            <PlusOutlined />
            <div>Upload</div>
          </div>
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </ModalPost>
      <div className="bg-white h-[125px] w-[600px] mt-[70px] py-[12px] px-[10px] rounded-lg shadow-md">
        <div className="flex h-[40px] gap-2">
          <Avatar
            size={40}
            src={user.avatar || avatar}
            className="cursor-pointer hover:opacity-80"
          />
          <div
            className="flex items-center bg-facebook-gray-light w-[240px] rounded-full flex-1 hover-strong-gray cursor-pointer"
            onClick={handleShowModal}
          >
            <span className="flex-1 pl-3 text-base text-facebook-medium-gray">{`What's on your mind, ${user.fullName}?`}</span>
          </div>
        </div>
        <Divider className="mt-4 mb-2" />
        <div className="grid grid-cols-3 h-[40px]">
          <NewsFeedItem
            text={"Live video"}
            icon={<LiveIcon className="fill-[#f3425f]" />}
          />
          <NewsFeedItem
            text={"Photo/video"}
            icon={<PhotoIcon className="fill-[#45bd62]" />}
          />
          <NewsFeedItem
            text={"Feeling/Activity"}
            icon={<FeelingIcon className="fill-[#f7b928]" />}
          />
        </div>
      </div>
      {posts &&
        posts
          .slice(0)
          .reverse()
          .map((post) => (
            <Post
              post={post}
              deletePost={handleDeletePost}
              editPost={handleEditPost}
              // key={post.id}
              // key={JSON.stringify(post)}
              key={uuidv4()}
            />
          ))}
    </div>
  );
}

export default NewsFeed;
