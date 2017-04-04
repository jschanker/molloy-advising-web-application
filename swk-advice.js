function getSWKMajorRequirements()
{
	var majorName = "SWK";
	//var electiveSelection = [900,325,327,347,348,350,352,353]; // Add 200- or 300- Level GRN courses
	var electiveSelection = [900,347,350,353]; // Add 200- or 300- Level GRN courses
	var relatedElectiveSelection = ["SPA  101", "SPA  102", "SPA  103", "SPA  104", "SPA  105", "SPA  106",
	                     "SPA  201", "SPA  209", "SPA  215", "SPA  216", "SPA  220", "SPA  224",
	                     "SPA  250", "SPA  305", "SPA  307", "SPA  312", "SPA  313", "SPA  314",
	                     "SPA  324", "SPA  330", "SPA  331", "SPA  335", "SPA  336", "SPA  341",
	                     "SPA  351", "SPA  352", "SPA  353", "SPA  370", "SPA  381", "SPA  390",
	                     "SPA  409", "SPA  421", "SPA  424", "SPA  425", "SPA  427", "SPA  429", 
	                     "SPA  461", "SPA  462", "SPA  470", "SPA  491", "ASL  101", "ASL  102"];
	var relatedElectiveSelection2 = relatedElectiveSelection.slice(1);
	var majorCodeNumbers = [[240],[241],[250],[342],[343],[344],[351],[360],
	                  [452],[453],[460],[461],[464],[465],electiveSelection];
	var relatedCodes = [["BIO  110"], ["MAT  115"], ["PSY  111"], ["PSY  326"], ["SOC  101"],
	                    relatedElectiveSelection, relatedElectiveSelection2];

	return {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes,
		    isBA: false
	};
}