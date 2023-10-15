import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import DocCardList from "@theme/DocCardList";

export const Introduction = ({ sidebarId }) => {
  const { siteConfig } = useDocusaurusContext() as any;
  const sidebarOptions = siteConfig.customFields.sidebarOptions[sidebarId];

  return (
    <DocCardList items={sidebarOptions.slice(1)} />
  );
};