const { Router } = require('express');
const router = Router();
const firebase = require('firebase-admin');
//-----------------------------------------------
const admin = require('firebase-admin');

var serviceAccount = require("../../firestore-sw2-firebase-adminsdk-vidyq-f6edb114a6");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://firestore-sw2.firebaseio.com'
});


const db = admin.firestore();
//-----------------------------------------------
//const admin = require('firebase-admin');

//var serviceAccount = require("../../sw2-construction-firebase-adminsdk-44x1w-7f85ada6d1");


/*admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sw2-construction.firebaseio.com/'
});*/


//const db = admin.database();

//--------------------------------------------------
/*var firebaseConfig = {
    apiKey: "AIzaSyCUCAqisxZali_WVMZphozhj692kMP33To",
    authDomain: "firestore-sw2.firebaseapp.com",
    databaseURL: "https://firestore-sw2.firebaseio.com",
    projectId: "firestore-sw2",
    storageBucket: "firestore-sw2.appspot.com",
    messagingSenderId: "345449013099",
    appId: "1:345449013099:web:db73a78a5b21bfa6f5f62e"
};*/

//var  serviceAccount = require("../../firestore-sw2-firebase-adminsdk-vidyq-f6edb114a6.json");
/*var firebaseConfig = {
    //credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyCUCAqisxZali_WVMZphozhj692kMP33To",
    authDomain: "firestore-sw2.firebaseapp.com",
    databaseURL: "https://firestore-sw2.firebaseio.com",
    projectId: "firestore-sw2",
    storageBucket: "firestore-sw2.appspot.com",
    messagingSenderId: "345449013099",
    appId: "1:345449013099:web:db73a78a5b21bfa6f5f62e"
};*/

/*firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({timestampsInSnapshots : true});*/
//--------------------------------------------------


router.get('/',(req,res) => {
    res.render('index');
});

router.get('/signIn',(req,res) =>{
    res.render('signIn');;
});

router.post('/validate', (req ,res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.collection('users').get().then((snapshot) => {
        
    });
    
    /*let myref = db.ref('users');
    let queryRef = myref.equalTo('username',username);

    if(queryRef == true){
        console.log(queryRef);
        if(queryRef.password == password){
            res.render('principal');
        }else{
            res.redirect('signIn');
        }
    }else{
        res.redirect('signIn');
    }*/
    
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

    /*const newUser = {
        firstname: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };
    db.ref('users').push(newUser);
    //res.send('Nuevo usuario creado');*/
    res.render('signIn');
});

/*router.get('/principal', (req,res => {
    db.ref('houses').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('principal',{houses: data});
    })
    
}));*/

module.exports = router;

