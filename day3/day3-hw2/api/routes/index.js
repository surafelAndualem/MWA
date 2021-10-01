const express=require("express");
const router=express.Router();
const multiplecontrole=require("../controllers/multipl.controllers.js");
   
        router.route("/multiply/:number1/:number2").get(multiplecontrole.multiplication)

module.exports=router;