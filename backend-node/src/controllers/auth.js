const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
const User= require("../models/User");

exports.login= async(req, res)=>{
  const {password, userName}=req.body

  try{
    const user= await User.findOne({userName: userName})
    if(!user) throw Error("Antud kasutaja ei eksisteeri!")

    const isMatch= await bcrypt.compare(password, user.password)
    if(!isMatch) throw Error("Antud parool ei klapi!")

    const userTemplate={
    id: user.id,
    userName
    }

    const token= jwt.sign(userTemplate, process.env.JWT_SECRET)
    if(!token) throw Error("Something critical happened")

    res.status(200).json({
    token,
    ...userTemplate
    })

  }catch(e){
    res.status(400).json({error:e.message})
  }
}

exports.signup= async(req, res)=>{
  const{userName, email, password, firstName, lastName}= req.body

  try{
    const emailCheck= await User.findOne({email: email})
    if(emailCheck) throw Error("Antud email-iga kasutaja eksisteerib")

    const userCheck= await User.findOne({userName: userName})
    if(userCheck) throw Error("User with that username already exists")

    const salt= await bcrypt.genSalt(10)
    if(!salt) throw Error("Miskit läks väga valesti: 1000")

    const hash= await bcrypt.hash(password, salt)
    if(!hash) throw Error("Miskit läks väga valesti: 1001")

    const newUser= new User({
    userName,
    email,
    firstName,
    lastName,
    password: hash,
    passwordConfirmation: hash,
    })

    const savedUser= await newUser.save()
    if(!savedUser) throw Error("Kasutaja loomine ebaõnnestus")

    res.status(200).json({message:"Kasutaja loomine õnnestus"})
  }catch(e) {
    res.status(400).json({error:e.message})
  }
}

exports.getUser= async(req, res)=>{
  const { userName }= req.params;
  try{
    const data= await User.findOne({userName: userName})
    if(!data) throw Error("Kasutaja leidimine nurjus")
    res.status(200).json(data)
  }catch(e){
    res.status(400).json({error:e.message})
  }
}

exports.updateUser= async(req, res)=>{
  const {userName}= req.params;
  try{
    if(req.body.password!= undefined){
      req.body.password= await bcrypt.hash(req.body.password, 8);
      var update= {
        "userName": req.body.userName,
        "email": req.body.email,
        "password": req.body.password,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
      }}else{
      var update= {
        "userName": req.body.userName,
        "email": req.body.email,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
      }};
    const user= await User.findOneAndUpdate({userName: userName}, update)
    if(!user) throw Error("Kasutaja ebaedukalt uuendatud")

    res.status(200).send("Kasutaja edukalt uuendatud")

  }catch(e) {
    res.status(400).json({error:e.message})
  }
}

exports.followUser= async(req, res)=>{
  const {followedUser, followingUser}= req.body

  try{
    if(followedUser== followingUser) throw Error("Sama kasutajat ei saa jälgida")

    const followedData= await User.findOne({userName: followedUser})
    if(!followedData) throw Error("Antud kasutajat ei leitud")

    const checkFollowerArray= await User.find({userName: followingUser, followedUsers: { $in: [followedUser] } })
    if(checkFollowerArray.length!= 0) throw Error("Antud kasutajat juba jälgitakse")

    const followerData= await User.findOneAndUpdate({userName: followingUser}, { $push: { followedUsers: followedUser }})
    if(!followerData) throw Error("Antud kasutaja jälgimisel tekkis viga")
  
    res.status(200).json({message:"Kasutaja jälgimine õnnestus"})
  }catch(e) {
    res.status(400).json({error:e.message})
  }
}

exports.unFollowUser= async(req, res)=>{
  const {followedUser, followingUser}= req.body

  try{
    if(followedUser== followingUser) throw Error("Sama kasutajat ei saa jälgida")

    const followedData= await User.findOne({userName: followedUser})
    if(!followedData) throw Error("Antud kasutajat ei leitud")

    const checkFollowerArray= await User.find({userName: followingUser, followedUsers: { $in: [followedUser] } })
    if(checkFollowerArray.length== 0) throw Error("Antud kasutajat ei jälgita")
  
    const followerData= await User.findOneAndUpdate({userName: followingUser}, { $pull: { followedUsers: followedUser }})
    if(!followerData) throw Error("Antud kasutaja jälgimise eemaldamisel tekkis viga")
  
    res.status(200).json({message:"Kasutaja jälgimise eemaldamine õnnestus" })
  }catch(e) {
    res.status(400).json({error:e.message})
  }
}