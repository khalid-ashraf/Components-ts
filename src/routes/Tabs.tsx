const tabs = [
  {
    label: "Tab 1",
    content: "This is content for Tab 1",
  },
  {
    label: "Tab 2",
    content: "This is content for Tab 2",
  },
  {
    label: "Tab 3",
    content: "This is content for Tab 3",
  },
];

import { memo, useCallback, useState } from "react";

interface Tab {
  label: string;
  content: string;
}

interface TabProps {
  tab: Tab;
  tabIndex: number;
  isActive: boolean;
  handleSetTab: (tabIndex: number) => void;
}

const Tab: React.FC<TabProps> = memo(({ tab, tabIndex, isActive, handleSetTab }) => {
  return (
    <li>
      <button
        onClick={() => handleSetTab(tabIndex)}
        className={`border  p-3 ${isActive ? "border-slate-300" : "border-slate-600"}`}
        disabled={isActive}
        role='tab'
        aria-label={`tab-${tabIndex}`}
        aria-selected={isActive}
        aria-controls={`panel-${tabIndex}`}
      >
        {tab.label}
      </button>
    </li>
  );
});

const Tabs: React.FC = memo(() => {
  const [tabNumber, setTabNumber] = useState<number>(0);

  const handleSetTab = useCallback(
    (tabIndex: number): void => {
      setTabNumber(tabIndex);
    },
    [setTabNumber]
  );

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='heading-2'>Tabs</h1>

      <nav className='m-4'>
        <ul className='flex flex-row gap-4' aria-label='Tab List' role='tab list'>
          {tabs?.map((tab, tabIndex) => {
            const isActive = tabIndex === tabNumber;

            return (
              <Tab
                key={`tab-${tabIndex}`}
                tab={tab}
                tabIndex={tabIndex}
                isActive={isActive}
                handleSetTab={handleSetTab}
              />
            );
          })}
        </ul>
      </nav>

      <article>
        {tabs?.map((tab, tabIndex) => {
          return tabIndex === tabNumber && <p>{tab.content}</p>;
        })}
      </article>
    </div>
  );
});
export default Tabs;
