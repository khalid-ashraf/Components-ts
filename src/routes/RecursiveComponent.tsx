import { memo, useCallback, useState } from "react";

interface FolderType {
  name: string;
  folders?: FolderType[];
}

const folders: FolderType[] = [
  {
    name: "Movies",
    folders: [
      {
        name: "Action",
        folders: [
          { name: "2000s", folders: [{ name: "Popular" }] },
          { name: "2010s" },
          { name: "2020s" },
        ],
      },
      { name: "Comedy", folders: [{ name: "2000s" }] },
      { name: "Romance" },
    ],
  },
  { name: "Music", folders: [{ name: "Rock" }] },
  { name: "Pictures" },
  { name: "Documents" },
];

interface FolderProps {
  folder: {
    name: string;
    folders?: FolderProps["folder"][];
  };
}

interface FolderButtonProps {
  isExpanded: boolean;
  hasChildren: boolean | undefined;
  name: string;
  onClick: () => void;
}

const FolderButton: React.FC<FolderButtonProps> = memo(
  ({ isExpanded, hasChildren, name, onClick }) => (
    <button
      onClick={onClick}
      className='flex items-center gap-2'
      aria-label={`${hasChildren ? (isExpanded ? "Collapse" : "Expand") : ""} ${name}`}
    >
      <span aria-hidden='true'>{hasChildren ? (isExpanded ? "-" : "+") : "."}</span> {name}
    </button>
  )
);

const Folder = ({ folder }: FolderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = folder.folders && folder.folders.length > 0;

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <li role='treeitem' aria-expanded={hasChildren ? isExpanded : undefined}>
      <FolderButton
        isExpanded={isExpanded}
        hasChildren={hasChildren}
        name={folder.name}
        onClick={handleToggle}
      />

      {isExpanded && hasChildren && (
        <ul className='pl-6' role='group' aria-label={`${folder.name} contents`}>
          {folder.folders?.map((folder) => <Folder folder={folder} key={folder.name} />)}
        </ul>
      )}
    </li>
  );
};

const RecursiveComponent = () => {
  return (
    <nav className='div-center' aria-label='Folder structure'>
      <ul className='pl-6' role='tree'>
        {folders.map((folder) => (
          <Folder folder={folder} key={folder.name} />
        ))}
      </ul>
    </nav>
  );
};

export default RecursiveComponent;
