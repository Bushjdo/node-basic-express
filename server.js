var express =  require('express');
var hbs = require('hbs');
var fs = require('fs');
var port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper('year',()=>{
  return new Date().getFullYear();
})
app.set("view engine","hbs");


app.use((req , res , next)=>{
  var now = new Date().toString();
  var log = `${now} : ${req.url} , ${req.method}`;
  fs.appendFileSync("severLog.log", log +'\n',(err)=>{
    if(err){
      console.log("Can't write log server..");
    }
  })
  //toString se format date ve dang String co the doc duoc de dange
  // console.log(`${now} : ${req.url} , ${req.method}`);
  next();
});


// app.use((req , res , next)=>{
//   res.render('maintaince.hbs');
// });

// app.use se giup express nhan cac ham middleware ma ta muon thuc hien
app.use(express.static(__dirname +"/public"));

app.get('/',(req ,res)=>{
  // to pass the data to template , we must specify the object in second agrument ( object : object)
  res.render('about',{
    pageTitle:"Bushjdo page"

  });
});

app.get('/json',function(req , res){
  // res.send("hello");
  res.json({
    name:"phuc",
    age:25
  })
});

app.get('/help',(req , res)=>{

});



app.listen(port  , ()=>{
  console.log(`Server is starting on....${port}`);
})
