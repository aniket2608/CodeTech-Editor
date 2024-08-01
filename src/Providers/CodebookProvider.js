import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CodebookContext = createContext();

const initialData = [
  {
    id: uuidv4(),
    title: 'DSA',
    files: [
      {
        id: uuidv4(),
        title: 'index',
        code: 'cout<<"Hello, World";',
        language: 'cpp',
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'Frontend',
    files: [
      {
        id: uuidv4(),
        title: 'test',
        code: 'console.log("Hello, World");',
        language: 'javascript',
      },
    ],
  },
];

export const defaultCodes = {
  cpp: `#include <iostream>
int main() {
  std::cout << "Hello World";
  return 0;
}`,
  javascript: 'console.log("Hello, JavaScript!");',
  python: 'print("Hello, Python")',
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}`,
};

const CodebookProvider = ({ children }) => {
  const [folders, setFolders] = useState(() => {
    const localData = localStorage.getItem('data');
    return localData ? JSON.parse(localData) : initialData;
  });

  const createNewCodebook = ({ fileName, folderName, language }) => {
    const newFolder = {
      id: uuidv4(),
      title: folderName,
      files: [
        {
          id: uuidv4(),
          title: fileName,
          code: defaultCodes[language],
          language,
        },
      ],
    };

    setFolders((prevFolders) => {
      const updatedFolders = [...prevFolders, newFolder];
      localStorage.setItem('data', JSON.stringify(updatedFolders));
      return updatedFolders;
    });
  };

  const createNewFolder = (folderName) => {
    const newFolder = {
      id: uuidv4(),
      title: folderName,
      files: [],
    };
    const allFolders = [...folders, newFolder];
    localStorage.setItem('data', JSON.stringify(allFolders));
    setFolders(allFolders);
  };

  const deleteFolder = (id) => {
    const updatedFoldersList = folders.filter((folderItem) => folderItem.id !== id);
    localStorage.setItem('data', JSON.stringify(updatedFoldersList));
    setFolders(updatedFoldersList);
  };

  const editFolderTitle = (newFolderName, id) => {
    const updatedFoldersList = folders.map((folderItem) => {
      if (folderItem.id === id) {
        return { ...folderItem, title: newFolderName };
      }
      return folderItem;
    });
    localStorage.setItem('data', JSON.stringify(updatedFoldersList));
    setFolders(updatedFoldersList);
  };

  const editFileTitle = (newFileName, folderId, fileId) => {
    const copiedFolders = folders.map((folder) => {
      if (folder.id === folderId) {
        const updatedFiles = folder.files.map((file) =>
          file.id === fileId ? { ...file, title: newFileName } : file
        );
        return { ...folder, files: updatedFiles };
      }
      return folder;
    });
    localStorage.setItem('data', JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };

  const deleteFile = (folderId, fileId) => {
    const updatedFolders = folders.map(folder => {
      if (folder.id === folderId) {
        const updatedFiles = folder.files.filter(file => file.id !== fileId);
        return { ...folder, files: updatedFiles };
      }
      return folder;
    });
    localStorage.setItem('data', JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const createCodebook = (folderId, file) => {
    const updatedFolders = folders.map(folder => {
      if (folder.id === folderId) {
        return { ...folder, files: [...folder.files, file] };
      }
      return folder;
    });
    localStorage.setItem('data', JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  const getDefaultCode = (fileId, folderId) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) {
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j];
          if (fileId === currentFile.id) {
            return currentFile.code;
          }
        }
      }
    }
  };

  const updateLanguage = (fileId, folderId, language) => {
    const newFolders = [...folders];
    for (let i = 0; i < newFolders.length; i++) {
      if (newFolders[i].id === folderId) {
        for (let j = 0; j < newFolders[i].files.length; j++) {
          const currentFile = newFolders[i].files[j];
          if (fileId === currentFile.id) {
            newFolders[i].files[j].code = defaultCodes[language];
            newFolders[i].files[j].language = language;
          }
        }
      }
    }
    localStorage.setItem('data', JSON.stringify(newFolders));
    setFolders(newFolders);
  }

  const getLanguage = (fileId, folderId) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) {
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j];
          if (fileId === currentFile.id) {
            return currentFile.language;
          }
        }
      }
    }
  };

  const saveCode = (fileId, folderId, newCode) => {
    const newFolders = [...folders];
    for (let i = 0; i < newFolders.length; i++) {
      if (newFolders[i].id === folderId) {
        for (let j = 0; j < newFolders[i].files.length; j++) {
          const currentFile = newFolders[i].files[j];
          if (fileId === currentFile.id) {
            newFolders[i].files[j].code = newCode;
          }
        }
      }
    }
    localStorage.setItem('data', JSON.stringify(newFolders));
    setFolders(newFolders);
  };

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(folders));
  }, [folders]);

  const CodebookFeatures = {
    folders,
    createNewCodebook,
    createNewFolder,
    deleteFolder,
    editFolderTitle,
    editFileTitle,
    deleteFile,
    createCodebook,
    getDefaultCode,
    getLanguage,
    updateLanguage,
    saveCode
  };

  return (
    <CodebookContext.Provider value={CodebookFeatures}>
      {children}
    </CodebookContext.Provider>
  );
};

export default CodebookProvider;
