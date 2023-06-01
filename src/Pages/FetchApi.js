import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

const FetchApi = () => {
  const [s3Files, setS3Files] = useState([]);

  const fetchS3Files = async () => {
    AWS.config.update({
      accessKeyId: 'AKIAXY2NWQPZ4UNJCTIN',
      secretAccessKey: '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',
      region: 'ap-south-1'
    });

    const s3 = new AWS.S3();

    const params = {
      Bucket: 'firstsarshubham'
    };
    try {
      const response = await s3.listObjectsV2(params).promise();
      const fileData = response.Contents.map(file => {
        const fileName = file.Key.split('/').pop();
        const url = `https://firstsarshubham.s3.ap-south-1.amazonaws.com/${fileName}`.replace(/"/g, '');

        return {
          key: file.Key,
          url: url
        };
      });
      setS3Files(fileData);
      console.log(fileData)
    } catch (error) {
      console.error('Error fetching S3 files:', error);
    }
  };
  useEffect(() => {
    fetchS3Files();
  }, []);

  return (
    <div>
      <h1>S3 Files</h1>
      <div>
        {s3Files.map((file, index) => (
          <img key={index} src={file.url} alt={file.key} />
        ))}
      </div>
    </div>
  );
};

export default FetchApi;
