"use strict";

(function(namespace) {

	var bioRequirements = require("biology-requirements");
	var busRequirements = require("business-requirements");
	var matCSRequirements = require("mat-cs-requirements");
	var comRequirements = require("com-requirements");

	namespace.exports = {
		bio:               bioRequirements.bio,
		//bus-mgmt:          busRequriements.bus-mgmt,
		//com-nm:            comRequirements.com-nm,
		cis:               matCSRequirements.cis,
		csc:               matCSRequirements.csc,
		mat:               matCSRequirements.mat,
		//mat-ed-adult:      matCSRequirements.mat-ed-adult
		none:              {majorName: "N/A", majorCodeNumbers: [], relatedCodes: [], isBA: true}
	};

	namespace.exports["bus-mgmt"] =  busRequirements["bus-mgmt"];
	namespace.exports["com-nm"] = comRequirements["com-nm"];
	namespace.exports["mat-ed-adult"] = matCSRequirements["mat-ed-adult"];

})(provide("major-requirements"));

/*
function getMajorRequirements(subjectCode)
{
	if(subjectCode.toLowerCase() == "bio")
		return getBIOMajorRequirements();

	else if(subjectCode.toLowerCase() == "bus-mgmt")
		return getBUSMgmtMajorRequirements();

	else if(subjectCode.toLowerCase() == "cis")
		return getCISMajorRequirements();

	else if(subjectCode.toLowerCase() == "com-nm")
		return getCOMNMMajorRequirements();

	else if(subjectCode.toLowerCase() == "csc")
		return getCSCMajorRequirements();

	else if(subjectCode.toLowerCase() == "mat")
		return getMATMajorRequirements();
	else if(subjectCode.toLowerCase() == "mat-ed-adult")
		return getMATAdEdMajorRequirements();

	else 
		return {
			major:"N/A",
			majorCodeNumbers:[],
			relatedCodes:[]
		};
}
*/