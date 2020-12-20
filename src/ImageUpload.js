import { Button } from '@material-ui/core'
import React from 'react'

function ImageUpload() {
    return (
        <div>

            <input type="text" />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
            
        </div>
    )
}

export default ImageUpload
