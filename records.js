"use strict";

// Module for maintaining consistent data format for courses
// and functions to manipulate them

(function(namespace) {

	namespace.exports.Course = function(areaCode, number, info) {
		this._areaCode = areaCode;
		this._number = number;
		this._info = info || {};
	};

	var Course = namespace.exports.Course;

	namespace.exports.Course.COURSE_DEFAULT = new Course("N/A", 900, {title: "Course Not Found", prerequisites:[], credits:3, offered:15});
	Object.freeze(namespace.exports.Course.COURSE_DEFAULT);
/*
	namespace.exports.Course.setLAS = function(isLAS) {
		this._isLAS = true;
	}
*/

	namespace.exports.Course.makeCourseFromCode = function(code) {
		var pair = code.split("  ");
		return pair.length == 2 ? new Course(pair[0], parseInt(pair[1])) : Course.COURSE_DEFAULT;
	}

	namespace.exports.Course.prototype.addInfo = function(info, overwriteConflicting) {
		for(var property in info) {
			if(!(property in this._info) || overwriteConflicting) {
				this._info[property] = info[property];
			}
		}
	}

	namespace.exports.Course.prototype.get = function(property) {
		return this._info[property];
	}


	namespace.exports.Course.prototype.isRepeatable = function() {
		return this._info.repeatable;
	}


	// CourseSelection prior to course list

	namespace.exports.CourseList = function(arrOfCourses) {
		// maintains list of courses and methods for modifying them
		this.arrList = arrOfCourses;
	}

	var CourseList = namespace.exports.CourseList;

	namespace.exports.CourseList.prototype.addCourse = function(c) {
		this.arrList.push(c);
	}

	namespace.exports.CourseList.prototype.isCourseItemInItemList = function(courseItem) {
		return this.arrList.some(function(courseItemFromList) {
			return courseItemFromList.hasSameCodeAs(courseItem);
		});
	}

	namespace.exports.CourseList.prototype.forEach = function(f) {
		this.arrList.forEach(f);
	}

	namespace.exports.CourseList.prototype.push = function(item) {
		this.arrList.push(item);
	}

	namespace.exports.CourseList.prototype.getCommonCourseList = function(courseList, criteriaFunction, duplicateFunction) {
		// returns new course list that represents common courses in both lists
		// that meet the given criteriaFunction, listing courses with equal 
		// codes more than once only if duplicateFunction is met

		var filteredCourseList = new CourseList([]);
		var that = this;

		courseList.forEach(function(courseItem) {
			
			// Patch to fix bug in which courseCredits = -1 because not actual course (e.g., Spring 2015)
			var isValidCourse = courseItem.get("credits") && (parseFloat(courseItem.get("credits")) >= 0);

			var isInCourseList = !courseList || that.isCourseItemInItemList(courseItem); // default: all courses in list
			var meetsCriteriaFunction = !criteriaFunction || criteriaFunction(courseItem); // default: all courses meet criteria
			// default: all repeatable courses allowed for double counting
			var isDoubleCounted = 
			  duplicateFunction ? duplicateFunction(courseItem) : courseItem.isRepeatable();

			if( isValidCourse && meetsCriteriaFunction && isInCourseList && 
			    (!filteredCourseList.isCourseItemInItemList(courseItem) || isDoubleCounted) ) {
			   		filteredCourseList.push(courseItem);
			}
		});

		return filteredCourseList;
	}

	namespace.exports.Requirement = function(courseList, numOfCourses, numOfCredits, minGrade) {
		// list of courses from which numOfCourses is needed and numOfCredits is needed
		this.courseList = courseList;
		this.numOfCourses = numOfCourses;
		this.numOfCredits = numOfCredits;
	}

	namespace.exports.Course.prototype.hasSameCodeAs = function(otherCourse) {
		return this._areaCode == otherCourse._areaCode && parseInt(this._number) == parseInt(otherCourse._number);
	}

/*
	namespace.exports.Course.prototype.hasCode = function(areaCode, number, course) {
		return course._areaCode == areaCode && parseInt(course._number) == number;
	}
*/

	namespace.exports.Course.prototype.makeCourseCode = function() {
		return this._areaCode + "  " + this._number;
	}

	/*namespace.exports.Course.prototype.makeCourseCode = function(area, courseNum) {
		return area + "  " + courseNum;
	};*/

	function Record(course, gradeInfo) {
		this._course = course;
		this._gradeInfo = gradeInfo;
	}

	function Transcript() {
		this.records_ = [];
	}

	//Unit tests
	//var A = new CourseList([new Course("ABC", "123", {credits:3.00}),new Course("DEF", "123", {credits:3.00}),new Course("GHI", "456", {credits:3.00}),new Course("GHI", "456", {credits:3.00})]);
	//var B = new CourseList([new Course("ABC", "123", {credits:3.00}),new Course("DAF", "123", {credits:3.00}),new Course("GHI", "456", {credits:3.00}),new Course("GHI", "456", {credits:3.00})]);
	//alert(A.getCommonCourseList(B, function(item) { return item.hasSameCodeAs(B.arrList[0]); }).arrList[0].makeCourseCode());

})(provide("records"));

/*
var rec = require("records");
var c = new rec.Course("ABC", "DEF", {});
console.log("C: " + c._area);
*/