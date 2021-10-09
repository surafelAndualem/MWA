angular.module("jobSer").factory("JobDataFactory", JobDataFactory);
function JobDataFactory($http) {
return {
    getAllJobs: getAllJobs,
    getOneJob: getOneJob,
    addOne:addOne
};
function getAllJobs() {
console.log($http.get("/api/jobs").then(complete).catch(failed));
return $http.get("/api/jobs").then(complete).catch(failed);
}
function getOneJob(id) {
return $http.get("/api/jobs/"+id).then(complete).catch(failed);
}
function addOne(id) {
    return $http.post("/api/jobs/"+id).then(complete).catch(failed);
    }
function complete(response){
console.log("==>",response.data);
return response.data;
}
function failed(error) {
console.log("==>featch error");
return error.status.statusText;
}
}