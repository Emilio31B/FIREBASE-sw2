const { Router } = require('express');
const router = Router();
//const firebase = require('firebase-admin');
//-----------------------------------------------
const admin = require('firebase-admin');

var serviceAccount = require("../../firestore-sw2-firebase-adminsdk-vidyq-f6edb114a6");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://firestore-sw2.firebaseio.com'
});

const db = admin.firestore();
var usernameGlobal = null;

router.get('/',(req,res) => {
    res.render('index');
});

router.get('/signIn',(req,res) =>{
    res.render('signIn');;
});

router.post('/validated', (req ,res) => {
    var username = req.body.username;
    const password = req.body.password;
    db.collection('users').where('username','==',username).get().then((snapshot) =>{
        if(snapshot.empty){
            res.render('signIn');
        }else{
            snapshot.docs.forEach(doc => {
                const pss = doc.data().password;
                usernameGlobal = username;
                if(password === pss){
                    //res.render('principal');
                    res.redirect('/principal');
                }else{
                    res.render('signIn');
                }               
            });
        }             
    })
    
    
});
//---------------------------------------

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
    db.collection('users').add(newUser);
    res.render('signIn');
});


//--------
router.get('/principal', (req, res) => {
    
    db.collection('houses').where('owner','==',usernameGlobal).get().then((snapshot, lisdt) => {
        var array = [];
        snapshot.docs.forEach(doc => {
            var datos = doc.data();
            const desc = {
                nameHouse: datos.nameHouse,
                direction: datos.direction
            }
            array.push(desc);
            //console.log(datos);
        })
        
        res.render('principal',{listhomes : array});
    });
});


//----------

router.get('/addHome', (req, res) => {
    res.render('addHouse');
});


router.post('/addHome', (req,res) => {
    const newHome = {
        nameHouse: req.body.nameHouse,
        direction: req.body.direction,
        owner: usernameGlobal
    };
    db.collection('houses').add(newHome);
    res.render('principal');   
});

module.exports = router;

