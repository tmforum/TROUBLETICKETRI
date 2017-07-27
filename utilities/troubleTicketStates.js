'use strict';

module.exports = { nextStates };

// Quick and dirty: Hard coded model - to be fixed later

function nextStates ( currentState ) {
	var targetStates = [];

	switch( currentState ) {
		case "Submitted": {
			targetStates = ["Acknowledged", "Rejected"];
			break;
		}
		case "Acknowledged":{
			targetStates = ["InProgress", "Cancelled"];
			break;
		}
		case "InProgress": {
			targetStates = ["Resolved", "Cancelled" ];
			break;
		}
		case "Resolved": {
			targetStates = ["Closed"];
			break;
		}
		case "Rejected": {
			targetStates = ["Closed"];
			break;
		}
	}

	return targetStates;
}

