angular.module("jobSer").controller("JobController",JobController);

function JobController(JobDataFactory, $routeParams) {
console.log("display control in");
const vm= this;
const id= $routeParams.jid;
JobDataFactory.getOneJob(id).then(function(response) {
vm.job= response;
});
}