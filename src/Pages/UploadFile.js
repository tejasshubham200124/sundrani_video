import React, { useState } from 'react';
import AWS from 'aws-sdk';

const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            const s3 = new AWS.S3({
                accessKeyId: 'AKIAXY2NWQPZ4UNJCTIN',
                secretAccessKey: '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',
                region: 'ap-south-1',
            });

            const bucketName = 'firstsarshubham';
            const key = selectedFile.name;
            const params = {
                Bucket: bucketName,
                Key: key,
                Body: selectedFile,
            };


            s3.upload(params, (err, data) => {
                if (err) {
                    console.log('Error:', err);
                } else {
                    console.log('File uploaded successfully.', data);
                }
            });
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>
    );
};

export default UploadFile;
