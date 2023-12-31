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
import MyMemes from "./pages/MyMemes";
import Footer from "./components/Footer";
import Templates from "./pages/Templates";
import EditGroupPage from "./pages/EditGroupPage";
import AddMemesToGroup from "./pages/AddMemesToGroup";

function App() {
  return (
    <div className="App">
      <MyNavbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

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
          path="/templates"
          element={
            <IsPrivate>
              {" "}
              <Templates />{" "}
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
          path="/groups/edit/:groupId"
          element={
            <IsPrivate>
              {" "}
              <EditGroupPage />{" "}
            </IsPrivate>
          }
        />
        <Route
          path="/groups/:groupId"
          element={
            <IsPrivate>
              {" "}
              <GroupDetails />{" "}
            </IsPrivate>
          }
        />

         <Route
          path='/groups/:groupId/addMemes'
          element={
            <IsPrivate>
              {" "}
              <AddMemesToGroup />{" "}
            </IsPrivate>
          }
        />



        <Route
          path="/memes"
          element={
            <IsPrivate>
              {" "}
              <MyMemes />{" "}
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

      <Footer />
    </div>
  );
}

export default App;
