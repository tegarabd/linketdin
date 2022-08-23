import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/header";
import Layout from "./layouts/Layout";
import AuthenticatedRoute from "./middlewares/AuthenticatedRoute";
import GuestRoute from "./middlewares/GuestRoute";
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
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<AboutPage />} />
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
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
