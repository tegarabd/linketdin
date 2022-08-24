import React from "react";
import Title from "../../components/form/Title";
import EntirePageLayout from "../../layouts/EntirePageLayout";

function NotFound() {
  return (
    <EntirePageLayout>
      <Title>404 Not found</Title>
      <span>Oops the page you're trying to access is not found</span>
    </EntirePageLayout>
  );
}

export default NotFound;
