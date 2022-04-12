import { useState, useCallback } from 'react';
import { TargetBox } from './TargetBox';
import { FileList } from './FileList'; 
import { Image } from 'cloudinary-react';

export default function Container(){

    const style = {
        border: '3px dashed blue',
        height: 'auto',
        width: '50vw',
        padding: '2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    const circle = {
        background: 'green',
        borderRadius: '50%',
        width: '2rem',
        height: '2rem',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '20px',
    }
   
    const [droppedFiles, setDroppedFiles] = useState([]);
    const [returnedImg, setReturnedImg] = useState('');

    const handleFileDrop = useCallback((item) => {
        if (item) {
            const files = item.files;
            setDroppedFiles(files);
        }
    }, [setDroppedFiles]);

    function handleFileInput(e){
       //console.log('files', e.target.files)
       // this will crash if there was a previous file and then you cancel
       if(e.target.files.length === 0) return; // if you use return, state is not updated and you can still upload vs setDroppedFiles([]);
       setDroppedFiles(old => [...old, e.target.files[0]])
    }

    async function handleUpload(){
        
        // put this in a loop to upload multiple files droppedFiles.forEach(async(file)=>{...})

        const {signature, timestamp} = await getSignature();

        let formData = new FormData();
        formData.append('file', droppedFiles.pop()); // can't send an array /  have to loop / get the last uploaded file with pop
        //formData.append('image_preset', process.env.CLOUDINARY_IMAGE_PRESET);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY)

        /* 
        for (var data of formData) {
            console.log(data);
        }
        */

        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        //console.log('returned data', data)
        
        setReturnedImg(data);
    }

    return (<>
            {!returnedImg ? 
            <>
			<TargetBox onDrop={handleFileDrop}/>
            <FileList files={droppedFiles}/>
            {!droppedFiles.length && 
                (   
                    <>
                        <div>or</div>
                        <label htmlFor="fileInput" className="visually-hidden">File</label>
                        <input id="fileInput" type="file" onChange={(e)=>handleFileInput(e)} />
                    </>
                )
            }
         
            {droppedFiles.length ? <button onClick={handleUpload}>Upload</button> : null }
            </>
            : <div style={style}>
                <h3>Uploaded Successfully!</h3>
                <div style={circle}>&#10003;</div>
                <Image 
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                    publicId={returnedImg.public_id}
                    width={200}
                    crop="scale"
                    alt=""
                />
                <a href={returnedImg.secure_url} target="_blank" rel="noreferrer">Your Image Link</a> 
              </div>
            }
		</>);
};

async function getSignature(){
    const response = await fetch('/api/sign');
    const data = await response.json();
    return data;
}

/*
<input name="copy-link" value={returnedImgUrl} /><button onClick={() => {navigator.clipboard.writeText(returnedImgUrl)}}>Copy Link</button>


import { useState, useCallback } from 'react';
import { TargetBox } from './TargetBox';
import { FileList } from './FileList';
export const Container = () => {
    const [droppedFiles, setDroppedFiles] = useState([]);
    const handleFileDrop = useCallback((item) => {
        if (item) {
            const files = item.files;
            setDroppedFiles(files);
        }
    }, [setDroppedFiles]);
    return (<>
			<TargetBox onDrop={handleFileDrop}/>
			<FileList files={droppedFiles}/>
		</>);
};
*/