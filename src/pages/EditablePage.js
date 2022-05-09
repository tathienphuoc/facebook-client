import { useEffect, useState } from "react";
import EditableBlock from "../components/EditableBlock";

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const initialBlock = [{ id: uid(), html: "", tag: "h1" }];

function EditablePage() {
  const [blocks, setBlocks] = useState(initialBlock);

  const updateBlock = (updatedBlock) => {
    const index = blocks.findIndex((block) => block.id === updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
    };
    setBlocks(updatedBlocks);
  };

  const addBlock = () => {
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      { id: uid(), html: "block moi ne", tag: "p" },
    ]);
  }

  return (
    <div className="h-screen w-screen">
      {blocks.map((block, index) => (
        <EditableBlock
          html={block.html}
          tag={block.tag}
          key={index}
          id={block.id}
          updateBlock={updateBlock}
          addBlock={addBlock}
        />
      ))}
    </div>
  );
}

export default EditablePage;
