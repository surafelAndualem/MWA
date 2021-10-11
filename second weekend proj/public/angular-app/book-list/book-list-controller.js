 angular.module("bookstore").controller("allBookController", allBookController);


function allBookController(bookFactory,$route,$location){
    const vm=this
    bookFactory.allBook().then(function(response){
        vm.res= response;
        vm.offset=0;
    }).catch(function(error){
        console.log(error);
    });

    vm.allNo = function(){
        if(vm.offset<0){
            vm.offset=0;
        }
        console.log("offset is ",vm.offset);
        bookFactory.allBook(vm.offset).then(function(response){
            vm.res= response;
    });
}
    vm.addBook= function(){
        
        const newBook = {
            title: vm.newtitle,
            publishedYear: vm.newpublishedYear,
            catagory: vm.newcatagory,
            price: vm.newprice,
            edition:vm.newedition,
            authorname:vm.newauthorname,
            authorage:vm.newauthorage
           
        }

        console.log("new book is", newBook);

        if(vm.bookForm.$valid){
            
            bookFactory.addBook(newBook).then(function(response){
                console.log(response);
                $route.reload();
            }).catch(function(error){
                console.log(error);
            });
        }
        else{
            console.log("form submission error");
        }
    }

    vm.Search = function (searchKey){
        console.log("search key is ", searchKey);
        bookFactory.searchBook(searchKey).then(function(response){
            vm.result=response;
        }).catch(function(error){

        });

    }
}