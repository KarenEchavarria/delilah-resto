const sign = 'mi_firma_para_delilah_1234567890!';

const jwt = require('jsonwebtoken');


function createToken(req, res, next) {
   const user = {user_name: req.body.user_name};
   const token= jwt.sign(user, sign);
   res.json( {accessToken: token} );
}

function authenticateToken(req, res, next) {
   try {
      const token = req.headers.authorization.split(' ')[1];
      const verifyToken = jwt.verify(token, sign);
      if (verifyToken) {
         return next();
      }
   } catch {
      res.json('Not Allowed');
   }
}



// Finish function: checkPermissions
 function checkPermissions(req, res, next) {
  if(req.user) { 
    db.getPerms({role_id: req.user.role_id, resource_id: req.resource.id})
       .then(function(perms){
          var allow = false;
          //you can do this mapping of methods to permissions before the db call and just get the specific permission you want. 
          perms.forEach(function(perm){
              if (req.method == "POST" && perms.create) allow = true;
              else if (req.method == "GET" && perms.read) allow = true;
              else if (req.method == "PUT" && perms.write) allow = true;
              else if (req.method == "DELETE" && perm.delete) allow = true;

          })
          if (allow) next();
          else res.status(403).send({error: 'access denied'});
       })//handle your reject and catch here
   } else res.status(400).send({error: 'invalid token'})
}


module.exports = { createToken, authenticateToken };