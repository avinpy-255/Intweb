import Editor from '@monaco-editor/react';

type CodeEditorProps = {
    language?: string;
    value: string;
    height?: string;
    width? : string
    onChange?: (value: string | undefined) => void;
};

const DEFAULT_LANGUAGE = 'javascript';

export const CodeEditor: React.FC<CodeEditorProps> = ({
    language = DEFAULT_LANGUAGE,
    value,
    height = '90vh',
    width = '180vh',
    onChange
}) => {

    const handleChange = (value: string | undefined) => {
        if (onChange) {
            onChange(value);
        }
    };
    
    return (
        <Editor 
            theme="vs-dark"
            height={height}
            width={width}
            defaultLanguage={DEFAULT_LANGUAGE}
            language={language}
            onChange={handleChange}
            value={value || ""}
        />
    );
};

export default CodeEditor;
