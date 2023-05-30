import React, { useState } from 'react';
import Tab from './Tab';

const Tabs = (props: any) => {
  const { children } = props;
  const [activeTab, setActiveTab] = useState(
    children[0].props.children.type.name
  );

  const onClickTabItem = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child: any, index: number) => {
          const { name } = child.props.children.type;
          return (
            <Tab
              activeTab={activeTab}
              key={index}
              label={name}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child: any) => {
          if (child.props.children.type.name !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
