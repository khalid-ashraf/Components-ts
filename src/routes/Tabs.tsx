/**
 * 1. Display a navbar at the top which contains tabs based on the data provided.
 * 2. When the user clicks a tab, the content associated to that tab is displayed.
 * 3. By default Tab 1 should be active.
 */

/**
 * 1. Create a navbar which has a list of buttons each of which are tabs.
 * 2. Create a state which keeps the index of the active tab. Default to index 0.
 * 3. When user clicks the state will change to the index of the tab user clicked.
 * 4. Compare which tab index and active tab state and check if equal.
 * 5. If equal then display that tab's content and do not display if not that tab's content.
 */
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
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleSetTab = useCallback(
    (tabIndex: number): void => {
      setActiveTab(tabIndex);
    },
    [setActiveTab]
  );

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='heading-2'>Tabs</h1>

      <nav className='m-4'>
        <ul className='flex flex-row gap-4' aria-label='Tab List' role='tab list'>
          {tabs?.map((tab, tabIndex) => {
            const isActive = tabIndex === activeTab;

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
          return tabIndex === activeTab && <p>{tab.content}</p>;
        })}
      </article>
    </div>
  );
});
export default Tabs;
