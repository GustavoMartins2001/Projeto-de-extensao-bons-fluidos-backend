const jwt = require('jsonwebtoken');

const authenticateToken = (requiredPermission = "user") => (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Se não há header de autorização
    if (!authHeader) {
        console.log("Token não fornecido");
        return res.sendStatus(401);  // Unauthorized
    }

    const token = authHeader.split(' ')[1]; // Extrair o token

    if (token == null) {
        console.log("Token está nulo");
        return res.sendStatus(401);  // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Falha na verificação do token:", err);
            return res.sendStatus(403);  // Forbidden
        }   //1 = True, 0 = False

        if(!verifyPermission(user, requiredPermission)){
            return res.status(403).json({ error: "Acesso negado." });
        }
        req.user = user;
        next();
    });
};

const verifyPermission = (user, requiredPermission) => {
switch (requiredPermission){
    case "user":    //padrao de todos os usuarios
        return true;
    case "supporter":   //supporters podem criar e editar eventos
        return user.supporter > 0;
    case "super":       //superUsers podem criar usuarios. Implementado para caso os interessados nao sejam versados com tecnologia, um administrador possa fazer seu cadastro.
        return user.superUser > 0;

    default:
        return false;
}
}
module.exports = authenticateToken;


