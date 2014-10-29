function getMajorRequirements(subjectCode)
{
	if(subjectCode.toLowerCase() == "bio")
		return getBIOMajorRequirements();

	if(subjectCode.toLowerCase() == "bus-mgmt")
		return getBUSMgmtMajorRequirements();

	else if(subjectCode.toLowerCase() == "mat")
		return getMATMajorRequirements();
	else if(subjectCode.toLowerCase() == "mat-ed-adult")
		return getMATAdEdMajorRequirements();

	else 
		return {
			major:"N/A",
			majorCodeNumbers:[],
			relatedCodes:[]
		};
}
