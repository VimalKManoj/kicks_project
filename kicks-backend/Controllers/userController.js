

exports.signUp = (req , res ) =>{

    console.log(req.body)

    res.status(201).json({ status: "success",  });
}