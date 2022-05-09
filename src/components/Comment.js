import { Avatar } from "antd";
import { avatar } from "../assets/images";

function Comment({ data }) {
  return (
    <div className="mt-2 flex justify-start text-sm">
      <div className="flex gap-2">
        <Avatar
          size={28}
          src={data.user?.avatar || avatar}
          className="cursor-pointer hover:opacity-80"
        />
        <div className="flex flex-col flex-1 bg-facebook-gray-light py-2 px-4 rounded-2xl">
          <span className="font-semibold cursor-pointer">
            {data.user.fullName}
          </span>
          <span className="text-facebook-medium-gray cursor-pointer"></span>
          {data?.text}
        </div>
      </div>
    </div>
  );
}

export default Comment;
