const express = require('express');
const mysql2 = require('mysql2');
const dotenv = require ('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config()
const app = express();
const port = 7000;


app.use (express.static('public',{root:__dirname}));

app.use(express.urlencoded({extended: false}))


// connecting to the vaccine_record database

const vrecords = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

vrecords.connect((err) => {
    if(err){
        console.log('Failed connection to database',err.message);
    } else {
    console.log('Successful connection to the database'); }
});

// creating tables for the vaccine_records database

const table1 = "CREATE TABLE IF NOT EXISTS users(user_id INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(100) NOT NULL,email VARCHAR(100) UNIQUE NOT NULL,password_hash VARCHAR(255) NOT NULL,contact_info VARCHAR(255))";    


vrecords.query(table1,(err)=>{
    if(err){
        console.log('error creating table',err.message)

    } else {
        console.log('table created successfully')
    }
    
});



const table2 = "CREATE TABLE IF NOT EXISTS vaccinations (vaccination_id INT AUTO_INCREMENT PRIMARY KEY,user_id INT,vaccine_name VARCHAR(100) NOT NULL,date_administered DATE,provider VARCHAR(100),next_due_date DATE, FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE)";
   

vrecords.query(table2,(err)=>{
    if(err){
        console.log('error creating table',err.message)

    } else {
        console.log('table created successfully')
    }
    
});



const table3 = "CREATE TABLE IF NOT EXISTS centers (center_id INT AUTO_INCREMENT PRIMARY KEY,centername VARCHAR(100) NOT NULL,address VARCHAR(255) NOT NULL,contact_info VARCHAR(100),services_offered TEXT,latitude DECIMAL(9,6),longitude DECIMAL(9,6) )";
   

vrecords.query(table3,(err)=>{
    if(err){
        console.log('error creating table',err.message)

    } else {
        console.log('table created successfully')
    }
    
});



// get request incorporating html files

app.get('/dashboard',(req,res)=>{
    res.sendFile('dashboard.html', {root:__dirname})
});

app.get('/register',(req,res)=>{
    res.sendFile('register.html', {root:__dirname})
});

app.get('/login',(req,res)=>{
    res.sendFile('login.html', {root:__dirname})
});

app.get('/vaccine',(req,res)=>{
    res.sendFile('vaccine.html', {root:__dirname})
});

app.get('/centers',(req,res)=>{
    res.sendFile('centers.html', {root:__dirname})
});


// post request incorporating html files

app.post('/register',async(req,res)=>{
    const{username,email,password_hash,contact_info} = req.body
    const hashedpassword = await bcrypt.hash(password_hash,8)
    vrecords.query("INSERT INTO users SET ?",{username: username,email: email,password_hash: hashedpassword,contact_info: contact_info},(err,result) =>{
        if(err){
            console.log(err)
        } else{
            console.log(result)
            res.redirect('/login')
        }
    })
});



app.post('/login', async(req, res)=> {
    const {username,password_hash}= req.body
    vrecords.query("SELECT * FROM users WHERE username = ?", [username] ,async(err, result)=>{
        if(err){
            console.log(err)
            } else {
                if (result.length >0){
                    const isMatch = await bcrypt.compare(req.body.password_hash, result[0].password_hash)
                if(isMatch){
                    res.redirect('/vaccine')
                } else {
                    res.send("Invalid Credentials") }
                } 
                
                else {
                    res.send("User does not exist")
                }
            }


    })
});   


app.post('/vaccine',async(req,res)=>{
    const{vaccine_name,date_administered,provider,next_due_date} = req.body
    vrecords.query("INSERT INTO vaccinations SET ?",{vaccine_name: vaccine_name,date_administered: date_administered,provider: provider,next_due_date:next_due_date},(err,result) =>{
        if(err){
            console.log(err)
        } else{
            console.log(result)
            res.redirect('/centers')
        }
    })
});

app.post('/centers',async(req,res)=>{
    const{centername,address,contact_info,services_offered} = req.body
    vrecords.query("INSERT INTO centers SET ?",{centername: centername,address: address,contact_info: contact_info,services_offered:services_offered},(err,result) =>{
        if(err){
            console.log(err)
        } else{
            console.log(result)
            res.redirect('/view')
        }
    })
});



  app.listen(port,()=>{
    console.log(
        `Running on localhost ://${port}`
    );
  })