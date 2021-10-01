
module.exports.multiplication=function(req,res){
     var number1 = parseInt(req.params.number1);
    var number2 =parseInt(req.query.number2);
  
    res.status(200).json({" The answer is: ": number1*number2})
  }