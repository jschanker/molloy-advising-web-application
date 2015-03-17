"use strict";

// Class to calculate requirements

(function(namespace) {

	namespace.exports.getCourseDepth = function(course, startSemesterOffset, takenCourseCodes, maxDepth)
	{
		// Returns the beginning of the semester number starting from Fall 2014 for which you'll be able to take
		// a course requiring code courseAreaCode courseNumber if you start the required sequence startSemesterOffset 
		// semesters after Fall 2014 and have courses takenCourseCodes due to prerequisites and scheduled 
		// course offering times:
		//
		// For example, if course A only runs in the Spring and requires course B which only runs in the fall 
		// which requires course C which only runs in the spring and takenCourseCodes does not include courses A, B, or C,
		// getCourseDepth will return 4 for A with a startSemesterOffset of 1, but returns 6 with a startSemesterOffset
		// of 2 or 3 since you need to wait until Spring of 2016 to take course C if you don't take it in Spring
		// 2015.

		var courseItem = getCourseWithCode(courseAreaCode, courseNumber);
	//alert(courseItem.prerequisites);
	var courseCode = makeCourseCode(courseAreaCode, courseNumber);
	var maxNumOfSemesters = startSemesterOffset;
	var fourBitString;

	if(maxDepth <= 0)
		return startSemesterOffset; // prevent circular list of requirements leading to infinite recursion

	if(takenCourseCodes.indexOf(courseCode) != -1)
		return startSemesterOffset;

	courseItem.prerequisites.forEach(function(prerequisiteCourseCode) {
		var prerequisiteCourseAreaCode = prerequisiteCourseCode.substring(0, prerequisiteCourseCode.indexOf(" "));
		var prerequisiteCourseNumber = parseInt(prerequisiteCourseCode.substring(prerequisiteCourseCode.indexOf("  ")+2));
		var neededSemesters = getCourseDepth(prerequisiteCourseAreaCode, prerequisiteCourseNumber, 
			                                 startSemesterOffset, takenCourseCodes, maxDepth-1);
		if(neededSemesters > maxNumOfSemesters)
		{
			maxNumOfSemesters = neededSemesters;
		}
	});

	if((parseInt(courseItem.offered) & 15) == 0)
	{
		//alert(parseInt(courseItem.offered) & 15);
		return 100+maxNumOfSemesters; // course is never offered or invalid offered 4-bit string
	}

	//maxNumOfSemesters++;
	fourBitString = 1 << (3 - (maxNumOfSemesters % 4));

	while((parseInt(courseItem.offered) & fourBitString) == 0)
	{
		// circular shift
		if(fourBitString == 1)
		{
			//alert("8 == 0");
			fourBitString = 8;
		}
		else
			fourBitString = fourBitString >> 1;

		maxNumOfSemesters++;
	}

	return maxNumOfSemesters+1;

	//getCourseItems(courseHistoryItems, [courseCode], criteriaFunction)
}

})(provide("progress-calculator"));