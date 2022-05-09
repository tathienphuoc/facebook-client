import { Input } from "antd";
import { useContext } from "react";
import {
  AccountIcon,
  avatar,
  GamingIcon,
  GroupsIcon,
  HomeIcon,
  LogoIcon,
  logout,
  MarketplaceIcon,
  MenuIcon,
  MessengerIcon,
  NotificationsIcon,
  SearchIcon,
  WatchIcon,
} from "../assets/images";
import { UserContext } from "../UserContext";
import CAvatar from "./CAvatar";
import NavCircleItem from "./NavCircleItem";
import NavItem from "./NavItem";
import SideBarItem from "./SideBarItem";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { user, setUser, socket } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    socket.emit("offlineEvent", user);
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const content = (
    <div className="max-h-[350px] w-[300px] scrollbar overflow-y-auto">
      <SideBarItem
        text={"Log out"}
        imageSrc={logout}
        imageRounded={false}
        width={"w-[20px]"}
        height={"h-[20px]"}
        onClick={handleLogout}
      />
    </div>
  );

  return (
    <div className="fixed grid md:grid-cols-7 grid-cols-6 h-[55px] w-screen gap-5 pl-3 pr-8 bg-white shadow-md shadow-gray-200 z-50">
      <div className="h-full w-full col-span-2 flex items-center">
        <div className="w-full h-[40px] flex gap-2">
          <NavItem className="center">
            <LogoIcon className="large-item" />
          </NavItem>
          <div className="bg-facebook-gray w-[240px] h-full rounded-full px-3 center cursor-pointer">
            <label htmlFor="search" className="center cursor-pointer">
              <SearchIcon className="text-facebook-medium-gray" />
            </label>
            <Input
              placeholder="Search Facebook"
              className="bg-facebook-gray"
              bordered={false}
              id="search"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 h-full w-full col-span-3 justify-between px-4 text-facebook-medium-gray gap-2">
        <NavItem active>
          <HomeIcon className="fill-facebook-blue medium-item" />
        </NavItem>
        <NavItem bordered count={100}>
          <WatchIcon className="medium-item" />
        </NavItem>
        <NavItem bordered count={1}>
          <MarketplaceIcon className="medium-item" />
        </NavItem>
        <NavItem bordered>
          <GroupsIcon className="medium-item" />
        </NavItem>
        <NavItem bordered>
          <GamingIcon className="medium-item" />
        </NavItem>
      </div>
      <div className="h-full w-full md:col-span-2 flex items-center justify-end gap-2">
        <CAvatar src={avatar} text={"Thiên"} />
        <div className="lg:flex gap-2 hidden">
          <NavCircleItem>
            <MenuIcon className="small-item" />
          </NavCircleItem>
          <NavCircleItem>
            <MessengerIcon className="small-item" />
          </NavCircleItem>
          <NavCircleItem>
            <NotificationsIcon className="small-item" />
          </NavCircleItem>
          <NavCircleItem
            className=" hover:bg-facebook-strong-gray bg-facebook-gray-light bg-none"
            content={content}
          >
            <AccountIcon className="medium-item" />
          </NavCircleItem>
        </div>
      </div>
    </div>
  );
}

export default Nav;
