function getGenEdObject()
{
	var artHistory = ["ART  129", "ART  220", "ART  221H","ART  223", "ART  224", "ART  225",
	                  "ART  228", "ART  230", "ART  232", "ART  233", "ART  236", "ART  237",
	                  "ART  238", "ART  239", "ART  240", "ART  241", "ART  248", "ART  270",
	                  "ART  275", "ART  296", "ART  321H","ART  323H","ART  324H","ART  397", "ART  471"];
	var musicHistory = ["MUS  105", "MUS  107", "MUS  108", "MUS  109", "MUS  164", "MUS  201", "MUS  202",
	                    "MUS  203", "MUS  205", "MUS  208", "MUS  209", "MUS  224H","MUS  322H","MUS  323H",
	                    "MUS  324H","MUS  390", "MUS  471"]; //108 for Ed Majors only, 200 for Music Majors only
	var communications = ["COM  110", "COM  114", "COM  117", "COM  120", "COM  122", "COM  125", "COM  210",
	                      "COM  211", "COM  213", "COM  214", "COM  220", "COM  221", "COM  229", "COM  246",
	                      "COM  313", "COM  314", "COM  356"]; // 229 for Business only, 124 discontinued'
	var english = ["ENG  110"];
	var modernLanguages = ["ARA  101", "ARA  102", "ARA  201", "CHI  101", "CHI  102", "CHI  201", "ESL  125",
	                       "ESL  135", "ESL  136", "ESL  140", "ESL  145", "ESL  155", "FRE  101", "FRE  102",
	                       "FRE  201", "FRE  215", "ITA  101", "ITA  102", "ITA  113", "ITA  114", "ITA  201",
	                       "ITA  215", "ITA  305", "ITA  330", "ITA  331", "SPA  101", "SPA  102", "SPA  103",
	                       "SPA  104", "SPA  113", "SPA  114", "SPA  201", "SPA  215", "SPA  216", "SPA  220",
	                       "SPA  305", "SPA  307", "SPA  309", "SPA  330", "SPA  331"];
	                       //course substitution needed for ITA  113, ITA  114, ITA  203, ITA  204,
	                       //SPA  113, SPA  114, SPA  203, SPA  204, SPA  333, SPA  334
	var englishLiterature = ["ENG  161", "ENG  162", "ENG  241", "ENG  242", "ENG  243", "ENG  244", "ENG  251",
	                         "ENG  252", "ENG  253", "ENG  254", "ENG  255", "ENG  262", "ENG  263", "ENG  281H",
	                         "ENG  310", "ENG  311", "ENG  312", "ENG  313", "ENG  314", "ENG  315", "ENG  321",
	                         "ENG  322", "ENG  323", "ENG  324", "ENG  325", "ENG  332", "ENG  333", "ENG  334",
	                         "ENG  335", "ENG  336", "ENG  337", "ENG  338", "ENG  341", "ENG  343", "ENG  344",
	                         "ENG  345", "ENG  349", "ENG  350", "ENG  351", "ENG  352", "ENG  361", "ENG  362",
	                         "ENG  363", "ENG  364", "ENG  365", "ENG  366", "ENG  381H"]; 
	                       //ENG 261 for Childhood Ed only
	var modernLanguageLiterature = ["ITA  410", "SPA  312", "SPA  320", "SPA  351", "SPA  352", "SPA  353", 
									"SPA  370", "SPA  411", "SPA  412", "SPA  417", "SPA  418", "SPA  425"];
	var history = ["HIS  101", "HIS  102", "HIS  111", "HIS  112", "HIS  114", "HIS  216", "HIS  221", "HIS  223",
	               "HIS  224", "HIS  225H","HIS  230", "HIS  232", "HIS  233", "HIS  240", "HIS  245", "HIS  249",
	               "HIS  250", "HIS  253", "HIS  254", "HIS  260", "HIS  263", "HIS  267", "HIS  310", "HIS  314",
	               "HIS  315", "HIS  316", "HIS  317", "HIS  320", "HIS  325H","HIS  336", "HIS  344", "HIS  361",
	               "HIS  390"];
	var politicalScience = ["POL  100", "POL  101", "POL  103", "POL  106", "POL  107", "POL  115", "POL  200",
	                        "POL  201", "POL  206", "POL  209", "POL  210", "POL  302", "POL  303", "POL  311",
	                        "POL  321", "POL  390"];
	/*var cl_history_politicalScience = ["HIS/POL  213", "HIS/POL  234", "HIS/POL  235", "HIS/POL  236", 
	                                   "HIS/POL  340"];
	history = history.concat(cl_history_politicalScience);
	politicalScience = politicalScience.concat(cl_history_politicalScience);*/
	    history = history.concat(["HIS  213", "HIS  234", "HIS  235", "HIS  236", "HIS  340"]);
        politicalScience = politicalScience.concat(["POL  213", "POL  234", "POL  235", "POL  236", "POL  340"]);
	var psychology = ["PSY  111", "PSY  204", "PSY  205", "PSY  206", "PSY  237"];
	var sociology = ["SOC  101", "SOC  152", "SOC  161", "SOC  166", "SOC  225H", "SOC  325H"];
	var mathematics = ["MAT  110", "MAT  114", "MAT  115", "MAT  116", "MAT  118", "MAT  129", "MAT  136", 
	                   "MAT  220", "MAT  221", "MAT  225"] //209, 210, and 320 for Education majors only
	var science = ["BIO  110", "BIO  112", "BIO  114", "BIO  120", "BIO  126", "BIO  150", "BIO  151", "BIO  280H",
	               "BIO  380H","CHE  103", "CHE  110", "CHE  112", "CHE  113", "CHE  132", "CHE  200", "ENV  101",
	               "ESC  115", "ESC  125", "ESC  127", "ESC  130", "GEO  200", "PHY  270"];
	var philosopy = ["PHI  100", "PHI  102", "PHI  110", "PHI  160", "PHI  201", "PHI  225H","PHI  231", 
	                 "COM  237", "PHI  237", "PHI  260", "PHI  268", "PHI  270", "PHI  275", "PHI  280",
	                 "PHI  281", "PHI  290", "PHI  301", "PHI  313", "PHI  315", "PHI  320", "MAT  322",
	                 "PHI  322", "MAT  324", "PHI  324", "PHI  325H","PHI  330", "PHI  340", "PHI  352",
	                 "PHI  355", "PHI  356", "PHI  357", "PHI  390"]; // Note: Math/COM courses both listed
    /*var cl_politicalScience_philosophy = ["PHI/POL 310"];
    philosophy = philosophy.concat(cl_politicalScience_philosophy);
    politicalScience = politicalScience.concat(cl_politicalScience_philosophy);*/
        philosophy = philosophy.concat(["PHI  310"]);
        politicalScience = politicalScience.concat(["POL  310"]);
	var theology = ["THE  100", "THE  101", "THE  104", "THE  220H","THE  221", "THE  225", "THE  230", "THE  241",
	                "THE  242", "THE  251", "THE  252", "THE  254", "THE  257", "THE  260", "THE  262", "THE  263",
	                "THE  265", "THE  273", "THE  281", "THE  285", "THE  300", "THE  320H","THE  325", "THE  330",
	                "THE  340", "THE  350", "THE  355", "THE  370", "THE  390"];
	/*var cl_philosopy_theology = ["PHI/THE 270"];
	philosophy = philosophy.concat(cl_philosopy_theology);
	theology = theology.concat(cl_philosopy_theology);*/
	    philosophy = philosophy.concat(["PHI  270"]);
	    theology = theology.concat(["THE  270"]);
	var ethics = ["ETH  250", "ETH  252", "ETH  254", "ETH  255", "ETH  257", "ETH  258", "ETH  279", "ETH  280H",
	              "ETH  288", "ETH  290", "ETH  318H","ETH  390", "ETH  505", "PHI  250", "PHI  252", "PHI  253",
	              "PHI  254", "PHI  255", "PHI  256", "PHI  257", "PHI  258", "PHI  380H","PHI  505", "THE  278",
	              "THE  279", "THE  288", "THE  505"]; //PHI/ETH/THE 505 for Dual Degree Nursing Students only
	var physicalEducation = ["PED  110", "PED  112", "PED  122", "PED  133", "PED  134", "PED  139", "PED  142",
	                         "PED  144", "PED  145", "PED  146", "PED  148", "PED  150", "PED  153", "PED  154",
	                         "PED  155", "PED  160", "PED  162", "PED  164", "PED  166", "PED  174", "PED  178",
	                         "PED  185", "PED  189", "PED  193", "PED  195", "PED  200", "PED  205", "PED  209",
	                         "PED  296"]; // some courses only 1/2 credit, need to check
	var core = ["COR  321", "COR  322", "COR  324", "COR  325", "COR  326", "COR  332", "COR  333", "COR  335",
	            "COR  336", "COR  337", "COR  338", "COR  341", "COR  342", "COR  343", "COR  344", "COR  345",
	            "COR  346", "COR  347", "COR  348", "COR  349", "COR  352", "COR  354", "COR  355", "COR  358",
	            "COR  361", "COR  362", "COR  363", "COR  365", "COR  366", "COR  371", "COR  380H","COR  390"];
	            // core is 4 credits

	var artsAndFineArtsCategory = {
		name: "Arts and Fine Arts",
		neededAreas: 2,
		totalCredits: 6,
		areas: [artHistory, musicHistory, communications]
	};
	var englishCategory = {
		name: "English",
		neededAreas: 1,
		totalCredits: 3,
		areas: [english]
	};
	var modernLanguageCategory = {
		name: "Modern Language",
		neededAreas: 1,
		totalCredits: 3,
		areas: [modernLanguages]
	};
	var englishModernLanguageLiteratureCategory = {
		name: "Modern Language/English Literature/Modern Language Literature",
		neededAreas: 1,
		totalCredits: 3,
		areas: [modernLanguages, englishLiterature, modernLanguageLiterature]
	};
	var socialAndBehavioralSciencesCategory = {
		name: "Social and Behavioral Sciences",
		neededAreas: 3,
		totalCredits: 9,
		areas: [history, politicalScience, psychology, sociology]
	};
	var mathCategory = {
		name: "Mathematics",
		neededAreas: 1,
		totalCredits: 3,
		areas: [mathematics]
	};
	var scienceCategory = {
		name: "Science",
		neededAreas: 1,
		totalCredits: 3,
		areas: [science]
	};
	var philosophyCategory = {
		name: "Philosophy",
		neededAreas: 1,
		totalCredits: 3,
		areas: [philosophy]
	};
	var theologyCategory = {
		name: "Theology",
		neededAreas: 1,
		totalCredits: 3,
		areas: [theology]
	};
	var ethicsCategory = {
		name: "Ethics",
		neededAreas: 1,
		totalCredits: 3,
		areas: [ethics]
	};
	var physicalEducationCategory = {
		name: "Physical Education",
		neededAreas: 1,
		totalCredits: 1,
		areas: [physicalEducation]
	};
	var coreCategory = {
		name: "CORE",
		neededAreas: 1,
		totalCredits: 4,
		areas: [core]
	};

	return [artsAndFineArtsCategory, englishCategory, modernLanguageCategory, 
	        englishModernLanguageLiteratureCategory, socialAndBehavioralSciencesCategory, 
	        mathCategory, scienceCategory, philosophyCategory, theologyCategory, ethicsCategory,
	        physicalEducationCategory, coreCategory];
}

/*
function getNeededGenEdRequirements()
{

}

function fulfillAllGenEd()
{

}
*/
