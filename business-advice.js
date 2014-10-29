function getBUSMgmtMajorRequirements()
{
	var majorName = "MAT";
	var majorCodeNumbers = [[101],[240],[260],[261],[301],[303],[304],[307],[330],[334],
	                  [343],[350],[900],[900],[389,460,484],[490]];
	var relatedCodes = [["CIS  105"], ["CIS  360"], ["COM  229"], ["COM  239"], ["ECO  251"], ["ECO  252"], ["ECO  315"], 
	                    ["ECO  320"], ["ENG  238"], ["ETH  257"], ["MAT  129"]];

	return {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes
	};
}
