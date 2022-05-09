import { Divider } from "antd";
import {
  avatar,
  DropIcon,
  friends,
  groups,
  marketplace,
  saved,
  watch,
} from "../assets/images";
import SideBarItem from "../components/SideBarItem";
import NavCircleItem from "./NavCircleItem";
import { useContext } from "react";
import { UserContext } from "../UserContext";

function SideBar() {
  const { user } = useContext(UserContext);

  return (
    <div className="h-screen 2xl:w-[360px] w-[300px] bg-facebook-gray overflow-y-scroll mt-[70px] ml-2 fixed left-0 scrollbar hidden xl:block">
      <SideBarItem text={user.fullName} imageSrc={user.avatar || avatar} />
      <SideBarItem text={"Friends"} imageSrc={friends} />
      <SideBarItem text={"Saved"} imageSrc={saved} />
      <SideBarItem text={"Groups"} imageSrc={groups} notify={"2 new"} />
      <SideBarItem text={"Marketplace"} imageSrc={marketplace} />
      <SideBarItem text={"Watch"} imageSrc={watch} notify={"9 new videos"} />
      <SideBarItem text={"See more"}>
        <NavCircleItem className="bg-facebook-strong-gray" seeMore>
          <DropIcon className="small-item" />
        </NavCircleItem>
      </SideBarItem>
      <Divider />
      <div className="h-[1000px]"></div>
    </div>
  );
}

export default SideBar;
