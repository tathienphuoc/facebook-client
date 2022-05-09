import clsx from "clsx";
import { Badge } from "antd";

function SideBarItem({
  imageSrc,
  text,
  notify,
  children,
  status,
  imageRounded = true,
  width="w-[35px]",
  height = "h-[35px]",
  onClick,
}) {
  return (
    <div
      className={clsx([
        "h-[45px] gap-2 flex items-center pr-4 pl-2 py-7 text-black rounded-l-lg cursor-pointer hover-strong-gray",
      ])}
      onClick={onClick}
    >
      {children ? (
        children
      ) : (
        <div className="relative">
          <img
            src={imageSrc}
            alt=""
            className={clsx([imageRounded && "rounded-full", width, height])}
          />
          {status ? (
            <div className="absolute bottom-0 right-0 w-[8px] h-[8px] rounded-full bg-facebook-green" />
          ) : (
            <></>
          )}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-sm font-medium">{text}</span>
        {notify && (
          <div className="flex items-center">
            <span className="w-[5px] h-[5px] bg-facebook-blue rounded-full mr-1"></span>
            <span className="text-xs text-facebook-blue font-semibold">
              {notify}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBarItem;
