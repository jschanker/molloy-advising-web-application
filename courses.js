function getCourseWithCode(courseAreaCode, codeNumber)
{
	// offered: 4-bit number: Fall even years, Spring odd years, Fall odd years, Spring even years
	//          1 means yes, 0 means no
	//          Example: 0101b = 5, every spring; 1000b = 8: only Fall in even years
	if(courseAreaCode == "MAT")
	{
		switch(codeNumber)
		{
			case 110:
				return {
					prerequisites:[],
					offered:15
				};
			case 115:
				return {
					prerequisites:[],
					offered:15
				};
			case 116:
				return {
					prerequisites:[],
					offered:5
				};
			case 118:
				return {
					prerequisites:[],
					offered:5
				};
			case 221:
				return {
					prerequisites:[],
					offered:10
				};
			case 222:
				return {
					prerequisites:["MAT  221"],
					offered:5
				};
			case 223:
				return {
					prerequisites:["MAT  222"],
					offered:10
				};
			case 228:
				return {
					prerequisites:[],
					offered:0
				};
			case 229:
				return {
					prerequisites:[],
					offered:10
				};
		}
	}
}
