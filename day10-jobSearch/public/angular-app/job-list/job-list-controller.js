angular.module("jobSer", ["ngRoute"]).controller("JobsController", JobsController);


function JobsController(JobDataFactory) {
    
    const vm= this;
    vm.title= "Job Openning App";
   
    JobDataFactory.getAllJobs().then(function(response) {
    vm.jobs= response;
   
    });
    }
