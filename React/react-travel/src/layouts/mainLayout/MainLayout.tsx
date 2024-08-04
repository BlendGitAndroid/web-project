import React from "react";
import styles from "./MainLayout.module.css";
import { Header, Footer } from "../../components"; 

// 主布局
// children是一个特殊的prop，是指组件的所有子节点

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {/* 页面内容 content */}
      <div className={styles["page-content"]}>{children}</div>
      <Footer />
    </>
  );
};
