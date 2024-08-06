const express = require('express');
const router = express.Router();

// Route pour le formulaire de connexion administrateur
router.get('/login', (req, res) => {
    res.render('adminLogin', { title: 'Admin Login' });
});

// Route pour traiter la soumission du formulaire de connexion administrateur
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Logique d'authentification administrateur
    if (username === 'admin' && password === 'adminpassword') {
        req.session.adminAuthenticated = true;
        res.redirect('/admin/backend');
    } else {
        res.send('Identifiants administrateur incorrects');
    }
});

// Middleware pour protéger les routes administrateur
function isAdminAuthenticated(req, res, next) {
    if (req.session.adminAuthenticated) {
        return next();
    } else {
        res.redirect('/admin/login');
    }
}

// Route protégée pour la page d'administration
router.get('/backend', isAdminAuthenticated, (req, res) => {
    res.render('backend');
});

module.exports = router;
