import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import {
  ModalContainer,
  ModalHeader,
  StyledTable,
  StyledTh,
  StyledTd,
  EditInput,
  ActionButton,
  CloseButton,
} from "../../assets/styles";

const TableRow = React.memo(({
  node,
  editId,
  editValue,
  editStatus,
  setEditValue,
  setEditStatus,
  handleEditClick,
  handleSaveClick,
}) => {
  return (
    <tr key={node.id}>
      <StyledTd>{node.type}</StyledTd>
      <StyledTd>
        {editId === node.id ? (
          <EditInput
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        ) : (
          node.data.label
        )}
      </StyledTd>
      <StyledTd>
        {editId === node.id ? (
          <EditInput
            type="text"
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            placeholder="Enter status"
          />
        ) : (
          node.data.status || "N/A"
        )}
      </StyledTd>
      <StyledTd>
        {editId === node.id ? (
          <ActionButton onClick={() => handleSaveClick(node.id)}>
            Save
          </ActionButton>
        ) : (
          <ActionButton onClick={() => handleEditClick(node)}>
            Edit
          </ActionButton>
        )}
      </StyledTd>
    </tr>
  );
});

const WorkflowTableModal = ({ isOpen, onClose, nodes, onUpdateNode }) => {
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const handleEditClick = useCallback((node) => {
    setEditId(node.id);
    setEditValue(node.data.label);
    setEditStatus(node.data.status || "");
  }, []);

  const handleSaveClick = useCallback(
    (id) => {
      onUpdateNode((prevNodes) =>
        prevNodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, label: editValue, status: editStatus } }
            : node
        )
      );
      setEditId(null);
    },
    [editValue, editStatus, onUpdateNode]
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Workflow Summary">
      <ModalContainer>
        <ModalHeader>Workflow Summary</ModalHeader>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Node Type</StyledTh>
              <StyledTh>Node Name</StyledTh>
              <StyledTh>Status</StyledTh>
              <StyledTh>Actions</StyledTh>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => (
              <TableRow
                key={node.id}
                node={node}
                editId={editId}
                editValue={editValue}
                editStatus={editStatus}
                setEditValue={setEditValue}
                setEditStatus={setEditStatus}
                handleEditClick={handleEditClick}
                handleSaveClick={handleSaveClick}
              />
            ))}
          </tbody>
        </StyledTable>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContainer>
    </Modal>
  );
};

export default WorkflowTableModal;
