import React, { memo } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import DocCardList from "@theme/DocCardList";

const Introduction = ({ sidebarId }) => {
  const { siteConfig } = useDocusaurusContext() as any;
  const sidebarOptions = siteConfig.customFields.sidebarOptions[sidebarId];

  return <DocCardList items={sidebarOptions.slice(1)} />;
};

const MemoIntroduction = memo(Introduction);
MemoIntroduction.displayName = "Introduction";

export default MemoIntroduction;
