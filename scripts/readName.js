var _ = require("underscore");
var fs = require("fs");

var keystone = require('keystone');
var Member = keystone.list('Member');
var names = fs.open("names", "r");

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/mmdc', function(err, db) {
    if(err) throw err;

    var collection = db.collection('members');

    var people = []

	fs.readFile("names", { encoding: "utf8", }, function(err, data) {
		if (!err) {
			
			var lines = data.toString().split('\n');

			_.each(lines, function(line) {
				var name = line.split(", ");
				var lastName = name[0];
				var firstName = name[1];

				var newPerson = {
					key: firstName.toLowerCase() + "-" + lastName.toLowerCase(),
					bio: "Hello, my name is "+firstName,
				    title: "Person",
				    lastName: lastName,
				    firstName: firstName,
				    images: ""};

				people.push(newPerson);

			});


			collection.insert(people, function(err, docs) {
				if(err){
		    		throw err;
		    	}
		    	else{
		    		console.log("Successful");
		    	}        
			});			


		    //Locate all the entries using find
		    collection.find().toArray(function(err, results) {
		    	console.log("Results:");
		        console.dir(results);
		        // Let's close the db
		        db.close();
		    });
		}
	});
});
