import React, { useRef } from 'react'
// import { FileDrop } from 'react-file-drop';

function FileDrop() {
    const fileInputRef = useRef(null);
    const onFileInputChange = (event) => {
        const { files } = event.target;
        // do something with your files...
      }
      const onTargetClick = () => {
        fileInputRef.current.click()
      }
    return (
        <div>
            <input
                    onChange={onFileInputChange}
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    />
        </div>
    )
}

export default FileDrop
