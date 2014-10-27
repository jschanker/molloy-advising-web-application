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
		}
	}
	if(courseAreaCode == "CIS")
	{
		switch(codeNumber)
		{
			case 103:
				return {
					title: "Visual Basic OOP",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 235:
				return {
					title: "",
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
			case 103:
				return {
					title: "Visual Basic OOP",
					prerequisites:[],
					credits:3,
					offered:15
				};
			case 120:
				return {
					title: "",
					prerequisites:[],
					credits:3,
					offered:0
				};
			case 235:
				return {
					title: "",
					prerequisites:[],
					credits:3,
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
					title: "Basic Human Biology",
					prerequisites:[],
					credits:3,
					offered:10
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
					offered:10
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

	return {
		title:"Course Not Found",
		prerequisites:[],
		credits:3,
		offered:15
	};
}
