import { useEffect, useState, useRef } from "react";
import ContentEditable from "react-contenteditable";

function EditableBlock(props) {
  const [html, setHtml] = useState(props.html);
  const [tag, setTag] = useState(props.tag);
  const inputRef = useRef();

  // useEffect(() => {
  //   console.log(html);
  // }, [html]);

  const handleChange = (e) => {
    console.log("key code :", e.keyCode);
    setHtml(e.target.value);
    props.updateBlock({
      id: props.id,
      html,
      tag,
    });
  };

  const handleKeydown = (e) => {
    console.log("html ", html);
    if (e.key == "Enter") {
      props.addBlock();
    } else {
      // setHtml(inputRef.current.innerHTML);
      setHtml((preHTML) => preHTML + e.key);
      props.updateBlock({
        id: props.id,
        html,
        tag,
      });
    }
  };

  return (
    <ContentEditable
      className="h1 ml-5"
      innerRef={inputRef}
      html={html}
      tagName={tag}
      // onChange={handleChange}
      onKeyDown={handleKeydown}
    />
  );
}

export default EditableBlock;
