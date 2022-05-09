import { Avatar } from "antd";
import clsx from "clsx";

function CAvatar({ src, text, className,size }) {
  return (
    <div
      className={clsx([
        "h-[35px] w-[90px] gap-1 flex items-center justify-evenly hover-gray-light rounded-full cursor-pointer",
        className,
      ])}
    >
      <Avatar size={size||28} src={src}/>
      {text && <span className="text-base font-semibold pr-1">{text}</span>}
    </div>
  );
}

export default CAvatar;
