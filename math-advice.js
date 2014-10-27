function getMATMajorRequirements()
{
	var majorName = "MAT";
	var majorCodeNumbers = [[115,225],[221],[222],[223],[229],[232],[251],[324],[330],[345],
	                  [460],[491],[331,335,336,342,347,356,361,390]];
	var relatedCodes = [["CSC  103", "CSC  120", "CSC  235"], 
	                    ["PHY  270", "PHY  271", "BIO  110", "ESC  115", "BIO  112", "BIO  120", "BIO  121", "BIO  126", "BIO  127", 
	                     "BIO  150", "BIO  151", "BIO  280H", "CHE  103", "CHE  112", "CHE  132", "CHE  133", 
	                     "ESC  125", "ESC  127", "ESC  130", "PHY  271", "BIOGEDL", "CHEGEDL", "ENVGEDL", "ESCGEDL", 
	                     "PHYGEDL", "SCIMET1", "SCIMET2"],
	                    ["PHY  270", "PHY  271", "BIO  110", "ESC  115", "BIO  112", "BIO  120", "BIO  121", "BIO  126", "BIO  127", 
	                     "BIO  150", "BIO  151", "BIO  280H", "CHE  103", "CHE  112", "CHE  132", "CHE  133", 
	                     "ESC  125", "ESC  127", "ESC  130", "PHY  271", "BIOGEDL", "CHEGEDL", "ENVGEDL", "ESCGEDL", 
	                     "PHYGEDL", "SCIMET1", "SCIMET2"]];

	return {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes
	};
}
