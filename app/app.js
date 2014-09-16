var app = angular.module('fpApp', ['ngRoute','fpServices','fpFilters']);

app.config(['$routeProvider', function ($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/add.html',
			controller: 'AddCtrl'
		})
		.when('/view/:id',{
			templateUrl: 'partials/view.html',
			controller: 'ViewCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);



app.controller('ListCtrl', ['$scope','myService', function ($scope, myService){
	$scope.contacts = myService.contacts;

}]);

app.controller('ViewCtrl', ['$scope','$routeParams','myService','$filter', 
	function ($scope, $routeParams, myService, $filter){
		$scope.contact = myService.get($routeParams.id);	

}]);

app.controller('AddCtrl', ['$scope','$location', 'myService', 
	function ($scope, $location, myService){
		
		// initialize data structure
		$scope.data = {
			name: "",
			email: "",
			phone: "",
			canwork: {
				mon: false,
				tue: false,
				wed: false,
				thu: false,
				fri: false,
				sat: false,
				sun: false
			} 
		};

		// toggle the boolean value to display day label
		$scope.canworkCheck = function(date, value){
			$scope.data.canwork.date = !value;
		};

		// save the data, after that move to the view
		$scope.save = function (data){
			var id = myService.save({
				name: data.name,
				email: data.email,
				phone: data.phone,
				canwork: {
					mon: data.canwork.mon,
					tue: data.canwork.tue,
					wed: data.canwork.wed,
					thu: data.canwork.thu,
					fri: data.canwork.fri,
					sat: data.canwork.sat,
					sun: data.canwork.sun
				}
			});
			$location.path('/view' + id);
		}

	}]);

app.controller('mainCtrl', ['$scope','myService','$filter', 
	function ($scope, myService,  $filter){
		var today = new Date();
		$scope.date = $filter('myDateFilter')(today);

		// findout current user can work or not
		$scope.availableToday = function (contact){
			var today = $scope.date;	// Wednesday
			today = today.substring(0,3).toLowerCase();	// wed
			for(var key in contact.canwork){
				if (key === today && contact.canwork[key]) {
					return true;
				}
			}
		};



		var numOfPeople = myService.contacts.length;
		$scope.whoCanWorkToday = function (contacts, today){
		  
		var can = [];
		  
		for(var i = 0; i < numOfPeople; i++){
		    if(contacts[i].canwork[today] === true){
			    can.push(contacts[i]);
		    }
		}
		
		return can;
		}


}]);





