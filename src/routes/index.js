const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');

var serviceAccount = require("../../sw2-construction-firebase-adminsdk-44x1w-7f85ada6d1");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sw2-construction.firebaseio.com/'
});


const db = admin.database();

router.get('/',(req,res) => {
    res.render('index');
});

router.get('/signIn',(req,res) =>{
    res.render('signIn');;
});

router.get('/signUp',(req,res) => {
    res.render('signUp');
})

router.post('/newUser', (req, res) => {
    console.log(req.body);
    const newUser = {
        firstname: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };
    db.ref('users').push(newUser);
    res.send('Nuevo usuario creado');
});

module.exports = router;

