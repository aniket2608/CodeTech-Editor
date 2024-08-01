import { useParams } from "react-router-dom";
import "./index.scss";
import logo from './logo12.png';
import { EditorContainer } from "./EditorContainer";
import { useCallback, useState } from "react";
import { makeSubmission } from "./service";

const Codebookscreen = () => {
    const params = useParams();
    const { fileId, folderId } = params;

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [title, setTitle] = useState("Your Custom Title");

    const importInput = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            const fileContents = event.target.result;
            setInput(fileContents);
        };
        fileReader.readAsText(file);
    };

    const exportOutput = () => {
        const text = output;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'exported.txt';
        link.click();
        window.URL.revokeObjectURL(url);
    };

    const callback = useCallback(({ apiStatus, data, message }) => {
        if (apiStatus === 'loading') {
            setShowLoader(true);
        } else if (apiStatus === 'error') {
            setShowLoader(false);
            setOutput('Something went wrong');
        } else {
            setShowLoader(false);
            if (data.status.id === 3) {
                setOutput(atob(data.stdout));
            } else {
                setOutput(atob(data.stderr));
            }
        }
    }, []);

    const runCode = useCallback(({ code, language }) => {
        makeSubmission(code, language, callback, input);
    }, [input, callback]);

    return (
        <div className="codebook-container">
            <div className="header-container">
                <img src={logo} className="codebook-logo" alt="" />
                <span className="header-title">CodeTech</span>
            </div>
            <div className="content-container">
                <div className="editor-container">
                    <EditorContainer fileId={fileId} folderId={folderId} runCode={runCode} title={title} setTitle={setTitle} />
                </div>
                <div className="input-output-container">
                    <div className="input-header">
                        <b>Input:</b>
                        <label htmlFor="input" className="input-icon-container">
                            <span className="material-icons">cloud_download</span>
                            <span className="import-input-output">Import Input</span>
                        </label>
                        <input type="file" id="input" style={{ display: 'none' }} onChange={importInput} />
                    </div>
                    <textarea id="input" value={input} onChange={(e) => setInput(e.target.value)}></textarea>
                </div>
                <div className="input-output-container">
                    <div className="input-header">
                        <b>Output:</b>
                        <button className="icon-container" onClick={exportOutput}>
                            <span className="material-icons">cloud_upload</span>
                            <b className="import-input-output">Export Output</b>
                        </button>
                    </div>
                    <textarea readOnly id="output" value={output}></textarea>
                </div>
            </div>

            {showLoader && (
                <div className='fullpage-loader'>
                    <div className='loader'></div>
                </div>
            )}
        </div>
    );
};

export default Codebookscreen;
