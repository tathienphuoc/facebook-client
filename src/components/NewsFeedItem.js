function NewsFeedItem({ text, icon, onClick }) {
  return (
    <div
      className="hover:bg-facebook-gray-light rounded-lg w-[156] center flex gap-2 cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <span className="text-base font-semibold text-facebook-medium-gray">
        {text}
      </span>
    </div>
  );
}

export default NewsFeedItem;
