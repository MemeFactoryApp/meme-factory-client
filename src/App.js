import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import CreateMeme from "./pages/CreateMeme";
import GroupsPage from "./pages/GroupsPage";
import GroupDetails from "./pages/GroupDetails";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route
          path="/projects"
          element={ <IsPrivate> <ProjectListPage /> </IsPrivate> } 
        /> */}

        {/* <Route
          path="/projects/:projectId"
          element={ <IsPrivate> <ProjectDetailsPage /> </IsPrivate> }
        /> */}

        <Route
          path="/templates/:id"
          element={
            <IsPrivate>
              {" "}
              <CreateMeme />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/groups"
          element={
            <IsPrivate>
              {" "}
              <GroupsPage />{" "}
            </IsPrivate>
          }
        />

<Route
          path="/memes"
          element={
            <IsPrivate>
              {" "}
              <GroupDetails />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />{" "}
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
