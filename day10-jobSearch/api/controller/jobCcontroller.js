const mongoose=require("mongoose");
const jobOpenning=mongoose.model("Job")

module.exports.getAllJobs=function(req,res){
jobOpenning.find().exec(function(err,data){
    const response={
        status:200,
        data: data
    }
    if(err){
        response.status=500;
        response.data=err;
    }
    res.status(response.status).json(response.data)
})
}

module.exports.addNewJobs=function(req,res){
    jobOpenning.create({
       title:req.body.title,
       salary:req.body.salary,
       location:req.body.location,
       description:req.body.description,
       experience:req.body.experience,
       skill:req.body.skill,
       postDate:req.body.postDate

    },
    function(err,job){
        if(err){


            console.log("error");
        }else{
            res.status(200).json(job)
        }
    }
    )

}

module.exports.getOneJob=function(req,res){
    if(req.params && req.params.jid){
        const id=req.params.jid;
        jobOpenning.findById(id).exec(function(err,data){
            const response={
                status:200,
                data:data
            }
            if(err){
                response.status=500;
                response.data=err;
                res.status(response.status).json({"message" :"not correct id"})
            return;
            }
           else if(!data){

            response.status=400;
            response.data="job not found";
           }
           res.status(response.status).json(response.data)
        })
    }
}

module.exports.deleteJob=function(req,res){
    if(req.params && req.params.jid){
        const id=req.params.jid;
        jobOpenning.findByIdAndRemove(id).exec(function(err,data){
            const response={
                status:200,
                data:data
            }

            if(err){
                response.status=400;
                response.data="job not found"
            } else if(!data){
                response.status = 400;
                response.data = "job not found";
            } 

            res.status(response.status).json(response.data)

        })
    }
}

module.exports.updateJob=function(req,res){
    if(req.params && req.params.jid){
        const id=req.params.jid;
        jobOpenning.findById(id).exec(function(err,data){
            const response={
                status:200,
                data:data
            }
            if(err){
                response.status=500;
                response.data=err;
            }
            else if(!data){
                response.status=400;
                response.data="job not found";
            }
            if(data){
                _updateJob(req,res,data)

            }else{
                res.status(response.status).json(response.data)
            }
        })
    }
}


function _updateJob(req,res,job){

    job.title=req.body.title;
    job.salary=req.body.salary;
    job.location=req.body.location;
    job.description=req.body.location;
    job.experience=req.body.experience;
    job.skill=req.body.skill;
    job.postDate=req.body.postDate;

    job.save(function(err,jobs){
        const response={
            status:200,
            data:jobs
        }
        if(err){
            response.status=500;
            response.data=err
        }
        else{
            res.status(response.status).json(response.data)
        }
    })

}

module.exports.getLocationForJob = function(req,res){
    if(req.params && req.params.jid){
        const id = req.params.jid; 
        jobOpenning.findById(id).exec(function(err,data){
        if(err){
            res.status(500).json({"message":"this is not correct location ID "})
            return;
        }
            res.status(200).json(data.location)
        })
    }
}


module.exports.getgetLocationbyId= function(req,res){
    if(req.params && req.params.lid){
        const lid = req.params.lid;
        const jid = req.params.jid;
       // console.log("input Id",jid);
        jobOpenning.findById(jid).exec(function(err,data){
          if(err){

            res.status(404).json({"message":"not found id"})
            return;
          }
          //  console.log("data ",data);
            let locations = data.location;
            
            console.log("jobs ..", locations);
          
            let loc = locations.filter(elem =>elem._id == lid);
            if(loc.length==0){
                res.status(404).json({"message":"this location is not found"});
                return;
            }
          //  console.log("found  job ", loc);
            res.json(loc)
            
        })
    }
    
}

module.exports.deleteLocation = function(req,res){
    if(req.params && req.params.lid && req.params.jid){
        const lid = req.params.lid;
        const jid = req.params.jid;
       

        jobOpenning.findById(jid).exec(function(err,updatedJob){
            let locations = updatedJob.location;
           
           
            let updatedlocations = locations.filter(elem =>elem._id != lid);
            updatedJob.location=updatedlocations
            updatedJob.save(function(err,newjob){
                const response = {
                    status:200,
                    data: newjob
                }
                if(err){
                    response.status = 500;
                    response.data = err;
                    return;
                }
                else {
                    res.status(response.status).json(response.data)
                }
            })

        })
    }
    
}

module.exports.addLocation = function(req,res){
    if(req.params && req.params.jid){
       
        const jid = req.params.jid;
      //  console.log("input Id",jid);
        let auth={};
        auth.city=req.body.city;
        auth.streetAddress=parseInt(req.body.streetAddress);
       
        jobOpenning.findById(jid).exec(function(err,updatedjob){
          
            let locations = updatedjob.location;
          
           locations.push(auth);
           updatedjob.location=locations;
          
           updatedjob.save(function(err,newJob){
               
                const response = {
                    status:200,
                    data: newJob
                }
                if(err){
                    response.status = 500;
                    response.data = err;
                    return;

                }
                else {
                    res.status(response.status).json(response.data);
                }
            })

        })
    }
    
}

module.exports.updatLocation = function(req,res){
    if(req.params && req.params.jid && req.params.lid){
        let jid=req.params.jid;
        let locationId=req.params.lid;
        jobOpenning.findById(jid).exec(function(err,updatedJob){
            if(err){
                res.status(404).json({"message":err});
            }
          
            let locations = updatedJob.location;

        let updatlocat= locations.filter(elem=>elem._id==locationId)[0];

          updatlocat.city=req.body.city;
          updatlocat.streetAddress=req.body.streetAddress;
         
          updatedJob.save(function(err,newjob){
            console.log("saved new job", newjob);
             const response = {
                 status:200,
                 data: newjob
             }
             if(err){
                 response.status = 500;
                 response.data = err;
                 return;
             }
             else {
                 res.status(response.status).json(response.data);
             }
         })
        })


    }}