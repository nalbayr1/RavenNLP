// import { S3 } from 'aws-sdk';
// import fs from 'fs';

// export const uploadToStorage = async (file: any) => {
//   const s3 = new S3();
//   const fileStream = fs.createReadStream(file.filepath);

//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: `uploads/${Date.now()}_${file.originalFilename}`,
//     Body: fileStream,
//     ACL: 'public-read',
//   };

//   const upload = await s3.upload(params).promise();
//   return upload.Location;
// };
