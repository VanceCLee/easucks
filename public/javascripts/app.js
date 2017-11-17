angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.comments = [];
    $scope.pledges = [];
    $scope.addComment = function() {
      var newcomment = {title:$scope.formContent,upvotes:0};
      $scope.formContent='';
      $http.post('/comments', newcomment).success(function(data){
        $scope.comments.push(data);
      });
    };
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes = data.upvotes;
        });
    };
    $scope.pledge = function(place) {
      return $http.put('/pledge/' + pledges[place]._id)
        .success(function(data){
          console.log("pledge worked");
          pledges[place].pledge = data.pledge;
        });
    };
    $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
	  $scope.incrementUpvotes = function(comment) {
	   $scope.upvote(comment);
    };
    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
    $scope.getSlightlyMore = function() {
      return $http.get('/pledge').success(function(data){
        angular.copy(data, $scope.pledges);
      });
    };
    $scope.getAll();
    $scope.getSlightlyMore();
    $scope.addPledges = function() {
      var newcomment = {title:"downVote",upvotes:0};
      $scope.formContent='';
      $http.post('/pledge', newcomment).success(function(data){
      });
      var newcomment = {title:"eaSucks",upvotes:0};
      $scope.formContent='';
      $http.post('/pledge', newcomment).success(function(data){
      });
    };
    $scope.addPledges();
  }

]);
