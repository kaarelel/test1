const Meme= require('../models/Meme');
const User= require('../models/User');

exports.getMemes= async(res)=>{
  const meme= await Meme.find({})
  res.status(200).send(meme)
}

exports.getMeme= async(req, res)=>{
  const{memeID}= req.params;
    try{
        const meme= await Meme.findOne({memeID:memeID})
        if(!meme) throw Error("Meme leidmisel tekkis viga")

        res.status(200).json(meme)
    } catch(e){
        res.status(400).json({error:e.message })
    }
}

exports.createMeme= async(req, res)=>{
  const newMeme= new Meme({
    "userName":req.body.userName,
    "memeName":req.body.memeName,
    "imageURL": `http://localhost:8081/api/images/${req.file.filename}`,
    "memePrivacy": req.body.recipePrivacy,
  })
  newMeme.save()
    .then(()=>{
      res.status(200).send("Meme on üleslaetud")
    }).catch(err=>res.status(500).json(err))
}

exports.getFollowedMemes= async(req, res)=>{
  const{username }= req.params
  var memeArray= []

  try{
    const userName= await User.findOne({userName:username})
    if(!userName) throw Error("Antud kasutajat ei leitud")

    const findMemes= await Meme.find({userName:userName.followedUsers})
    if(!findMemes) throw Error("Antud kasutaja meme-e ei leitud")

    res.status(200).send(findMemes)
  } catch(e){
    res.status(400).json({Error:e.message})
  }
}

exports.likeMeme= async(req, res)=>{
  const{userName, memeID}= req.body;
    try{
      const username= await User.findOne({userName:userName})
      if(!username) throw Error("Antud kasutaja ei eksisteeri")

      const meme= await Meme.findOne({memeID:memeID})
      if(!meme) throw Error("Antud meme-i ei leitud")

      const checkLikesArray= await User.find({userName:userName, likedMemeIDs:{$in:[memeID]}})
      if(checkLikesArray.length != 0) throw Error("Kasutaja on juba antud meme-i likinud")

      const addLikeDataToUser= await User.findOneAndUpdate({userName:userName},{$push:{likedMemeIDs:memeID}})
      if(!addLikeDataToUser) throw Error("Like lisamine kasutaja andmetest nurjus")

      const addLikeDataToMeme= await Meme.findOneAndUpdate({memeID:memeID},{$inc:{memeLikeCount:1}})
      if(!addLikeDataToMeme) throw Error("Like lisamine meme andmetele nurjus")

      res.status(200).json({message:"Meme edukalt like-itud" })
    } catch(e){
        res.status(400).json({error:e.message })
    }
}

exports.unLikeMeme= async(req, res)=>{
  const{userName, memeID}= req.body;
    try{
      const username= await User.findOne({userName:userName})
      if(!username) throw Error("Antud kasutaja ei eksisteeri")

      const meme= await Meme.findOne({memeID:memeID})
      if(!meme) throw Error("Antud meme-i ei leitud")

      const checkLikesArray= await User.find({userName:userName, likedMemeIDs:{$in:[memeID]}})
      if(checkLikesArray.length== 0) throw Error("Kasutaja ei ole antud meme-i likinud")

      const addLikeDataToUser= await User.findOneAndUpdate({userName:userName},{$pull:{likedMemeIDs:memeID}})
      if(!addLikeDataToUser) throw Error("Like eemaldamine kasutaja andmetest nurjus")

      const addLikeDataToMeme= await Meme.findOneAndUpdate({memeID:memeID},{$inc:{memeLikeCount:-1}})

      if(!addLikeDataToMeme) throw Error("Like eemaldamine meme andmetele nurjus")

      res.status(200).json({message:"Meme-ilt like edukalt eemaldatud" })
    } catch(e){
      res.status(400).json({error:e.message })
    }
}

exports.getLikedMemes= async(req, res)=>{
  const{username}= req.params
  var likesArray= []

  try{
    const userName= await User.findOne({userName:username})
    if(!userName) throw Error("Antud kasutaja ei eksisteeri")

    const findMemes= await Meme.find({memeID:userName.likedMemeIDs})

    if(!findMemes) throw Error("Antud jälgitava kasutaja meme-e ei leitud")

    res.status(200).send(findMemes)
  } catch(e){
    res.status(400).json({Error:e.message})
  }
}
