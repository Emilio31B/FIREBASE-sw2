const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://sw2-construction.firebaseio.com/'
});
//38:21

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

