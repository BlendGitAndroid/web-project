import React from "react";
import { Layout, Typography } from "antd";
import { useTranslation, withTranslation } from "react-i18next";

export const Footer: React.FC = () => {

  // 国际化钩子函数
  const { t } = useTranslation();
  
  return (
    <Layout.Footer>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        {t("footer.detail")}
      </Typography.Title>
    </Layout.Footer>
  );
};
