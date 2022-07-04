import { v2 as cloudinary } from "cloudinary";


cloudinary.config({ 
  cloud_name: 'mypc', 
  api_key: '435545773368263', 
  api_secret: 'puOgFZYaGx1J59d-v4Wu1p0mYdw',
  secure: true
});

export default cloudinary