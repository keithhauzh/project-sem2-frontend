import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import SwitchAccount from "./pages/SwitchAccount";
import BookmarksPage from "./pages/Bookmarks";
import CommentsPage from "./pages/Comments";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          {/* /comments supposed to be /:id/comments, waiting for backend dev */}
          <Route path="/comments" element={<CommentsPage />}></Route>

          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/switch-account" element={<SwitchAccount />}></Route>
          <Route path="/bookmarks" element={<BookmarksPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
