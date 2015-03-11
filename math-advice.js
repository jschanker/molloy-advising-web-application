function getMATMajorRequirements()
{
	var majorName = "MAT";
	var majorCodeNumbers = [[115,225],[221],[222],[223],[229],[232],[251],[324],[330],[345],
	                  [460],[491],[331,335,336,342,347,356,361,390]];
	var relatedCodes = [["CSC  103", "CSC  120", "CSC  235"], 
	                    ["PHY  270", "PHY  271", "BIO  110", "ESC  115", "BIO  112", "BIO  120", "BIO  121", "BIO  126", "BIO  127", 
	                     "BIO  150", "BIO  151", "BIO  280H", "CHE  103", "CHE  112", "CHE  132", "CHE  133", 
	                     "ESC  125", "ESC  127", "ESC  130", "PHY  271", "BIO  GEDL", "CHE  GEDL", "ENV  GEDL", "ESC  GEDL", 
	                     "PHY  GEDL", "SCIMET1", "SCIMET2"],
	                    ["PHY  270", "PHY  271", "BIO  110", "ESC  115", "BIO  112", "BIO  120", "BIO  121", "BIO  126", "BIO  127", 
	                     "BIO  150", "BIO  151", "BIO  280H", "CHE  103", "CHE  112", "CHE  132", "CHE  133", 
	                     "ESC  125", "ESC  127", "ESC  130", "PHY  271", "BIO  GEDL", "CHE  GEDL", "ENV  GEDL", "ESC  GEDL", 
	                     "PHY  GEDL", "SCIMET1", "SCIMET2"]];

	return {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes,
		    isBA: true
	};
}

function getMATAdEdMajorRequirements()
{
	var majorName = "MAT";
	var majorCodeNumbers = [[115,225],[221],[222],[223],[229],[232],[251],[320],[330],
	                  [491],[331,335,336,342,347,356,361,390]];
	var relatedCodes = [["CSC  103", "CSC  235"], ["PSY  206"], 
	                    ["PHY  270", "PHY  271", "BIO  110", "ESC  115", "BIO  112", "BIO  120", "BIO  121", "BIO  126", "BIO  127", 
	                     "BIO  150", "BIO  151", "BIO  280H", "CHE  103", "CHE  112", "CHE  132", "CHE  133", 
	                     "ESC  125", "ESC  127", "ESC  130", "PHY  271", "BIO  GEDL", "CHE  GEDL", "ENV  GEDL", "ESC  GEDL", 
	                     "PHY  GEDL", "SCIMET1", "SCIMET2"],
	                    ["PHY  270", "PHY  271", "BIO  110", "ESC  115", "BIO  112", "BIO  120", "BIO  121", "BIO  126", "BIO  127", 
	                     "BIO  150", "BIO  151", "BIO  280H", "CHE  103", "CHE  112", "CHE  132", "CHE  133", 
	                     "ESC  125", "ESC  127", "ESC  130", "PHY  271", "BIO  GEDL", "CHE  GEDL", "ENV  GEDL", "ESC  GEDL", 
	                     "PHY  GEDL", "SCIMET1", "SCIMET2"]]; // PSY 206 should be in gen ed

	return {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes,
		    isBA: true
	};
}

function getCISMajorRequirements()
{
	var majorName = "CIS";
	var majorCodeNumbers = [[102, 105],[103],[112],[224],[235],[318],[339],[360],[460],[491],[100,255,390],[100,255,390]];
	var relatedCodes = [["BUS  101"], ["BUS  260"], ["BUS  301"], ["BUS  330"], ["COM  110", "COM  114"], ["ENG  236"],
						["ETH  257"], ["MAT  115"], ["MAT  116", "MAT  118"]];

	return {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes,
		    isBA: false
	};
}

function getCSCMajorRequirements()
{
	var majorName = "CSC";
	var majorCodeNumbers = [[120],[121],[235],[229],[244],[323],[330],[340],[460],[491],[335,390],[335,390]];
	var relatedCodes = [["MAT  115"], ["MAT  221"], ["MAT  222"], ["MAT  228"], ["MAT  232"]];

	return {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes,
		    isBA: true
	};
}
