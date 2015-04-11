"use strict";

// Registrar: responsible for data entry: Entering student grades, course, and major/minor information into database
// DBNames: Maintains database and collection names
// IMPORTANT: Since the Registrar maintains the array of courses it stores in the database, 
// changes it makes are automatically made to database courses as well
// 
// TODO: Create a more specific courseConnect class that inherits from the Connect class,
//       that handles conflicting course information (e.g., one COM 390 class that's 1 credit 
//       and another one that's 3 credits, perhaps sorting by semester and section).

(function(namespace) {
	var LAS_COURSE_DB_NAME = "courses";
	var LAS_COURSE_COLLECTION_NAME = "las";
	var COURSE_HISTORY_DB_NAME = "courses";
	var COURSE_HISTORY_COLLECTION_NAME = "history";
	var ALL_COURSES_DB_NAME = LAS_COURSE_DB_NAME;
	var ALL_COURSES_COLLECTION_NAME = LAS_COURSE_COLLECTION_NAME;

})(provide("dbnames"));

(function(namespace) {

	var db = require("connection");
	var dbnames = require("dbnames");
	var records = require("records");
	var las = require("las");
	var allCourses = require("major-course-data");
	var nextSemesterCourses = require("next-semester-courses");

	var getLASCourses = function() {
		var LASCourseLines = las.split("\n");
		var LASCourses = LASCourseLines.map(function(line) {
			var courseTriple = line.split(",");
			var courseCodeDouble = courseTriple[0].split("  ");
			var parentCode = courseTriple[2].indexOf("*") == -1 ? courseTriple[2] : courseTriple[2].substring(1); // remove *
			return new records.Course(courseCodeDouble[0], courseCodeDouble[1],
				{title:courseTriple[1], parentCode:parentCode, isLAS:true});
		});

		return LASCourses;

	};

/**/
	var getAllCourses = function() {
		// hack: fix course-data
		// THIS FUNCTION WILL NOT BE NEEDED IN THE FUTURE: It returns course list of every possible course
		var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var database = new db.Connection(dbnames.ALL_COURSES_DB_NAME);
		var courseList = [];

		for(var firstLetterIndex = 0; firstLetterIndex < ALPHABET.length; firstLetterIndex++) {
			for (var secondLetterIndex = 0; secondLetterIndex < ALPHABET.length; secondLetterIndex++) {
				for (var thirdLetterIndex = 0; thirdLetterIndex < ALPHABET.length; thirdLetterIndex++) {
					for(var number = 0; number < 1000; number++) {
						var courseAreaCode = ALPHABET[firstLetterIndex] + ALPHABET[secondLetterIndex] + 
						   ALPHABET[thirdLetterIndex];
						var courseInfo = allCourses.getCourseWithCode(courseAreaCode, number);
						var courseItem = new records.Course(courseAreaCode, number, courseInfo);
						if(courseInfo != allCourses.NA_COURSE) {
							courseList.push(new records.Course(courseAreaCode, number, courseInfo));
						} 
/**/
/**/
						if(courseInfo != allCourses.NA_COURSE) {
							var commonCourses = database.find(dbnames.ALL_COURSES_COLLECTION_NAME, courseItem.hasSameCodeAs.bind(courseItem));
							//console.log("A: " + courseItem.hasSameCodeAs.bind(courseItem)(new records.Course("CIS", 103)));
							//console.log("C: " + commonCourses.length);
							if(commonCourses.length > 0) {
								//console.log(commonCourses[0].makeCourseCode());
								commonCourses[0].addInfo(courseInfo, true);
							} else {
								courseItem.addInfo({isLAS: false}, false);
								database.insert(dbnames.ALL_COURSES_COLLECTION_NAME, courseItem);
							}
						}
/**/
/**/
					}
				}
			}
		}

		return courseList;
	}
/**/

	function getMatch(arr, regex)
	{
		// returns first element in array matching the regular expression regex
		for(var i = 0; i < arr.length; i++)
		{
			if(arr[i].match(regex))
				return arr[i];
		}

		return -1;
	}

	function getCommonElement(arr1, arr2)
	{
		// returns common element in arr1 and arr2 if one exists; otherwise returns empty string
		for(var i = 0; i < arr1.length; i++)
		{
			if(arr2.indexOf(arr1[i]) != -1)
				return arr1[i];
		}

		return "";
	}

	var parseCourseHistory = function(courseHistory)
	{
		// returns a record of Courses from courseHistory string
		var lines = courseHistory.split("\n");
		var transcript = [];
		var grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F", "P", "W", "WA", "WF", "WIP", "Transfer"];

		lines.forEach(function(line) {
			var courseCodeAndInfo = line.replace(/\s+/g, ' ').split(' ');
			var course = new Course(courseCodeAndInfo[0], courseCodeAndInfo[1], 
									{credits: getMatch(courseInfo, /[0-9][.][0-9][0-9]/)});
			var record = new Record(course, {grade: getCommonElement(courseCodeAndInfo, grades), 
				             countsForCredit: courseInfo.indexOf("Credit") != -1 || courseInfo.indexOf("Transfer") != -1});
			transcript.push(courseItem);
		});

		return transcript;
	};

//	var enterCoursesDataFromJSON = function(courseData) {

//	}

	namespace.exports.enterGradeHistory = function(courseHistory) {
		var transcript = parseCourseHistory(courseHistory);
		var database = new db.Connection(dbnames.COURSE_HISTORY_DB_NAME);
		database.removeCollection(dbnames.COURSE_HISTORY_COLLECTION_NAME); // remove old course history
		database.insert(dbnames.COURSE_HISTORY_COLLECTION_NAME, transcript);
	};

	//function updateData(courseItems, database, collection, overwrite) {

	//}

	namespace.exports.enterData = function() {
		//console.log(JSON.stringify(getAllCourses()));
		var LASCourses = getLASCourses();
		//console.log(allCourses);
		var coursesFromCourseData = JSON.parse(allCourses);
		//console.log("Here: " + coursesFromCourseData[0]._info);
		var futureCourses = JSON.parse(nextSemesterCourses);

		var database = new db.Connection(dbnames.LAS_COURSE_DB_NAME);
		database.insert(dbnames.LAS_COURSE_COLLECTION_NAME, LASCourses);

		coursesFromCourseData.forEach(function(courseObj) {
			if(courseObj._info.prerequisites) {
				courseObj._info.prerequisites = courseObj._info.prerequisites.map(function(prerequisiteCourseCode) {
					var commonCourse = database.findOne(dbnames.ALL_COURSES_COLLECTION_NAME, function(courseItem) {
						return courseItem.makeCourseCode() == prerequisiteCourseCode;
					});
					//return commonCourse ? commonCourse : new records.Course(prerequisiteCourseCode.split("  ")[0], prerequisiteCourseCode.split("  ")[1], {prerequisites:[], offered:15});
					return commonCourse ? commonCourse : records.Course.COURSE_DEFAULT;
				});
			}

			var courseItem = new records.Course(courseObj._areaCode, courseObj._number, courseObj._info);
			var commonCourse = database.findOne(dbnames.ALL_COURSES_COLLECTION_NAME, courseItem.hasSameCodeAs.bind(courseItem));
			//if(commonCourses.length > 0) {
			if(commonCourse) {
				//commonCourses[0].addInfo(courseObj._info, true);
				commonCourse.addInfo(courseObj._info, true);
			} else {
				courseItem.addInfo({isLAS: false}, false);
				database.insert(dbnames.ALL_COURSES_COLLECTION_NAME, courseItem);
			}
		});

		futureCourses.forEach(function(courseObj) { // Next semester's offerings: TODO: This information should be separate (bad database design)
			var courseItem = new records.Course(courseObj.area, courseObj.number, courseObj);
			var commonCourse = database.findOne(dbnames.ALL_COURSES_COLLECTION_NAME, courseItem.hasSameCodeAs.bind(courseItem));
			if(commonCourse) {
				commonCourse.addInfo(courseObj, false);
			} else {
				courseItem.addInfo({isLAS: false}, false);
				database.insert(dbnames.ALL_COURSES_COLLECTION_NAME, courseItem);
			}
		});

		//var database = new db.Connection(dbnames.LAS_COURSE_DB_NAME);
		//database.insert(dbnames.LAS_COURSE_COLLECTION_NAME, LASCourses);

		//database.logCollection("las");
		//LASCourses[115]._info.title = "Changed";
		//console.log(LASCourses[115]._areaCode);
		//console.log(JSON.stringify(getAllCourses()));

		console.log(database.find(dbnames.LAS_COURSE_COLLECTION_NAME, function(course) {return course._areaCode == "MAT"},
			function(field) { return field == "_areaCode" || field == "_number" || field == "_info"}));

		console.log(database.findOne(dbnames.LAS_COURSE_COLLECTION_NAME, function(course) {return course._areaCode == "MAT" && course._number == "460"},
			function(field) { return field == "_areaCode" || field == "_number" || field == "_info"}));
	};

/*
	namespace.exports.getLASDatabaseName = function() {
		return "courses";
	}

	namespace.exports.getLASCollectionName = function() {
		return "las";
	}
*/

})(provide("registrar"));

var reg = require("registrar");
reg.enterData();