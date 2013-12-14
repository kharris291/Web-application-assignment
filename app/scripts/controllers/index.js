Assignment.App = angular.module('caTest',[])
    .controller('callsCtrl', ["$scope","$http", function($scope,$http) {
        //$scope.awesomeThings = ["One", "Two", "Three", "Four"];
  		$scope.position=0;
  		$scope.message=[];
        $http.get("calendar/entries").success(function(success){
        	console.log(success)
        	$scope.allInformation= success;

      
 	       $scope.message.push($scope.allInformation[0]);
        
        });

        if($scope.allInformation){
	        
	        for (var i = $scope.allInformation.length - 1; i >= 0; i--) {
	        	if($scope.allInformation[i].date!=$scope.message[$scope.position].date){
	        		$scope.message[position].push($scope.allInformation[i]);
	        	}
	        };

	    }
        
        $scope.check=0;
        $scope.index=null;
        $scope.cal = function() {
 			if($scope.check==0){
	 			$http.post("calendar/entries",{what:$scope.data.what,where:$scope.data.where,date:$scope.data.date,additional_notes:$scope.data.additional_notes})
	 			.success(function(inf){
	 				/*if ($scope.message[$scope.index].date ==information.date) {
	 					$scope.message[$scope.index].where.push($scope.data.where);
	 					$scope.message[$scope.index].when.push($scope.data.where);
	 					$scope.message[$scope.index].additional_notes.push($scope.data.where);
	 				}else{*/
		 				$scope.allInformation.push({"what":$scope.data.what,"where":$scope.data.where,"date":$scope.data.date,"additional_notes":$scope.data.additional_notes});
		 			
	 				console.log($scope.data)
	 				$scope.data="";
	 			});
	 		}else{
	 			$scope.check=0;
	 			$http.put("calendar/entries/"+$scope.id,{what:$scope.data.what,where:$scope.data.where,date:$scope.data.date,additional_notes:$scope.data.additional_notes})
	 			.success(function(information){

	 				$scope.message[$scope.index] = $scope.data;
	 				$scope.data ="";
	 			});

	 		}
 		};

 		$scope.edit = function(message,index){
 			$scope.check =1;
 			console.log(message, index)
 			$scope.data = message;

 			$scope.id = message._id;
 			$scope.index = index;
 		}

 		$scope.delete = function(message,index){
 			$scope.id = message._id;
 			$http.delete("calendar/entries/"+$scope.id,{_id:$scope.id})
	 			.success(function(){
	 				$scope.message.splice(index,1);
	 			});
 		}
 		$scope.next = function(){
 			if ($scope.position!= $scope.allInformation.length-1) {
 				$scope.position++;
 				$scope.message=[];
 				$scope.message.push($scope.allInformation[$scope.position]);
 			};
 		}

 		$scope.previous = function(){
 			if ($scope.position!= 0) {
 				$scope.position--;
 				$scope.message=[];
 				$scope.message.push($scope.allInformation[$scope.position]);
 			};

 		}
 		
 		
    }])