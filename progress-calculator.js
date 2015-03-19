"use strict";

// Class to calculate requirements and warnings

(function(namespace) {

	var db = require("connection");
	var records = require("records");
	var dbnames = require("dbnames");
	var database = new db.Connection(dbnames.ALL_COURSES_DB_NAME);

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

		var courseItems = database.find(dbnames.ALL_COURSES_COLLECTION_NAME, course.hasSameCodeAs.bind(course));
		
		if(courseItems.length == 0)
			return startSemesterOffset; // course not found

		var courseItem = courseItems[0];
		var courseCode = courseItem.makeCourseCode();
		var maxNumOfSemesters = startSemesterOffset;
		var fourBitString;

		if(maxDepth <= 0)
			return startSemesterOffset; // prevent circular list of requirements leading to infinite recursion

		if(takenCourseCodes.indexOf(courseCode) != -1)
			return startSemesterOffset;

		//courseItem._info.prerequisites.forEach(function(prerequisiteCourseCode) {
			//var prerequisiteCourseAreaCode = prerequisiteCourseCode.substring(0, prerequisiteCourseCode.indexOf(" "));
			//var prerequisiteCourseNumber = parseInt(prerequisiteCourseCode.substring(prerequisiteCourseCode.indexOf("  ")+2));
			//var neededSemesters = namespace.exports.getCourseDepth(new records.Course(prerequisiteCourseAreaCode, prerequisiteCourseNumber), 
			//                                 	startSemesterOffset, takenCourseCodes, maxDepth-1);

		if(courseItem._info.prerequisites) {
			courseItem._info.prerequisites.forEach(function(prerequisite) {
				var neededSemesters = namespace.exports.getCourseDepth(prerequisite, 
			                                 	startSemesterOffset, takenCourseCodes, maxDepth-1);	
				if(neededSemesters > maxNumOfSemesters)
				{
					maxNumOfSemesters = neededSemesters;
				}
			});
		}

		if((parseInt(courseItem._info.offered) & 15) == 0) {
			return 100+maxNumOfSemesters; // course is never offered or invalid offered 4-bit string
		}

		fourBitString = 1 << (3 - (maxNumOfSemesters % 4));

		while((parseInt(courseItem._info.offered) & fourBitString) == 0) {
			// circular shift
			if(fourBitString == 1) {
				fourBitString = 8;
			} else {
				fourBitString = fourBitString >> 1;
			}

			maxNumOfSemesters++;
		}

		return maxNumOfSemesters+1;
	}

})(provide("progress-calculator"));