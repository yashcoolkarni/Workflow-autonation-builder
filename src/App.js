import WorkflowCanvas from "./pages/mainPages/workFlowCanvas";
import ResizeObserver from "resize-observer-polyfill";

export default function App() {
  window.ResizeObserver = ResizeObserver;

  return (
    <div style={{height: "100vH", width: "100%"}}>
    <WorkflowCanvas />
    </div>
  );
}
