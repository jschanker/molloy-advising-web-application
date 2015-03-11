function getCOMNMMajorRequirements()
{
	var majorName = "COM";
	var electiveSelection = [900,211,213,222,225,229,230,233,234,237,240,242,248,252,254,255,
	                  256,257,259,301,302,311,313,315,330,331,345,349,351,352,355,356,
	                  357,358,360,364,366,367,382,392,452];
	var majorCodeNumbers = [[228],[243],[244],[246],[309],[310],[354],[381],
	                  [468],[488],[490],electiveSelection,electiveSelection,electiveSelection,electiveSelection];
	var relatedCodes = [];

	return {majorName: majorName,
		    majorCodeNumbers: majorCodeNumbers,
		    relatedCodes: relatedCodes,
		    isBA: true
	};
}