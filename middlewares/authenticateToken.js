const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
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
        console.log("token", token)
        console.log("secret", process.env.JWT_SECRET)
        if (err) {
            console.log("Falha na verificação do token:", err);
            return res.sendStatus(403);  // Forbidden
        }
        
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;