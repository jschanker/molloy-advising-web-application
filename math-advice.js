function getMATMajorRequirements()
{
	var majorName = "MAT";
	var majorCodeNumbers = [[115,225],[221],[222],[223],[229],[232],[251],[324],[330],[345],
	                  [460],[491],[331,335,336,342,347,356,361,390]];
	var relatedCodes = [["CSC  103", "CSC  120", "CIS  235"], 
	                    ["PHY  270", "PHY  271", "BIO  110", "ESC  115"],
	                    ["PHY  270", "PHY  271", "BIO  110", "ESC  115"]];

	return {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes
	};
}
