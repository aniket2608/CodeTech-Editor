import React, { useContext, useRef, useState, useCallback } from 'react';
import { Editor } from '@monaco-editor/react';
import './EditorContainer.scss';
import { CodebookContext } from '../../Providers/CodebookProvider';

const editorOptions = {
  fontSize: 15,
  wordWrap: 'on',
};

const fileExtensionMapping = {
  cpp: 'cpp',
  javascript: 'js',
  python: 'py',
  java: 'java',
};

export const EditorContainer = ({ fileId, folderId, runCode, title, setTitle }) => {
  const { getDefaultCode, getLanguage, updateLanguage, saveCode } = useContext(CodebookContext);
  const [code, setCode] = useState(() => getDefaultCode(fileId, folderId));
  const [language, setLanguage] = useState(() => getLanguage(fileId, folderId));
  const [theme, setTheme] = useState('vs-dark');
  const codeRef = useRef(code);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const onChangeCode = (newCode) => {
    codeRef.current = newCode;
    setCode(newCode);
  };

  const importCode = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.includes('text');
    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function (value) {
        const importedCode = value.target.result;
        setCode(importedCode);
        codeRef.current = importedCode;
      };
    } else {
      alert('Please choose a program file');
    }
  };

  const exportCode = () => {
    const codeValue = codeRef.current?.trim();
    if (!codeValue) {
      alert('Please type some code in the editor before exporting');
      return;
    }

    const codeBlob = new Blob([codeValue], { type: 'text/plain' });
    const downloadUrl = URL.createObjectURL(codeBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `code.${fileExtensionMapping[language]}`;
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

  const onChangeLanguage = (e) => {
    const newLanguage = e.target.value;
    updateLanguage(fileId, folderId, newLanguage);
    const newCode = getDefaultCode(fileId, folderId);
    setCode(newCode);
    codeRef.current = newCode;
    setLanguage(newLanguage);
  };

  const onChangeTheme = (e) => {
    setTheme(e.target.value);
  };

  const onSaveCode = () => {
    saveCode(fileId, folderId, codeRef.current);
    alert('Code saved successfully');
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const onRunCode = useCallback(() => {
    runCode({ code: codeRef.current, language });
  }, [runCode, language]);

  const handleTitleChange = (e) => {
    setTempTitle(e.target.value);
  };

  const saveTitle = () => {
    setTitle(tempTitle);
    setIsEditingTitle(false);
  };

  return (
    <div className="root-editor-container" style={isFullScreen ? styles.fullScreen : {}}>
      <div className="editor-header">
        <div className="editor-left-container">
          {isEditingTitle ? (
            <input
              type="text"
              value={tempTitle}
              onChange={handleTitleChange}
              onBlur={saveTitle}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  saveTitle();
                }
              }}
            />
          ) : (
            <>
              <b className="editor-title">{title}</b>
              <span className="material-icons" onClick={() => setIsEditingTitle(true)}>edit</span>
            </>
          )}
          <button onClick={onSaveCode}>Save Code</button>
        </div>
        <div className="editor-right-container">
          <select onChange={onChangeLanguage} value={language}>
            <option value="cpp">cpp</option>
            <option value="javascript">javascript</option>
            <option value="java">java</option>
            <option value="python">python</option>
          </select>
          <select onChange={onChangeTheme} value={theme}>
            <option value="vs-dark">vs-dark</option>
            <option value="vs-light">vs-light</option>
          </select>
        </div>
      </div>
      <div className="editor-body">
        <Editor
          height={"100%"}
          language={language}
          options={editorOptions}
          theme={theme}
          onChange={onChangeCode}
          value={code}
        />
      </div>
      <div className="editor-footer">
        <button className="btn" onClick={toggleFullScreen}>
          <span className="material-icons">fullscreen</span>
          <span>{isFullScreen ? 'Minimize' : 'Full Screen'}</span>
        </button>
        <label htmlFor="import-code" className="btn">
          <span className="material-icons">cloud_download</span>
          <span>Import Code</span>
        </label>
        <input type="file" id="import-code" style={{ display: 'none' }} onChange={importCode} />
        <button className="btn" onClick={exportCode}>
          <span className="material-icons">cloud_upload</span>
          <span>Export Code</span>
        </button>
        <button className="btn" onClick={onRunCode}>
          <span className="material-icons">play_arrow</span>
          <span>Run Code</span>
        </button>
      </div>
    </div>
  );
};

export default EditorContainer;

const styles = {
  fullScreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
  },
};
