import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/header";
import Layout from "./layouts/Layout";
import AuthenticatedRoute from "./middlewares/AuthenticatedRoute";
import GuestRoute from "./middlewares/GuestRoute";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/authentication/AuthPage";
import NotFound from "./pages/error/NotFound";
import FeedPage from "./pages/feed";
import JobsPage from "./pages/jobs/JobsPage";
import MessagingPage from "./pages/messaging/MessagingPage";
import MyNetworkPage from "./pages/mynetwork/MyNetworkPage";
import NotificationsPage from "./pages/notification/NotificationsPage";
import ProfilePage from "./pages/profile";
import SearchPage from "./pages/search/SearchPage";

function App() {
  return (
    <>
      <Header />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<AboutPage />}
          />
          <Route
            path="/auth/*"
            element={
              <GuestRoute>
                <AuthPage />
              </GuestRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <AuthenticatedRoute>
                <FeedPage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/mynetwork"
            element={
              <AuthenticatedRoute>
                <MyNetworkPage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <AuthenticatedRoute>
                <JobsPage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/messaging/*"
            element={
              <AuthenticatedRoute>
                <MessagingPage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <AuthenticatedRoute>
                <NotificationsPage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/in/:userId"
            element={
              <AuthenticatedRoute>
                <ProfilePage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/search/results/:type"
            element={
              <AuthenticatedRoute>
                <SearchPage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
