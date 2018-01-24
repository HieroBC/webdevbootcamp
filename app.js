// Utilities & libraries configuration
var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    request     = require('request'),
    mongoose    = require('mongoose');

//Body-Parser config to
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE configuration

    mongoose.connect("mongodb://localhost/yelp_camp");

    var campgroundSchema = new mongoose.Schema({
       name: String,
       image: String,
       description: String
    });
    
    var Campground = mongoose.model("Campground", campgroundSchema);

// end of MONGOOSE configuration

// mongoose code to create a campground
    // Campground.create({
    //     name: "Palm Camp" ,
    //     image: "https://images.pexels.com/photos/216675/pexels-photo-216675.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    //     description: "Palm camp was once a Palm and Olive plantation, now, as the soil has became too dry to grow olives, it only grows Palms, and is open for camping by it's owner, Colt Rusty Tater."
    // }, function(err, camp){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(camp);
    //     }
    // });
// end of mongoose code

// Data configuration
    //none to config
    
    
// ROUTES configuration

// Home route
app.get("/", function(req, res){
    res.render("home.ejs");
});

// INDEX Campgrounds route
app.get("/campgrounds", function(req, res){
    //mongoose search query
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            //console.log(allCampgrounds);
            res.render("index.ejs", {campgrounds: allCampgrounds});       
        }
    });
});

// SHOW Campgrounds route for POST request
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // mongoose save query
    Campground.create(newCampground, function(err, newlyAddedCampground){
        if(err){
            console.log(err);
        } else {
            console.log(newlyAddedCampground);
            res.redirect("/campgrounds");
        }
    });
    
})

// NEW Campgrounds route
app.get("/campgrounds/new", function(req, res){
    res.render("newcamp.ejs");
});

// SHOW Campgrounds route
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show.ejs", {campground: foundCampground});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("YelpCamp server is now listening...");
});