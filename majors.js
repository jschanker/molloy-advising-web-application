function getMajorRequirements(subjectCode)
{
	if(subjectCode.toLowerCase() == "mat")
		return getMATMajorRequirements();

	else 
		return {
			major:"N/A",
			majorCodeNumbers:[],
			relatedCodes:[]
		};
}
