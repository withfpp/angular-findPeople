'use strict';

// DOC : https://docs.angularjs.org/api/ng/filter/date
// dateFilter : return the today's value
// for : compare the applicant's canwork value 

angular.module('fpFilters',[])
	.filter('myDateFilter', function ($filter){
		return function(today){
			return $filter('date')(today, 'EEEE');
		}
	});


