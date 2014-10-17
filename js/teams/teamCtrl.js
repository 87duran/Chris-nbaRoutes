var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService, teamData){
	$scope.teamData = teamData;
	var nameMap = {
		'utahjazz': 'Utah Jazz',
		'losangeleslakers': 'Los Angeles Lakers',
		'miamiheat': 'Miami Heat'
	},
	imagemap = {
		'utahjazz': 'images/jazz-logo.png',
		'losangeleslakers': 'images/lakers-logo.png',
		'miamiheat': 'images/heat-logo.png'
	},
	newGame = {
		homeTeam: $routeParams.team
	};
	$scope.homeTeam = nameMap[$routeParams.team];
	$scope.logoPath = imageMap[$routeParams.team];
	$scope.newGame = newGame;

	$scope.submitGame = function() {
		teamService.addNewGame($scope.newGame).then(function(){
			teamService.getTeamData($routeParams.team).then(function(data) {
				$scope.teamData = data;
				$scope.newGame = newGame;
				$scope.showNewGameForm = false;
			});
		});
	};
});