import React, { useState, useEffect } from 'react';

type TabType = {
  activeTab: string;
  label: string;
  onClick: (tab: string) => void;
};
const Tab = (props: TabType) => {
  const { activeTab, label, onClick } = props;
  const [className, setClassName] = useState('tab-list-item');

  useEffect(() => {
    if (activeTab === label) {
      setClassName((prev) => (prev += ' tab-list-active'));
    } else {
      setClassName('tab-list-item');
    }
  }, [activeTab, label]);

  const onTabClick = () => {
    onClick(label);
  };

  return (
    <>
      <li className={className} onClick={onTabClick}>
        {label}
      </li>
    </>
  );
};

export default Tab;
