function getBIOMajorRequirements()
{
	var majorName = "BIO";
	var majorCodeNumbers = [[126], [127], [242], [245], [257], [465], [497]];
	var relatedCodes = [["CHE  132"], ["CHE  133"], ["MAT  221"], 
	                    ["MAT  225"], ["PHY  270"], ["PHY  271"]];

	return {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes,
		    isBA: false
	};
}
