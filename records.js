"use strict";

// Future module for maintaining consistent data format
(function(exports) {

	exports.Course = function(areaCode, area, info) {
		this.areaCode = areaCode;
		this.area = area;
	};

	exports.Course.prototype.makeCourseCode = function(area, courseNum) {
		return area + "  " + courseNum;
	};

	function Record(course, grade) {
		this.course = course;
		this.grade = grade;
	}

	function Transcript() {
		this.records_ = [];
	}
})(provide("records"));