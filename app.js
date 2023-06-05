//jshint esversion:6
//simon game link--> https://effortless-tanuki-f28fa9.netlify.app
//Todolist link--> https://odd-pear-trench-coat.cyclic.app
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const https=require("https");
const date=require(__dirname+"/date.js");
// const uri=mongodb+srv:shubhamgangus972:<password>@cluster0.mz7miqr.mongodb.net/?retryWrites=true&w=majority
// const information=[];
const mongoose=require("mongoose");
const homeStartingContent = "Welcome you all to my notes manager! Here you can store notes.";
// const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://shubham:CpJaTrA8pxqy5jS2@cluster0.dwgfoma.mongodb.net/personalBlogging",{useNewUrlParser: true});
const itemschema=new mongoose.Schema({
   title: String,
   content: String
});
// const ScheduleSchema = new mongoose.Schema({
//       date: String,
//       content: String
// });
const Blog=mongoose.model("Blog",itemschema);
// const Journal=mongoose.model("journal",ScheduleSchema);
// app.get("/",function(req,res){
//    res.render("signup");
// });
// app.post("/",function(req,res){
//    const name=req.body.username;
//    const email=req.body.email;
//    const password=req.body.password;
//    // const password1=req.body.password2;
//    // console.log(name,email,password,password1);
//    var data={
//       members: [
//          {
//             email_address: email,
//             status: "subscribed",
//             merge_fields: {
//                FNAME: name,
//                LNAME: password
//             }
//          }
//       ]
//    }
//   const jsonData= JSON.stringify(data);
//   const url="https://us21.api.mailchimp.com/3.0/lists/4a99c64ae7";
//   const options={
//      method: "POST",
//      auth: "shubham:d8ed7caab3ca31b20d41d0b9aa02761b-us21"
//  }
//   const request=https.request(url,options,function(response){
//      response.on("data",function(data){
//         // console.log(JSON.parse(data));
//      });
//  });
//   request.write(jsonData);
//   request.end();
//   res.redirect("/blogging")
// });
app.get("/blogging",function(req,res){
     Blog.find().then(function (models) {
       res.render("home",{key:"Home",content:homeStartingContent,important:models});})
.catch(function (err) { console.log(err);
});
});
app.get("/blogging/about",function(req,res){
        res.render("about",{key:"About"});
});
app.get("/blogging/contact",function(req,res){
        res.render("contact",{key:"Contact",content:contactContent});
});
app.get("/blogging/compose",function(req,res){
        res.render("compose",{key:"Compose"});
});
app.post("/blogging/compose",function(req,res){
   const blog={
      title: req.body.title,
      content: req.body.info
   }
   const newBlog = new Blog({
       title: blog.title,
       content: blog.content
   });
   newBlog.save();
   //new thinking
 //   const dairy={
 //      date: date(),
 //      content: req.body.info
 //   }
 //  const newjournal=new Journal({
 //      date: dairy.date,
 //      content: dairy.content
 // });
 //   newjournal.save();
   res.redirect('/blogging');
});
app.get("/blogging/update",function(req,res){
   res.render("update",{key: "Delete"});
});
app.post("/blogging/update",function(req,res){
   const day=req.body.update;
   Blog.deleteOne({ title: day}).then(result => {
    console.log(result)
});
   res.redirect("/blogging");
});
app.get("/blogging/:xyz",function(req,res){
    const extra=_.lowerCase(req.params.xyz);
    Blog.find().then(function (models) {
     for(let i=0;i<models.length;i++)
       {
          if(extra===models[i].title)
            res.render("indiv",{title:models[i].title, content:models[i].content});
       }

   })
   .catch(function (err) {
     console.log(err);
  });
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
