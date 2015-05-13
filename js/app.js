'use strict';

angular.module('myApp', [])
  .controller('MovieController', function($scope, $http){
    var pendingTask;
    
    var API_KEY = "daac8f7e-f102-4a42-8fdd-9491d78f8669";

    if($scope.search === undefined){
      $scope.search = "RiotSchmick";
      fetch();
    }

    $scope.change = function(){
      if(pendingTask){
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(fetch, 800);
    };

    function fetch(){
      // https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/RiotSchmick?api_key=
      var url = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/"+$scope.search + "?apikey=" + API_KEY;

     
       console.log(url);
      $http.get(url)
       .success(function(response){ $scope.details = response; });

      // $http.get("https://gateway.marvel.com/?s=" + $scope.search)
      //  .success(function(response){  $scope.related = response; });
    }

    $scope.update = function(movie){
      $scope.search = movie.Title;
      $scope.change();
    };

    $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    }
  });
