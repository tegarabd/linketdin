import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import JobsPage from "./pages/JobsPage";
import MessagingPage from "./pages/MessagingPage";
import MyNetworkPage from "./pages/MyNetworkPage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/mynetwork" element={<MyNetworkPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/messaging" element={<MessagingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
