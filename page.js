var express = require('express')
var ap = express()

app.use(express.static('public'))
app.set('view engine', 'ejs');

var mongojs = require('mongojs')

var db = mongojs('COnnectionString', ['msg','users'])


//MongoDB ConnectionString Example : mongodb://username:password@cluster0-shard-00-00-0hsgx.mongodb.net:27017/databaseName?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin

app.get('/', function(req,res){
res.sendFile(__dirname+'/public/index.html')
})

app.get('/login', function(req,res){
res.sendFile(__dirname+'/public/login.html')	
})


app.get('/signupSubmit', function(req,res){
	
	var da = {
		Name:req.query.na,
		Email:req.query.em,
		Pass:req.query.ps,
		Phone:req.query.ph
	}

db.users.find({Email:req.query.em}, function(err,data){
	if(err){
		res.send('something went wrong')
	}
	else{
		if(data.length>0){
			res.send("Email id is exist")
		}
		else{
			db.users.insert(da,function(err,data){
	if(err){
		res.send("something went wrong")
	}
	else{
	res.sendFile(__dirname+'/public/login.html')	
	}
		})
		}
	}
})


})


app.get('/loginSubmit', function(req,res){
	var da = {
		Email: req.query.em,
		Pass: req.query.ps
	}

	db.users.find(da, function(err,data){
		if (err) { 
			res.send('something went wrong')
		}
		else{
			if(data.length>0){
				console.log(data)

				db.users.find({}, function(err,dat){
					if(err){
						res.send('something went wrong')
					}
					else{
						console.log(dat)
						res.render('das', {res:data, use: dat})
					}
				})

				
			}
			else{
				res.send('username & password is wrong')
			}
		}
	})

})

app.get('/dash', function(req,res){
	
})

app.get('/profile/:username', function(req,res){
	
db.users.find({Email:req.params.username}, function(err,data){
	if (err) { 
			res.send('something went wrong')
		}
		else{

		res.render('das', { use: data})
		}
})

})


// app.get('/sendmessage/:msg/:chatId', function(req,res){
// 	api.sendmessage({
// 		text:req.params.msg

// 	})
// })

app.listen('3000', function(){
console.log("started")
})