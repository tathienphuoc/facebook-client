import {
  avatar,
  NewRoomIcon,
  SearchIcon,
  ThreeDotIcon,
} from "../assets/images";
import SideBarItem from "../components/SideBarItem";
import NavCircleItem from "./NavCircleItem";
import API from "../apis";
import { UserContext } from "../UserContext";
import { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

function ContactMenu({ friends }) {
  return (
    <div className="h-screen w-[280px] lg:w-[320px] bg-facebook-gray overflow-y-scroll mt-[70px] fixed right-0 scrollbar pb-6  hidden lg:block">
      <div className="flex justify-between text-facebook-medium-gray items-center text-base">
        <span className="font-semibold">Contacts</span>
        <div className="flex gap-2">
          <NavCircleItem className="small-item">
            <NewRoomIcon className="center" />
          </NavCircleItem>
          <NavCircleItem className="small-item">
            <SearchIcon className="center" />
          </NavCircleItem>
          <NavCircleItem className="small-item">
            <ThreeDotIcon className="center small-item" />
          </NavCircleItem>
        </div>
      </div>
      {friends.length > 0 ? (
        friends.map((friend) => {
          console.log(friend);
          return (
            <SideBarItem
              text={friend.fullName}
              imageSrc={friend.avatar || avatar}
              status
              key={uuidv4()}
            />
          );
        })
      ) : (
        <span className="font-medium center pt-2 text-facebook-medium-gray">
          Your friends aren't online
        </span>
      )}
    </div>
  );
}

export default ContactMenu;
