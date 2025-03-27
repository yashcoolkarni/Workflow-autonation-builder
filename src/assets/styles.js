import styled from "styled-components";

// Panel Styles
export const PanelContainer = styled.div`
  width: 320px;
  padding: 20px;
  background: #ffffff;
  border-left: 3px solid #007bff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: all 0.3s ease-in-out;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const ErrorText = styled.p`
  color: #d32f2f;
  font-size: 13px;
  margin: 0;
`;

export const SaveButton = styled.button`
  padding: 10px 16px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
`;

// Editable Node Styles
export const NodeContainer = styled.div`
  padding: 12px;
  border-radius: 8px;
  color: white;
  text-align: center;
  min-width: 140px;
  position: relative;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: ${({ type }) =>
    type === "taskNode"
      ? "#4CAF50"
      : type === "conditionNode"
      ? "#FF9800"
      : "#2196F3"}; // Different colors for different nodes

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

/* Styled Delete Button */
export const DeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ff4d4f;
  border: none;
  border-radius: 50%;
  color: white;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #d9363e;
  }
`;

/* Styled Input Field */
export const EditableInput = styled.input`
  width: 100%;
  padding: 6px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  outline: none;
  background: white;
  color: black;
  font-weight: bold;
`;

// Node Data Styles
export const NodeDataContainer = styled.div`
  padding: 15px;
  border-radius: 8px;
  background: #1890ff;
  color: white;
  text-align: center;
  min-width: 140px;
  position: relative;
  border: 2px solid #004080;
  cursor: pointer;
`;

export const NodeHandle = styled.div`
  background: #555;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
`;

// Workflow Table Modal Styles
export const ModalContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  width: 80%;
  height: 80%;
  margin: auto;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.h2`
  margin-bottom: 15px;
  color: #333;
`;

export const StyledTable = styled.table`
  width: 80%;
  margin: 0 auto 20px auto; /* Centers table horizontally and adds bottom margin */
  border-collapse: collapse;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const StyledTh = styled.th`
  background: #007bff;
  color: white;
  padding: 10px;
  border: 1px solid #ccc;
`;

export const StyledTd = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
`;

export const EditInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const ActionButton = styled.button`
  padding: 5px 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #218838;
  }
`;

export const CloseButton = styled.button`
  padding: 8px 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #c82333;
  }
`;

// Workflow Canvas Styles
export const CanvasContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const Sidebar = styled.div`
  width: 250px;
  padding: 10px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
`;

export const SidebarTitle = styled.h3`
  text-align: center;
  margin-bottom: 10px;
`;

export const DraggableNode = styled.div`
  padding: 8px;
  margin: 5px;
  background: #ddd;
  cursor: grab;
  text-align: center;
  border-radius: 4px;
  &:hover {
    background: #bbb;
  }
`;


export const CanvasWrapper = styled.div`
  flex: 1;
  position: relative;
  background: #f9f9f9;
`;

export const WorkflowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Spacing for icon if added */
  padding: 10px 14px;
  margin: 8px 0;
  width: 100%; /* Full width for better alignment */
  font-size: 14px;
  font-weight: 600;
  background: ${(props) => props.bg || "#007bff"};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${(props) => (props.bg === "#dc3545" ? "#c82333" : "#0056b3")};
    transform: scale(1.05); /* Subtle scale effect on hover */
  }

  &:disabled {
    background: #b0b0b0;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const FileInput = styled.input`
  display: block;
  padding: 8px;
  margin-top: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  transition: border 0.3s ease-in-out;

  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
`;

export const ModalButton = styled.button`
  padding: 10px 14px;
  width: 100%;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  background: #17a2b8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #138496;
    transform: scale(1.05);
  }
`;
