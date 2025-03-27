import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";
import { TaskNode, ConditionNode, NotificationNode } from "../subPages/nodeData";
import NodeConfigPanel from "../subPages/nodeConfig";
import WorkflowTableModal from "../subPages/workFlowTable";
import {
  CanvasContainer,
  Sidebar,
  SidebarTitle,
  DraggableNode,
  WorkflowButton,
  FileInput,
  CanvasWrapper,
  ModalButton,
} from "../../assets/styles";
import {
  FaTasks,
  FaCodeBranch,
  FaBell,
  FaUndo,
  FaRedo,
  FaDownload,
  FaFileImport,
  FaChartBar,
} from "react-icons/fa";

const nodeTypes = {
  taskNode: TaskNode,
  conditionNode: ConditionNode,
  notificationNode: NotificationNode,
};
const nodeTypesList = [
  { type: "taskNode", label: "Task", icon: <FaTasks /> },
  { type: "conditionNode", label: "Condition", icon: <FaCodeBranch /> },
  { type: "notificationNode", label: "Notification", icon: <FaBell /> },
];

const WorkflowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [history, setHistory] = useState([{ nodes: [], edges: [] }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const reactFlowWrapper = useRef(null);
  const [nodeId, setNodeId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveToHistory = (newNodes, newEdges) => {
    const newHistory = [
      ...history.slice(0, historyIndex + 1),
      { nodes: newNodes, edges: newEdges },
    ];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setNodes(prevState.nodes);
      setEdges(prevState.edges);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const exportWorkflow = () => {
    const dataStr = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "workflow.json";
    link.click();
  };

  const importWorkflow = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const { nodes: importedNodes, edges: importedEdges } = JSON.parse(
        e.target.result
      );

      const updatedNodes = importedNodes.map((node) => ({
        ...node,
        data: { ...node.data, onDelete: deleteNode },
      }));

      setNodes(updatedNodes);
      setEdges(importedEdges);
      saveToHistory(updatedNodes, importedEdges);
    };
    reader.readAsText(file);
  };
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#555" },
          },
          eds
        )
      );
    },
    [setEdges]
  );
  const deleteNode = useCallback(
    (nodeId) => {
      setNodes((nds) => {
        const updatedNodes = nds.filter((node) => node.id !== nodeId);
        const updatedEdges = edges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        );
        saveToHistory(updatedNodes, updatedEdges);
        return updatedNodes;
      });
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
      setSelectedNode(null);
    },
    [edges]
  );

  const onNodeClick = (event, node) => {
    event.stopPropagation();
    setSelectedNode(node);
  };

  const onEdgeClick = (event, edge) => {
    event.stopPropagation();
    setEdges((eds) => {
      const updatedEdges = eds.filter((e) => e.id !== edge.id);
      saveToHistory(nodes, updatedEdges);
      return updatedEdges;
    });
  };

  const onCanvasClick = () => {
    setSelectedNode(null);
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const nodeType = event.dataTransfer.getData("application/reactflow");

    if (!nodeType) return;

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: `${nodeId}`,
      type: nodeType,
      position,
      data: { label: `${nodeType}`, onDelete: deleteNode },
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeId((prevId) => prevId + 1);
    saveToHistory([...nodes, newNode], edges);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "z") {
        undo();
      } else if (event.ctrlKey && event.key === "y") {
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex]);

  const updateNodeData = (nodeId, newData) => {
    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      );
      return [...updatedNodes];
    });
  };
  return (
    <CanvasContainer>
      {/* Sidebar */}
      <Sidebar>
        <div style={{ height: "50%" }}>
          <SidebarTitle>Drag Nodes</SidebarTitle>
          {nodeTypesList.map(({ type, label, icon }) => (
            <DraggableNode
              key={type}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("application/reactflow", type)
              }
            >
              {icon} <span>{label}</span>
            </DraggableNode>
          ))}
        </div>
        <div
          style={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <WorkflowButton onClick={undo} disabled={historyIndex === 0}>
            <FaUndo /> Undo (Ctrl+Z)
          </WorkflowButton>

          <WorkflowButton
            onClick={redo}
            disabled={historyIndex === history.length - 1}
          >
            <FaRedo /> Redo (Ctrl+Shift+Z)
          </WorkflowButton>

          <WorkflowButton onClick={exportWorkflow}>
            <FaDownload /> Export JSON
          </WorkflowButton>

          <FileInput
            type="file"
            accept="application/json"
            onChange={importWorkflow}
          />

          <ModalButton onClick={() => setIsModalOpen(true)}>
            <FaChartBar /> View Summary
          </ModalButton>
        </div>
      </Sidebar>

      {/* Workflow Canvas */}
      <CanvasWrapper
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={onCanvasClick}
      >
        <ReactFlow
          key={nodes.length}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </CanvasWrapper>

      {/* Node Configuration Panel */}
      {selectedNode && (
        <NodeConfigPanel
          selectedNode={selectedNode}
          onUpdateNode={updateNodeData}
          onClose={() => setSelectedNode(null)}
        />
      )}

      {/* Workflow Summary Modal */}
      <WorkflowTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nodes={nodes}
        onUpdateNode={setNodes}
      />
    </CanvasContainer>
  );
};

export default WorkflowCanvas;
