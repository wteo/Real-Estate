const checkAuth = (req, res, next) => {
    if (req.session.isLoggedIn === true) {
        next();
    } else {
        res.redirect('/login');
    }
}

export default checkAuth;