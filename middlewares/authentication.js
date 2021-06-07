/*----IMPORT------*/
const jwt = require('jsonwebtoken');

let verificar = function verificationJwt(roles){
    return (req,res,next) =>{       
        /* ---- BEARER VERIFICATION --- */
        let token = req.headers['authorization'];
        const newToken = token.split(" ");
        token = newToken[1];
        // FIRST VERIFICATION
        if(!token) res.status(401).json({message:"User not Authorizaded!!"})//DEFINIR MENSAGEM
        //ROLE VERIFICATION
        jwt.verify(token, process.env.ACCESS_SECRET, function(error, decoded){
            // SECOND VERIFICATION
            if(error) res.status(401).json({erro: error});//DEFINIR MENSAGEM
            req.user= decoded;
                        
            //ROLE VERIFICATION
            let isValid = false;
            roles.forEach(role =>{
                if(role == req.user.role){
                    isValid = true;
                }
            })
            if(!isValid) res.status(401).json({mensage: "Usuário sem autorização!!"});//DEFINIR MENSAGEM
            next();
        })
    }   
};

module.exports = verificar;