const mongoose = require("mongoose")
const Student = mongoose.model("Student");

module.exports.getAllStudents = function(req,res){
    Student.find().exec(function(err,data){
        const response = {
            status:200,
            data: data
        }
        if(err){
            response.status = 500;
            response.data = err;
        }
       console.log(data);
        res.status(response.status).json(response.data)
    })
}

module.exports.getOneStudent = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id;
        Student.findById(id).exec(function(err,data){
            const response = {
                status:200,
                data: data
            }
            if(err){
                response.status = 500;
                response.data = err;
            }
            else if(!data){
                response.status = 400;
                response.data = "Student not found";
            } 
            console.log("student found ",data)
            res.status(response.status).json(response.data)
        })
    }
    
}


function _updateStudent(req,res,student){

    student.name = req.body.name;
    student.GPA = req.body.GPA;
    student.courses = req.body.courses;
    
    student.save(function(err,student){
        const response = {
            status:200,
            data: student
        }
        if(err){
            response.status = 500;
            response.data = err;
        }
        else {
            res.status(response.status).json(response.data)
        }
    })
}

module.exports.fullUpdateStudent = function(req,res){
    if(req.params && req.params.id ){
        const id = req.params.id;
        Student.findById(id).exec(function(err,data){
            const response = {
                status:200,
                data: data
            }
            if(err){
                response.status = 500;
                response.data = err;
            }
            else if(!data){
                response.status = 400;
                response.data = "Student not found";
            } 
            if(data){
                _updateStudent(req,res,data)
            } else {
                res.status(response.status).json(response.data)
            }
            
        })
    }
}

module.exports.deleteStudent = function(req,res){
    if(req.params && req.params.id ){
        const id = req.params.id;
        Student.findByIdAndRemove(id).exec(function(err,data){
            const response = {
                status:200,
                data: data
            }
            if(err){
                response.status = 500;
                response.data = err;
            }
            else if(!data){
                response.status = 400;
                response.data = "Student not found";
            } 
            res.status(response.status).json(response.data)
            
        })
    }
}



module.exports.getCoursesForStudent = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id; //students id
        Student.findById(id).exec(function(err,data){
           console.log("course found ",data.courses)
            res.status(200).json(data.courses)
        })
    }
}

module.exports.getCourseByIdInStudent = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id;
        const cid = req.params.cid;
        console.log("input Id",cid);
        Student.findById(id).exec(function(err,data){
            let courses = data.courses;
           
            let course = courses.filter(elem =>elem._id == cid);
            console.log("found  course ", course);
            res.json(course)
            
        })
    }
    
}

module.exports.addCourseToStudent = function(req,res){
    if(req.params && req.params.id){
        Course.findOne().exec(function(err,data){
            Student.findByIdAndUpdate(req.params.id,{$set:{courses:[data]}}).exec(function(err,student){
                res.status(200).json(student)
            })
        })
    }
}

module.exports.creatStudent = function(req, resp){
    console.log("==>", req.body);
    Student.create({
        name : req.body.name, 
	    GPA: req.body.GPA,
	    courses: req.body.courses
    },
    function(err, student){
        if(err){
            console.log("error");
        }
        else{
            console.log(student);
            resp.status(201).json(student);
        }
    }
    )
}

