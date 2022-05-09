import { Popover, Divider } from "antd";
import clsx from "clsx";
import { ThreeDotIcon, watch } from "../assets/images";
import NavItem from "./NavItem";
import SideBarItem from "./SideBarItem";

function NavCircleItem({ small, medium, large, children, className, content }) {
  return (
    <Popover
      className={clsx([
        "rounded-full w-[40px] h-[40px] hover-strong-gray cursor-pointer",
        className,
        !className && "bg-facebook-gray ",
      ])}
      placement="bottomRight"
      // title={<span>Title</span>}
      content={content}
      trigger="click"
    >
      <div className="center">{children}</div>
    </Popover>
  );
}

export default NavCircleItem;
