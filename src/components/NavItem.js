import clsx from "clsx";
import { Badge } from "antd";

function NavItem({ className, children, active, bordered, count }) {
  return (
    <div
      className={clsx([
        "cursor-pointer center",
        className,
        active && "active",
        !active && bordered && "hover-gray-light hover:rounded-lg my-[3.5px]",
      ])}
    >
      {count ? (
        <Badge count={count} overflowCount={9}>
          {children}
        </Badge>
      ) : (
        children
      )}
    </div>
  );
}

export default NavItem;
