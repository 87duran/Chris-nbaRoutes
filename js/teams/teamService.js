var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){
	var parseRoot = 'https://api.parse.com/1/classes/';
	return {
		addNewGame: function(gameObject) {
			var url = parseRoot + gameObject.homeTeam;
				homeTeamScore = parseInt(gameObject.homeTeamScore),
				opponentScore = parseInt(gameObject.opponentScore);
			console.log(url, homeTeamScore, opponentScore);
			//this below is for checking for NaN
			
			//if (isNaN(homeTeamScore) || isNan(opponentScore)) {
			//	console.log('it is a Nan!');
			//}

			gameObject.won = gameObject.homeTeamScore > gameObject.opponentScore;
			return http.post(url, gameObject); //this is a promise
			},
			getTeamData: function(teamName) {
				var deferred = $q.defer();
				$http.get(parseRoot + teamName).then(function(data) {
					var results = data.data.results.
					i = results.length,
					wins = 0,
					losses = 0;
				while (i--) {
					if(results[i].won) {
						wins += 1;
					}
					else {
						losses += 1;
					}
				}
				results.wins = wins;
				reults.losses = losses;
				deferred.resolve(results);
			});
			return deferred.promise;
		}
	};
});