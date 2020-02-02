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
    res.redirect('/principal');   
});
//-----------------
router.get('/delete/:nameHouse', (req, res) =>{
    const { nameHouse } = req.params;
    db.collection('houses').where('nameHouse','==',nameHouse).get().then((snapshot) =>{
        snapshot.docs.forEach(doc => {
            db.collection('houses').doc(doc.id).delete();
        })
    });
    res.redirect('/principal');
});
//---------------------
/*router.get('/edit/:nameHouse/:direction', (req, res) =>{
    const { nameHouse, direction } = req.params;
    
    //var IDedit;
    var toEdit;
    db.collection('houses').where('nameHouse','==',nameHouse).get().then((snapshot) =>{
        snapshot.docs.forEach( doc => {
            toEdit = {
                id: doc.id,
                nameHouse: nameHouse,
                direction: direction
            }
            console.log(toEdit);
            //res.render('editHouse', {editHouse: toEdit});
        })
    });
    res.render('editHouse', {editHouse: toEdit});
    
});*/
router.get('/edit/:nameHouse', (req, res) =>{
    const { nameHouse } = req.params;
    
    //var IDedit;
    
    db.collection('houses').where('nameHouse','==',nameHouse).get().then((snapshot) =>{
        var array = [];
        snapshot.docs.forEach( doc => {
            var id = doc.id;
            var datos = doc.data();
            var toEdit = {
                id: id,
                nameHouse: datos.nameHouse,
                direction: datos.direction
            }
            array.push(toEdit);
            //console.log(array);
            //res.render('editHouse', {editHouse: toEdit});
        })
        res.render('editHouse', {editHouse: array[0]});
    });  
});


router.post('/editHouse/:id/:nameHouse/:direction', (req, res)=> {
    const { id, nameHouse, direction } = req.params;
    /*db.collection('houses').doc(id).update({
        nameHouse: nameHouse,
        direction: direction
    });*/
    res.redirect('/principal');
});

//-------

router.get('/logOut', (req, res) => {
    res.render('signIn');
});


//-------

module.exports = router;

