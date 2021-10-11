
angular.module("bookstore",['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"/angular-app/book-list/book.html",
        controller:"allBookController",
        controllerAs:"allB"
    }).when("/book/:bookId",{
        templateUrl:"/angular-app/book-display/book.html",
        controller:"oneBookController", 
        controllerAs:"oneB"
    }).when("/register", {
        templateUrl: "angular-app/register/register.html ",
        controller: "RegisterController",
        controllerAs: "vm"
        }).otherwise({
        redirectTo:"/"
    })
}