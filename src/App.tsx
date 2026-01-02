import { FlowWidget } from "./components/flow/FlowWidget";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      {/* Background for demo purposes if running in browser, 
          in Tauri this would be transparent */}
      <FlowWidget />
    </div>
  );
}

export default App;
