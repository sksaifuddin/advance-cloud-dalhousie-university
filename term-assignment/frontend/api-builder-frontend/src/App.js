import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import UserDatabases from "./pages/UserDatabases/UserDatabases";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div className="App">
          <Routes>
            <Route path="/" element={<UserDatabases />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
