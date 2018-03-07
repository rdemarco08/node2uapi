var soap = require('strong-soap').soap;
var url = './wsdl/air_v43_0/Air.wsdl';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var validator = require('express-validator');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req,res,next){
    res.locals.errors = null;
    next();
})

app.use(validator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

console.log('node.js application starting...');

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

var args = require('./models/LowFareSearchReq.js');

var options = {
	'endpoint':'https://americas.universal-api.pp.travelport.com/B2BGateway/connect/uAPI/AirService',
	//endpoint:'http://localhost:8888'
};

app.post('/search', function(req, res) {
  console.log(req.body);
  req.check('origin', 'Origin is required').len(3,3);
  req.check('destination', 'Destination is required').len(3,3);
  req.check('ptc', 'Passenger Type Code is required').len(3,3);
  req.check('core', 'GDS is required').len(2,2);
  req.check('date', 'Date is required').len(10,10);
     
  var errors = req.validationErrors();
  if(errors){
      res.render('pages/index',{
          topicHead : 'UAPI+Apigee',
          errors : errors
      });
  }
  else{
    //Assign the request body elements to local variables
  	var origin = req.body.origin;
    var destination = req.body.destination;
    var date = req.body.date;
    var ptc = req.body.ptc;
    var core = req.body.core;
    //Print the values to ensure proper binding
    console.log(origin+', '+destination+', '+date+', '+ptc+', '+core);
    //Map the variable from the request to the outgoing SOAP request
    args.LowFareSearchReq.SearchAirLeg.SearchOrigin.Airport.$attributes.Code = origin;
    args.LowFareSearchReq.SearchAirLeg.SearchDestination.Airport.$attributes.Code = destination;
    args.LowFareSearchReq.SearchAirLeg.SearchDepTime.$attributes.PreferredTime = date;
    args.LowFareSearchReq.AirSearchModifiers.PreferredProviders.Provider.$attributes.Code = core;
    args.LowFareSearchReq.SearchPassenger.$attributes.Code = ptc;
    //Strong-soap client generated, headers filled
    soap.createClient(url, options, function(err, client) {
    	  client.setSecurity(new soap.BasicAuthSecurity('PROVISIONED_USERNAME','PROVISIONED_PASSWORD'));
        client.AirService.AirLowFareSearchPort.service(args, function(err, result) {
          //Convert SOAP response to JSON and parse it for the itinerary view
          var solutions = JSON.stringify(result.AirPricingSolution);
          var segments = JSON.stringify(result.AirSegmentList.AirSegment);
          var jSolutions = JSON.parse(solutions);
          var jSegments = JSON.parse(segments);
          res.render('pages/response', {
            solutions: jSolutions,
            segments: jSegments
          });
        })
      });
  }
});

app.listen(9000);
console.log('Node HTTP server is listening');
 