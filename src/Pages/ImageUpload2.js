// 

import React, { useState } from 'react';
import AWS from 'aws-sdk';
import config from './awsconfig';

const ImageUpload2 = () => {
  function getFileNameFromURL(url) {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    return fileName;
  }

const bucketUrl = `https://${config.bucketName}.s3.${config.region}.amazonaws.com/`;
console.log(bucketUrl)
  const fetchImageUrls = async () => {
    try {
      const response = await fetch(bucketUrl + '?list-type=2');
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      const imageUrls = data.Contents.map((item) => bucketUrl + item.Key);
      console.log(imageUrls);
      // Use the imageUrls in your frontend or perform any other necessary actions
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchImageUrls();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      AWS.config.update({
        region: config.region,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      });
      const s3 = new AWS.S3();

      const params = {
        Bucket: config.bucketName,
        Key: selectedImage.name,
        Body: selectedImage,
        ContentType: selectedImage.type,
      };

      s3.upload(params, (error, data) => {
        if (error) {
          console.error('Error uploading image:', error);
        } else {
          const fileName = getFileNameFromURL(data.Location);
          console.log(fileName);
          console.log('Image upload successful:', data.Location);
          // Handle the successful upload, e.g., update state or display a success message
        }
      });
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload2;
