angular.module("bookstore").controller("oneBookController", oneBookController);

function oneBookController(bookFactory,$routeParams,$location){
    const vm= this;
    const id = $routeParams.bookId;
    bookFactory.oneBook(id).then(function(response){
        vm.resp = response;
        console.log("found book is in controller",response.data);

    }).catch(function(error){
        console.log(error);
    });

    vm.deleteBook = function(id){
        bookFactory.deleteBook(id).then(function(response){     
            console.log(response);
            $location.path('/');
        }).catch(function(){
            console.log("error");
        });
    }}