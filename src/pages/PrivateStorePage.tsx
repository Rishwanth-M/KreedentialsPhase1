// src/pages/PrivateStorePage.tsx
import React from "react";
import Store from "./Store";
import Layout from "../components/Layout";

const PrivateStorePage: React.FC = () => {
  return (
    <Layout>
      <div className="p-8">
        <Store />
      </div>
    </Layout>
  );
};

export default PrivateStorePage;
