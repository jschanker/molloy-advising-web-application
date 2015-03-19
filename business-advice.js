"use strict";

(function(namespace) {

	var majorName = "BUS";
	var majorCodeNumbers = [[101, "101H"],[240],[260, "260H"],[261, "261H"],[301, "301H"],[303],[304],[307],[330],[334],[343, "343H"],[350, "350H"],
	                        [900,332,335,337,338,340,342,351,361,362,363,364,366,367,368,369,370,372,380,381,383,384,387,388,390,"390H",402,403],
	                        [900,332,335,337,338,340,342,351,361,362,363,364,366,367,368,369,370,372,380,381,383,384,387,388,390,"390H",402,403],
	                        [389,"389H",460,484],[490]];
	var relatedCodes = [["CIS  105"], ["CIS  360"], ["COM  229"], ["COM  239"], ["ECO  251"], ["ECO  252"], ["ECO  315"], 
	                    ["ECO  320"], ["ENG  238"], ["ETH  257"], ["MAT  129"]];

	namespace.exports["bus-mgmt"] = {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes,
		    isBA:false
	};

})(provide("business-requirements"));
