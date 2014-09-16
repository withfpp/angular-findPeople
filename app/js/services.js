'use strict';

// MODULE NAME : fpServices
// SERVICE NAME : 1. myService

// 1. myService
// method : save() , get()
// useage : myService.get(id)


var app = angular.module('fpServices', []);

app.value('localStorage', window.localStorage);

// app service name is => "myService"
app.service('myService', function (localStorage, $rootScope){
	var that = this;

	that.save = function (contact) {
		if(!contact.hasOwnProperty('id')){
			var start = 1;
			for (var i = 0; i < that.contacts.length; i++){
				if (that.contacts[i].id > start) start = that.contacts[i].id;
			}
			//extracted biggest number, and for the next number, add 1
			start = start + 1;
			contact.id = start;
			//now i have an id value
		}

		that.contacts.push(contact);

		return contact.id;
	}

	that.get = function (id) {
		for (var i = 0, len = that.contacts.length; i < len; i++){
			if (that.contacts[i].id == id) {
				// return the found contact
				console.log(that.contacts[i]);
				return that.contacts[i];
			}
		}
	}


	// make a new storage
	generator('contacts','cpContactLists');

	if (that.contacts.length === 0){
		that.save({
			name: "Leon Kim",
			email: "withfpp@gmail.com",
			phone: "02108288903",
			canwork: {
				mon: true,
				tue: true,
				wed: true,
				thu: true,
				fri: true,
				sat: false,
				sun: false
			}
		});
	}


	function generator (localName, storageName ){
		//new local storage
		var json = localStorage[storageName];
		console.log('generated : ' + json);
		that[localName] = json ? JSON.parse(json) : [];
		console.log(that[localName]);

		$rootScope.$watch(
				function (){
					// watch the that[localName];
					return that[localName];
				},
				function (newVal){
					if (newVal){
						console.log('you\'ve got new val');
						localStorage[storageName] = JSON.stringify(newVal);
					}
				},
				true
			);
	}
});