function getCourseWithCode(courseAreaCode, codeNumber)
{
	// offered: 4-bit number: Fall even years, Spring odd years, Fall odd years, Spring even years
	//          1 means yes, 0 means no
	//          Example: 0101b = 5, every spring; 1000b = 8: only Fall in even years
	if(courseAreaCode == "BIO")
	{
		switch(codeNumber)
		{
			case 110:
				return {
					title: "Basic Human Biology",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 126:
				return {
					title: "General Biology I",
					prerequisites:[],
					credits:4,
					offered:10
				};
			case 127:
				return {
					title: "General Biology II",
					prerequisites:["BIO  126"],
					credits:4,
					offered:5
				};
			case 242:
				return {
					title: "Genetics",
					prerequisites:["BIO  126"],
					credits:4,
					offered:5
				}; // prereq or BIO 120
			case 245:
				return {
					title: "Microbiology",
					prerequisites:["BIO  127"],
					credits:4,
					offered:15
				};
			case 257:
				return {
					title: "Scientific Research Techniques",
					prerequisites:[],
					credits:2,
					offered:10
				};
			case 465:
				return {
					title: "Field Experience In Biology I",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 497:
				return {
					title: "Biology Seminar",
					prerequisites:[],
					credits:2,
					offered:5
				};
		}
	}
	if(courseAreaCode == "BUS")
	{
		switch(codeNumber)
		{
			case 101:
				return {
					title: "Introduction to Business",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 240:
				return {
					title: "Business Law I",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 260:
				return {
					title: "Accounting I",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 261:
				return {
					title: "Accounting II",
					prerequisites:["BUS  260"],
					credits:3,
					offered:15
				};
			case 301:
				return {
					title: "Principles of Management",
					prerequisites:["BUS  101"],
					credits:3,
					offered:15
				};
			case 303:
				return {
					title: "Human Resources Management",
					prerequisites:["BUS  301"],
					credits:3,
					offered:15
				};
			case 304:
				return {
					title: "Organizational Behavior",
					prerequisites:["BUS  301"],
					credits:3,
					offered:15
				};
			case 307:
				return {
					title: "Sustainable Business",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 330:
				return {
					title: "Principles of Marketing",
					prerequisites:["BUS  101"],
					credits:3,
					offered:15
				};
			case 334:
				return {
					title: "International Business",
					prerequisites:["BUS  101", "ECO  251"],
					credits:3,
					offered:15
				}; // or ECO 252 prereq to pair with 251
			case 343:
				return {
					title: "Quantitative Analysis for Business Applications",
					prerequisites:["CIS  105", "MAT  129"],
					credits:3,
					offered:15
				};
			case 350:
				return {
					title: "Corporate Finance",
					prerequisites:["BUS  343"],
					credits:3,
					offered:15
				};
			case 389:
				return {
					title: "Fundamental Analysis and Company Valuation",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 460:
				return {
					title: "Business Internship",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 460:
				return {
					title: "Business Internship",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 484:
				return {
					title: "Strategic Management",
					prerequisites:["BUS  101", "BUS  301", "BUS  330", "BUS  350"],
					credits:3,
					offered:15
				};
			case 490:
				return {
					title: "Management And Finance Capstone",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 900:
				return {
					title: "Elective - may already have",
					prerequisites:[],
					credits:3,
					offered:15
				};
		}
	}
	if(courseAreaCode == "CHE")
	{
		switch(codeNumber)
		{
			case 132:
				return {
					title: "Inorganic Chemistry I",
					prerequisites:[],
					credits:4,
					offered:10
				};
			case 133:
				return {
					title: "Inorganic Chemistry II",
					prerequisites:["CHE  132"],
					credits:5,
					offered:5
				};
		}
	}
	if(courseAreaCode == "CIS")
	{
		switch(codeNumber)
		{
			case 100:
				return {
					title: "Computer System Introduction",
					prerequisites:[],
					credits:3,
					offered:8
				};
			case 102:
				return {
					title: "Computer Applications and CIS",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 103:
				return {
					title: "Visual Basic OOP",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 105:
				return {
					title: "Computer Applications for Business",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 112:
				return {
					title: "Introduction to Web Design and Development",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 224:
				return {
					title: "Introduction to Database Management",
					prerequisites:[],
					credits:3,
					offered:2
				};
			case 235:
				return {
					title: "Introduction to Web Scripting",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 255:
				return {
					title: "Computer Ethics and Security",
					prerequisites:[],
					credits:3,
					offered:0
				};
			case 318:
				return {
					title: "Analysis and Logical Design of an Information System",
					prerequisites:[],
					credits:3,
					offered:4
				};
			case 335:
				return {
					title: "Programming Languages",
					prerequisites:[],
					credits:3,
					offered:2
				};
			case 339:
				return {
					title: "Networks I - Local Area Networks",
					prerequisites:[],
					credits:3,
					offered:4
				};
			case 360:
				return {
					title: "Computer Information Systems In Business",
					prerequisites:[],
					credits:3,
					offered:4
				};
			case 390:
				return {
					title: "CIS/CSC elective",
					prerequisites:[],
					credits:3,
					offered:4
				};
			case 460:
				return {
					title: "Internship",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 491:
				return {
					title: "CIS Capstone Seminar",
					prerequisites:[],
					credits:3,
					offered:2
				};
		}
	}

	if(courseAreaCode == "COM")
	{
		switch(codeNumber)
		{
			case 110:
				return {
					title: "Experiences in Communication",
					prerequisites: [],
					credits:3,
					offered:15
				};
			case 114:
				return {
					title: "Small Group Discussion",
					prerequisites: [],
					credits:3,
					offered:15
				};
			case 211:
				return {
					title: "Gender and Communication",
					prerequisites: [],
					credits:3,
					offered:15
				};
			case 213:
				return {
					title: "Intercultural Communication",
					prerequisites: [],
					credits:3,
					offered:15
				};
			case 222:
				return {
					title: "Media, Culture, and Society",
					prerequisites: [],
					credits:3,
					offered:15
				};
			case 228:
				return {
					title: "Writing for the Web",
					prerequisites: [],
					credits:3,
					offered:10
				};
			case 229:
				return {
					title: "Experiences in Corporate Communications",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 239:
				return {
					title: "Public Speaking for Business",
					prerequisites:[],
					credits:1,
					offered:15
				};
			case 240:
				return {
					title: "Audiences and the Music Industry",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 242:
				return {
					title: "Television Production for Non-majors",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 243:
				return {
					title: "Introduction to New Media",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 244:
				return {
					title: "Online Content Production",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 246:
				return {
					title: "Civic Engagement with New Media",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 247:
				return {
					title: "Sports Communication",
					prerequisites:[],
					credits:1,
					offered:15
				};
			case 248:
				return {
					title: "Online Journalism",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 252:
				return {
					title: "Television Studio Production",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 254:
				return {
					title: "Public Relations",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 255:
				return {
					title: "Public Relations Writing",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 256:
				return {
					title: "Field Production",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 259:
				return {
					title: "Introduction to Advertising",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 309:
				return {
					title: "History of Digital Media",
					prerequisites:["COM  243"],
					credits:3,
					offered:10
				};
			case 310:
				return {
					title: "Video Storytelling for the Web",
					prerequisites:["COM  244"],
					credits:3,
					offered:5
				};
			case 354:
				return {
					title: "Foundations of Media Theory",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 381:
				return {
					title: "Digital Applications for New Media",
					prerequisites:["COM  244"],
					credits:3,
					offered:4
				};
			case 468:
				return {
					title: "Communications Internship",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 488:
				return {
					title: "Research in Communications",
					prerequisites:["COM  354"],
					credits:3,
					offered:10
				};
			case 490:
				return {
					title: "Communications Seminar",
					prerequisites:["COM  488"],
					credits:3,
					offered:5
				};
			case 900:
				return {
					title: "Communications 200-level elective or above",
					prerequisites:[],
					credits:3,
					offered:15
				};
		}
	}
	if(courseAreaCode == "CSC")
	{
		switch(codeNumber)
		{
			case 102:
				return {
					title: "Computer Applications and CIS",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 103:
				return {
					title: "Visual Basic OOP",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 105:
				return {
					title: "Computer Applications for Business",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 112:
				return {
					title: "Introduction to Web Design and Development",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 120:
				return {
					title: "Programming I",
					prerequisites:[],
					credits:3,
					offered:0
				};
			case 121:
				return {
					title: "Programming II",
					prerequisites:["CSC  120"],
					credits:3,
					offered:0
				};
			case 217:
				return {
					title: "Computer Forensics",
					prerequisites:[],
					credits:3,
					offered:2
				};
			case 224:
				return {
					title: "Introduction to Database Management",
					prerequisites:[],
					credits:3,
					offered:2
				};
			case 229:
				return {
					title: "Discrete Mathematical Structures",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 235:
				return {
					title: "Introduction to Web Scripting",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 244:
				return {
					title: "Data Structures",
					prerequisites:["CSC  121"],
					credits:4,
					offered:2
				};
			case 318:
				return {
					title: "Analysis and Logical Design of an Information System",
					prerequisites:[],
					credits:3,
					offered:4
				};
			case 323:
				return {
					title: "Assembly Language and Systems Programming",
					prerequisites:["CSC  121", "MAT  229", "MAT  228"],
					credits:3,
					offered:2
				};
			case 330:
				return {
					title: "Operating Systems",
					prerequisites:["CSC  121"],
					credits:3,
					offered:1
				};
			case 335:
				return {
					title: "Programming Languages",
					prerequisites:["CSC  120"],
					credits:3,
					offered:2
				};
			case 337:
				return {
					title: "Web/Mobile Game Development",
					prerequisites:["CSC  120", "CSC  335"],
					credits:3,
					offered:1
				};
			case 340:
				return {
					title: "Computer Architecture and Design",
					prerequisites:["CSC  323"],
					credits:3,
					offered:1
				};
			case 352:
				return {
					title: "Back-End Web/Mobile App Development",
					prerequisites:["CSC  120", "CSC  335"],
					credits:3,
					offered:8
				};
			case 390:
				return {
					title: "CIS/CSC elective",
					prerequisites:[],
					credits:3,
					offered:4
				};
			case 460:
				return {
					title: "Internship",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 491:
				return {
					title: "CSC Capstone Seminar",
					prerequisites:[],
					credits:3,
					offered:1
				};
		}
	}

	if(courseAreaCode == "ECO")
	{
		switch(codeNumber)
		{
			case 251:
				return {
					title: "Macroeconomics",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 252:
				return {
					title: "Microeconomics",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 315:
				return {
					title: "Money, Banking, and Financial Markets",
					prerequisites:["ECO  251", "BUS  343"],
					credits:3,
					offered:15
				}; // ECO 252 instead of ECO 251 also
			case 320:
				return {
					title: "International Economics",
					prerequisites:["ECO  315"],
					credits:3,
					offered:15
				}; // ECO 252 instead of ECO 251 also
		}
	}
	if(courseAreaCode == "ENG")
	{
		switch(codeNumber)
		{
			case 110:
				return {
					title: "College Composition",
					prerequisites:[],
					credits:1,
					offered:15
				};
			case 236:
				return {
					title: "Effective Business Writing",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 238:
				return {
					title: "Techniques of Business Writing",
					prerequisites:["ENG  110"],
					credits:1,
					offered:15
				};
		}
	}
	if(courseAreaCode == "ESC")
	{
		switch(codeNumber)
		{
			case 115:
				return {
					title: "Astronomy",
					prerequisites:[],
					credits:3,
					offered:10
				};
		}
	}
	if(courseAreaCode == "ETH")
	{
		switch(codeNumber)
		{
			case 257:
				return {
					title: "Business Ethics",
					prerequisites:[],
					credits:3,
					offered:15
				};
		}
	}
	if(courseAreaCode == "MAT")
	{
		switch(codeNumber)
		{
			case 110:
				return {
					title: "Basic College Mathematics",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 115:
				return {
					title: "Elementary Statistics",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 116:
				return {
					title: "College Algebra and Trigonometry",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 118:
				return {
					title: "Precalculus",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 129:
				return {
					title: "Elementary Statistics for Business",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 221:
				return {
					title: "Calculus I",
					prerequisites:[],
					credits:4,
					offered:10
				};
			case 222:
				return {
					title: "Calculus II",
					prerequisites:["MAT  221"],
					credits:4,
					offered:5
				};
			case 223:
				return {
					title: "Calculus III",
					prerequisites:["MAT  222"],
					credits:4,
					offered:10
				};
			case 225:
				return {
					title: "Statistics for the Natural Sciences",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 228:
				return {
					title: "Topics in Discrete Mathematics for Computer Science Majors",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 229:
				return {
					title: "Discrete Mathematical Structures",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 232:
				return {
					title: "Introduction to Linear Algebra",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 251:
				return {
					title: "Modern Geometry",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 324:
				return {
					title: "History and Philosophy of Mathematics",
					prerequisites:[],
					credits:3,
					offered:5
				};
			case 330:
				return {
					title: "Modern Algebra - Ring Theory",
					prerequisites:["MAT  229"],
					credits:3,
					offered:10
				};
			case 331:
				return {
					title: "Theory of Numbers",
					prerequisites:["MAT  330"],
					credits:3,
					offered:0
				};
			case 335:
				return {
					title: "Modern Algebra - Group Theory",
					prerequisites:["MAT  229"],
					credits:3,
					offered:0
				};
			case 336:
				return {
					title: "Introduction to Operations Research",
					prerequisites:["MAT  232"],
					credits:3,
					offered:0
				};
			case 342:
				return {
					title: "Differential Equations",
					prerequisites:["MAT  222"],
					credits:3,
					offered:0
				};
			case 345:
				return {
					title: "Introduction to Real Analysis",
					prerequisites:["MAT  223"],
					credits:3,
					offered:5
				};
			case 347:
				return {
					title: "Complex Variables",
					prerequisites:["MAT  223"],
					credits:3,
					offered:0
				};
			case 356:
				return {
					title: "General Topology",
					prerequisites:["MAT  223", "MAT  232"],
					credits:3,
					offered:0
				};
			case 361:
				return {
					title: "Probability and Mathematical Statistics",
					prerequisites:["MAT  222"],
					credits:3,
					offered:0
				};
			case 390:
				return {
					title: "Topics in Mathematics",
					prerequisites:["MAT  222"],
					credits:3,
					offered:15
				};
			case 460:
				return {
					title: "Internship in Mathematics",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 491:
				return {
					title: "Mathematics Senior Seminar",
					prerequisites:[],
					credits:3,
					offered:5
				};
		}
	}
	if(courseAreaCode == "PED")
	{
		switch(codeNumber)
		{
			case 125:
				return {
					title: "Programming Fitness Activities",
					prerequisites:[],
					credits:1,
					offered:15
				};
		}
	}
	if(courseAreaCode == "PHY")
	{
		switch(codeNumber)
		{
			case 270:
				return {
					title: "General Physics I",
					prerequisites:["MAT  221"],
					credits:4,
					offered:10
				};
			case 271:
				return {
					title: "General Physics II",
					prerequisites:["PHY  270", "MAT  221"],
					credits:4,
					offered:10
				};
		}
	}
	if(courseAreaCode == "PSY")
	{
		switch(codeNumber)
		{
			case 111:
				return {
					title: "General Psychology",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 206:
				return {
					title: "Adolescent Psychology, Pre-Adolescence Through Adolescence",
					prerequisites:[],
					credits:3,
					offered:15
				}; // PSY 111 prerequisite but not used
			case 326:
				return {
					title: "Abnormal Psychology",
					prerequisites:["PSY  111"],
					credits:3,
					offered:5
				}; // PSY 204 or 205 prereq possible as well, chairperson approval also possible
		}
	}

	if(courseAreaCode == "SOC")
	{
		switch(codeNumber)
		{
			case 101:
				return {
					title: "Introductory Sociology",
					prerequisites:[],
					credits:3,
					offered:15
				};
		}
	}

	if(courseAreaCode == "SPA")
	{
		switch(codeNumber)
		{
			case 101:
				return {
					title: "Beginning Spanish I",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 102:
				return {
					title: "Beginning Spanish II",
					prerequisites:[],
					credits:3,
					offered:15
				};
		}
	}

	if(courseAreaCode == "SWK")
	{
		switch(codeNumber)
		{
			case 240:
				return {
					title: "Introduction to the Profession of Social Work",
					prerequisites:[],
					credits:1,
					offered:15
				};
			case 241:
				return {
					title: "Issues in Social Welfare I: History and Ideology",
					prerequisites:["SOC  101"],
					credits:3,
					offered:10
				}; // or consent of Chairperson

			case 250:
				return {
					title: "Diversity: Oppression, Privilege and Social Justice",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 325:
				return {
					title: "Social Work and Children with Special Needs",
					prerequisites:[],
					credits:1,
					offered:15
				};
			case 327:
				return {
					title: "Information Technology in Social Work",
					prerequisites:[],
					credits:1,
					offered:15
				};
			case 342:
				return {
					title: "Issues in Social Welfare II: Analysis and Advocacy for Social Policy",
					prerequisites:["SWK  241"],
					credits:3,
					offered:5
				};
			case 343:
				return {
					title: "Human Behavior In the Social Environment I",
					prerequisites:[],
					credits:3,
					offered:10
				};
			case 344:
				return {
					title: "Human Behavior In the Social Environment II",
					prerequisites:["SWK  343"],
					credits:3,
					offered:5
				};
			case 347:
				return {
					title: "Spirtuality and Professional Practice In the Helping Professions",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 348:
				return {
					title: "Working with Victims of Rape, Incest and Sexual Assault",
					prerequisites:[],
					credits:1,
					offered:5
				};
			case 350:
				return {
					title: "Professional Encounter: WHen the Person Meets the Profession",
					prerequisites:[],
					credits:4,
					offered:15
				};	
			case 351:
				return {
					title: "Generalist Social Work Practice I",
					prerequisites:["SWK  343"],
					credits:3,
					offered:5
				};  // Corequisite: SWK 344
			case 352:
				return {
					title: "HIV and AIDS",
					prerequisites:[],
					credits:1,
					offered:15
				};
			case 353:
				return {
					title: "Substance Abuse",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 360:
				return {
					title: "Social Work Practice In Research",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 452:
				return {
					title: "Generalist Social Work Practice II",
					prerequisites:["SWK  351"],
					credits:3,
					offered:10
				}; // concurrent field practice
			case 453:
				return {
					title: "Generalist Social Work Practice III",
					prerequisites:["SWK  452"],
					credits:3,
					offered:5
				}; // concurrent field practice
			case 460:
				return {
					title: "Field Instruction in Social Work I",
					prerequisites:["SWK  351"],
					credits:6,
					offered:15
				}; // corequisite SWK 452, SWK 464 and SWK 465
			case 461:
				return {
					title: "Field Instruction in Social Work II",
					prerequisites:["SWK  460"],
					credits:6,
					offered:5
				}; // corequisite SWK 453, SWK 465
			case 464:
				return {
					title: "Capstone Course I",
					prerequisites:["MAT  115", "SWK  360"],
					credits:2,
					offered:15
				}; // corequisites: SWK 452 and SWK 460
			case 465:
				return {
					title: "Capstone Course II",
					prerequisites:[],
					credits:2,
					offered:15
				}; // corequisites: SWK 453 and SWK 461
			case 900:
				return {
					title: "SWK Elective: 325, 327, 347, 348, 350, 352, or 353",
					prerequisites:[],
					credits:3,
					offered:15
				};
		}
	}

	return {
		title:"Course Not Found",
		prerequisites:[],
		credits:3,
		offered:15
	};
}
