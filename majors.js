function getMajorRequirements(subjectCode)
{
	if(subjectCode.toLowerCase() == "bio")
		return getBIOMajorRequirements();

	else if(subjectCode.toLowerCase() == "bus-mgmt")
		return getBUSMgmtMajorRequirements();

	else if(subjectCode.toLowerCase() == "cis")
		return getCISMajorRequirements();

	else if(subjectCode.toLowerCase() == "com-nm")
		return getCOMNMMajorRequirements();

	else if(subjectCode.toLowerCase() == "csc")
		return getCSCMajorRequirements();

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
