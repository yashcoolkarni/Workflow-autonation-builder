import React, { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import {
  NodeContainer,
  EditableInput,
  DeleteButton,
  NodeHandle,
} from "../../assets/styles";
import { FaTrash } from "react-icons/fa"; // Import Trash Icon

const EditableNode = ({ data, id, type }) => {
  console.log(data);
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  useEffect(() => {
    setLabel(data.label);
  }, [data]);

  const handleBlur = () => {
    data?.onLabelChange?.(id, label);
    setEditing(false);
  };

  return (
    <NodeContainer type={type}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />

      {/* Editable Input */}
      {editing ? (
        <EditableInput
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div onDoubleClick={() => setEditing(true)}>{label}</div>
      )}

      {/* Delete Button */}
      <DeleteButton onClick={(e) => {
        e.stopPropagation();
        data?.onDelete?.(id);
      }}>
        <FaTrash size={12} />
      </DeleteButton>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />
    </NodeContainer>
  );
};

// Define node types
const TaskNode = (props) => <EditableNode {...props} />;
const ConditionNode = (props) => <EditableNode {...props} />;
const NotificationNode = (props) => <EditableNode {...props} />;

export { TaskNode, ConditionNode, NotificationNode };
