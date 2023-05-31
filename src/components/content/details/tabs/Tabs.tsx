import React, { useEffect, useState } from 'react';
import Tab from './Tab';

type TabProps = {
  name: string;
  children: React.ReactNode;
};

type TabsProps = {
  children: React.ReactElement<TabProps>[];
};

const Tabs = (props: TabsProps) => {
  const { children } = props;

  const [activeTab, setActiveTab] = useState<string>('');

  // set active tab at first load
  useEffect(() => {
    // transform into array
    // ensure the children always treated as array -> safe access inner properties
    const childrenArray = React.Children.toArray(children);

    if (childrenArray[0] && React.isValidElement(childrenArray[0])) {
      const { name } = childrenArray[0].props.children.props;
      setActiveTab(name);
    }
  }, [children]);


  const onClickTabItem = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map((child: React.ReactElement, index: number) => {
          const { name } = child.props.children.props;

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
        {React.Children.map(children, (child) => {
          if (
            !React.isValidElement(child) ||
            !child.props.children ||
            !React.isValidElement(child.props.children)
          ) {
            return null;
          }

          const nestedChild = child.props.children;

          if (!nestedChild.props || !nestedChild.props.name) {
            return null;
          }

          if (nestedChild.props.name !== activeTab) {
            return null;
          }

          return nestedChild;
        })}
      </div>
    </div>
  );
};

export default Tabs;
