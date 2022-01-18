const multer= require("multer");
const{ GridFsStorage }= require("multer-gridfs-storage");

var storage= new GridFsStorage({
  url: process.env.MONGODB_URI,
  options:{ useNewUrlParser: true, useUnifiedTopology: true },
  file:(req, file)=>{
    const match= ["image/png", "image/jpeg"];

    if(match.indexOf(file.mimetype)===-1){
      const filename= `${Date.now()}-meemzy-${file.originalname}`;
      return filename;
    }

    return{
      bucketName: "images",
      filename: `${Date.now()}-meemzy-${file.originalname}`
    };
  }
});

module.exports= multer({ storage });