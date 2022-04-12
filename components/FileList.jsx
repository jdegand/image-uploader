import { useMemo } from 'react';
function list(files) {
    const label = (file) => `'${file.name}' of size '${file.size}' and type '${file.type}'`;
    return files.map((file) => <li key={file.name}>{label(file)}</li>);
}
export const FileList = ({ files }) => {
    const fileList = useMemo(() => list(files), [files]);
    if (files.length === 0) {
        return null;
    }
    return <div>{fileList.pop()}</div>;
};


/* 
export const FileList = ({ files }) => {
    const fileList = useMemo(() => list(files), [files]);
    if (files.length === 0) {
        return <div>Nothing to display</div>;
    }
    return <div>{fileList}</div>;
};
*/