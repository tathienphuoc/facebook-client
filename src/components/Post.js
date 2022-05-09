import { Avatar, Divider, Input, Popover, Upload, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import clsx from "clsx";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import API from "../apis";
import {
  avatar,
  CommentIcon,
  LikeIcon,
  LikeIcon2,
  PublicIcon,
  ShareIcon,
  ThreeDotIcon,
  watch,
  trash,
  edit,
} from "../assets/images";
import { UserContext } from "../UserContext";
import Comment from "./Comment";
import NewsFeedItem from "./NewsFeedItem";
import NavCircleItem from "./NavCircleItem";
import NavItem from "./NavItem";
import SideBarItem from "./SideBarItem";
import ModalPost from "./ModalPost";
import { getBase64 } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { LoadingOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

function Post({ post, deletePost, editPost }) {
  const { user, socket } = useContext(UserContext);
  const [openComments, setOpenComments] = useState(false);
  const [like, setLike] = useState(post.likes.includes(user.id));
  const [totalComment, setTotalComment] = useState(post.totalComment);
  const [totalLike, setTotalLike] = useState(post.totalLike);
  const [comments, setComments] = useState();
  const [comment, setComment] = useState("");

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [textPost, setTextPost] = useState();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState(false);
  const [files, setFiles] = useState([]);

  const [updatedPost, setUpdatedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const [socket, setSocket] = useState(() =>
  //   io("http://localhost:3001"/*, { transports: ["websocket", "polling"] }*/)
  // );

  useEffect(() => {
    socket.on("saveLike", (data) => {
      if (data.id === post.id) {
        setTotalLike(data.totalLike);
      }
    });
    socket.on("saveComment", (data) => {
      // console.log(data);
      if (data.post.id == post.id) {
        console.log(data);

        setTotalComment(totalComment + 1);
        if (openComments) {
          setComments([...comments, data]);
        }
      }
    });
  }, [totalComment]);

  useEffect(() => {
    setTextPost(post.text);
    setFiles(
      post.images
        ? post.images.map((url) => ({
            url,
          }))
        : []
    );
  }, [post]);

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

  const handleChangeUpload = ({ fileList }) => setFiles(fileList);

  const dummyRequest = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      if (file.type.split("/")[0] !== "image") {
        onError("You can only upload image!", "You can only upload image!");
      } else {
        onSuccess("ok");
      }
    }, 0);
  };

  const handleEditPost = async () => {
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("postId", post.id);
    formData.append("text", textPost);
    files.forEach((file) => {
      file.url && formData.append("urls", file.url);
    });
    files.forEach((file) =>
      formData.append("files", file.url || file.originFileObj)
    );
    setIsVisibleModal(false);
    setIsLoading(true);
    setUpdatedPost((await API.updatePost(formData)).data);
    setIsLoading(false);
  };

  // useEffect(() => console.log(updatedPost), [updatedPost]);

  const handleChangeTextPost = (e) => {
    setTextPost(e.target.value);
  };

  const getComments = async () => {
    setComments(
      totalComment === 0 ? [] : (await API.getComments(post.id)).data
    );
  };

  useEffect(() => openComments && getComments(), [openComments]);

  const handleDeletePost = async (e) => deletePost(post.id);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment) {
      const data = (
        await API.saveComment({
          userId: user.id,
          postId: post.id,
          text: comment,
        })
      ).data;
      socket.emit("commentEvent", data);

      setComment("");
      setComments([...comments, { text: comment, user }]);
      setTotalComment(totalComment + 1);
    }
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleOpenComments = () => {
    setOpenComments(true);
  };

  const toggleLike = async () => {
    const data = (await API.likePost(post.id, user.id)).data;
    socket.emit("likeEvent", data);
    setTotalLike(like ? totalLike - 1 : totalLike + 1);
    setLike(!like);
  };

  const content = (
    <div className="max-h-[350px] w-[300px] scrollbar overflow-y-auto">
      <SideBarItem
        text={"Edit post"}
        imageSrc={edit}
        imageRounded={false}
        width={"w-[20px]"}
        height={"h-[20px]"}
        onClick={handleShowModal}
      />
      <Divider className="my-1" />
      <SideBarItem
        text={"Move to recycle bin"}
        imageSrc={trash}
        notify={"Items in your recycle bin are deleted after 30 days"}
        imageRounded={false}
        width={"w-[20px]"}
        height={"h-[20px]"}
        onClick={handleDeletePost}
      />
    </div>
  );

  return (
    <Spin spinning={isLoading}>
      <div className="w-[600px] bg-white rounded-lg mt-4 shadow-md">
        <ModalPost
          isVisible={isVisibleModal}
          handleClose={handleCloseModal}
          handleSubmit={handleEditPost}
          text={textPost}
          handleChangeText={handleChangeTextPost}
        >
          <Upload
            listType="picture-card"
            fileList={files}
            // fileList={post?.images}
            onPreview={handlePreview}
            onChange={handleChangeUpload}
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
        <div className="mt-2 center px-4 pt-2">
          <div className="flex w-full gap-2 center">
            <Avatar
              size={40}
              src={post.user.avatar || avatar}
              className="cursor-pointer hover:opacity-80"
            />
            <div className="flex flex-col flex-1">
              <span className="text-base font-semibold cursor-pointer">
                {post.user.fullName}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[13px] text-facebook-medium-gray cursor-pointer">
                  {moment(post.createdAt, "h:mm:ssA MM/DD/YYYY").fromNow()}
                </span>
                <PublicIcon />
              </span>
            </div>
            <NavCircleItem
              className=" hover:bg-facebook-gray-light bg-none"
              content={post.user.id == user.id && content}
            >
              <ThreeDotIcon className="medium-item" />
            </NavCircleItem>
          </div>
        </div>
        <div className="text-base flex gap-2 flex-col w-full my-2">
          <span className="px-4">
            {updatedPost ? updatedPost.text : post.text}
          </span>
          {(updatedPost?.images || post.images) &&
            (updatedPost ? updatedPost.images : post.images)?.map((img) => (
              <img src={img} alt="" className="w-full h-full" key={uuidv4()} />
            ))}
          {/* <ReactPlayer
          url="https://streamable.com/ifjh"
          width="100%"
        /> */}
        </div>
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <div className="flex item-center">
              <LikeIcon />
              <LikeIcon className="ml-[-4px]" />
            </div>
            <span className="text-facebook-medium-gray flex-1">
              {totalLike}
            </span>
            <div className="text-facebook-medium-gray flex gap-2">
              <span
                onClick={handleOpenComments}
                className="cursor-pointer hover:underline"
              >
                {totalComment} comments
              </span>
              <span>{post.totalShare} share</span>
            </div>
          </div>
          <Divider className="mt-2 mb-1" />
          <div className="grid grid-cols-3 h-[40px]">
            <NewsFeedItem
              text={"Like"}
              icon={
                <LikeIcon2
                  className={clsx(
                    like ? "fill-facebook-blue" : "fill-facebook-medium-gray"
                  )}
                />
              }
              onClick={toggleLike}
            />
            <NewsFeedItem
              text={"Comment"}
              icon={<CommentIcon className="fill-facebook-medium-gray" />}
              onClick={handleOpenComments}
            />
            <NewsFeedItem
              text={"Share"}
              icon={<ShareIcon className="fill-facebook-medium-gray" />}
            />
          </div>
          {openComments && (
            <>
              <Divider className="mt-2 mb-1" />
              <div className="flex gap-2">
                <Avatar
                  size={28}
                  src={user.avatar || avatar}
                  className="cursor-pointer hover:opacity-80"
                />
                <TextArea
                  placeholder="Write a comment..."
                  className="pr-5 bg-facebook-gray-light focus:bg-facebook-gray-light w-[240px] rounded-2xl border-0 flex-1 hover-strong-gray"
                  bordered={false}
                  autoSize
                  autoFocus
                  onPressEnter={handleSubmitComment}
                  onChange={handleComment}
                  value={comment}
                  allowClear
                />
              </div>
              {openComments && post.totalComment > 0 && !comments && (
                <Spin indicator={antIcon} className="w-full py-2" />
              )}
              {comments &&
                comments
                  .slice(0)
                  .reverse()
                  .map((comment, index) => (
                    <Comment data={comment} key={index} />
                  ))}
            </>
          )}
        </div>
      </div>
    </Spin>
  );
}

export default Post;
