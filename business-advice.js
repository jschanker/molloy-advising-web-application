function getBUSMgmtMajorRequirements()
{
	var majorName = "BUS";
	var majorCodeNumbers = [[101],[240],[260],[261],[301],[303],[304],[307],[330],[334],[343],[350],
	                        [900,332,335,337,338,340,342,351,361,362,363,364,366,367,368,369,370,372,380,381,383,384,387,388,390,402,403],
	                        [900,332,335,337,338,340,342,351,361,362,363,364,366,367,368,369,370,372,380,381,383,384,387,388,390,402,403],
	                        [389,460,484],[490]];
	var relatedCodes = [["CIS  105"], ["CIS  360"], ["COM  229"], ["COM  239"], ["ECO  251"], ["ECO  252"], ["ECO  315"], 
	                    ["ECO  320"], ["ENG  238"], ["ETH  257"], ["MAT  129"]];

	return {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes,
		    isBA:false
	};
}
