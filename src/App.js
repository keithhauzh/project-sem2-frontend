import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import SwitchAccountPage from "./pages/SwitchAccount";
import BookmarksPage from "./pages/Bookmarks";
import CommentsPage from "./pages/Comments";
import SubscriptionPage from "./pages/Subscription";
import ProfilePage from "./pages/Profile";
import SelfProfilePage from "./pages/SelfProfile";
import AdminPanel from "./pages/AdminPanel";
import PostEdit from "./pages/PostEdit";
import VerifyPayment from "./pages/VerifyPayment";
import ImageBoardPage from "./pages/ImageBoard";

function App() {
  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>

            {/* /comments supposed to be /:id/comments, waiting for backend dev */}
            <Route path="/comments/:id" element={<CommentsPage />}></Route>

            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route
              path="/switch-account"
              element={<SwitchAccountPage />}
            ></Route>
            <Route path="/bookmarks" element={<BookmarksPage />}></Route>
            <Route path="/subscription" element={<SubscriptionPage />}></Route>
            <Route path="/profile/:id" element={<ProfilePage />}></Route>
            <Route path="/self-profile" element={<SelfProfilePage />}></Route>
            <Route path="/admin" element={<AdminPanel />}></Route>
            <Route path="/edit/:id" element={<PostEdit />}></Route>
            <Route path="/verify-payment" element={<VerifyPayment />}></Route>
            <Route path="/image-board" element={<ImageBoardPage />}></Route>
          </Routes>
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </CookiesProvider>
    </>
  );
}

export default App;
