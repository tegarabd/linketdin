import { Navigate, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AboutPage from "./pages/AboutPage";
import ActivationPage from "./pages/ActivationPage";
import FeedPage from "./pages/FeedPage";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import MessagingPage from "./pages/MessagingPage";
import MyNetworkPage from "./pages/MyNetworkPage";
import NotificationsPage from "./pages/NotificationsPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/auth">
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="activate/:activationId/:code"
            element={<ActivationPage />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot_password">
            <Route path="verify_email" element={<VerifyEmailPage />} />
            <Route path="verify_code" element={<VerifyCodePage />} />
            <Route path="reset_password" element={<ResetPasswordPage />} />
          </Route>
        </Route>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/mynetwork" element={<MyNetworkPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/messaging">
          <Route path="thread/:threadId" element={<MessagingPage />} />
        </Route>
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </>
  );
}

export default App;
