import "./App.css";
import { Routes, Route } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import CreateMeme from "./pages/CreateMeme";
import GroupsPage from "./pages/GroupsPage";
import GroupDetails from "./pages/GroupDetails";
import CreateGroup from "./pages/CreateGroup";

function App() {
  return (
    <div className="App">
      <MyNavbar />

      <Routes>
        <Route 
        path="/" 
        element={<HomePage />} />

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
          path="/groups/create"
          element={
            <IsPrivate>
              {" "}
              <CreateGroup />{" "}
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
