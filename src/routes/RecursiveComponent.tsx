import { useState } from "react";

const folders = [
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

const Folder = ({ folder }: FolderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = folder.folders && folder.folders.length > 0;

  return (
    <li role='treeitem' aria-expanded={hasChildren ? isExpanded : undefined}>
      <button onClick={() => setIsExpanded((prev) => !prev)} className='flex items-center gap-2 '>
        <span aria-hidden='true'>{hasChildren ? (isExpanded ? "-" : "+") : "."}</span> {folder.name}
      </button>

      {isExpanded && hasChildren && (
        <ul className='pl-6' role='group' aria-label={`${folder.name} contents`}>
          {folder.folders?.map((folder) => <Folder folder={folder} key={folder.name} />)}
        </ul>
      )}
    </li>
  );
};
