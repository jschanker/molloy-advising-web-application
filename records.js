"use strict";

// Module for maintaining consistent data format for courses
// and functions to manipulate them

(function(namespace) {

	namespace.exports.Course = function(areaCode, number, info) {
		this._areaCode = areaCode;
		this._number = number;
		this._info = info;
	};

	namespace.exports.Course.prototype.addInfo = function(info, overwriteConflicting) {
		for(property in info) {
			if(!(property in this._info) || overwriteConflicting) {
				this._info[property] = info[property];
			}
		}
	}

	namespace.exports.Course.prototype.makeCourseCode = function() {
		return this._areaCode + "  " + this._number;
	}

	/*namespace.exports.Course.prototype.makeCourseCode = function(area, courseNum) {
		return area + "  " + courseNum;
	};*/

	function Record(course, grade) {
		this.course = course;
		this.grade = grade;
	}

	function Transcript() {
		this.records_ = [];
	}
})(provide("records"));

/*
var rec = require("records");
var c = new rec.Course("ABC", "DEF", {});
console.log("C: " + c._area);
*/