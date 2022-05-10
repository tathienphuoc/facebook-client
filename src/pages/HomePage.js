import { Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../apis";
import ContactMenu from "../components/ContactMenu";
import Nav from "../components/Nav";
import NewsFeed from "../components/NewsFeed";
import SideBar from "../components/SideBar";
import { UserContext } from "../UserContext";

function App() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { user, socket } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = async () => {
    setPosts((await API.getPosts()).data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      socket.emit("onlineEvent", user);
      socket.on("online", (data) => {
        setFriends(data.filter((friend) => friend.id !== user.id));
      });
      socket.on("offline", (data) => {
        setFriends(data.filter((friend) => friend.id !== user.id));
      });
      getPosts();
    }
  }, []);

  return (
    user && (
      <>
        <Nav />
        <div className="bg-facebook-gray flex justify-center min-w-[650px]">
          <SideBar />
          <Spin spinning={isLoading}>
            <NewsFeed data={posts} />
          </Spin>
          <ContactMenu friends={friends} />
        </div>
      </>
    )
  );
}

export default App;
