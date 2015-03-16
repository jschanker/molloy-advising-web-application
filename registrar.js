"use strict";

// responsible for entering student grades, course, and major/minor information into database
// and maintaining database handles
// IMPORTANT: Since the Registrar maintains the array of courses it stores in the database, 
// changes it makes are automatically made to database courses as well

(function(namespace) {

	var db = require("connection");
	var records = require("records");
	var las = require("las");

	var getLASCourses = function() {
		var LASCourseLines = las.split("\n");
		var LASCourses = LASCourseLines.map(function(line) {
			var courseTriple = line.split(",");
			var courseCodeDouble = courseTriple[0].split("  ");
			var parentCode = courseTriple[2].indexOf("*") == -1 ? courseTriple[2] : courseTriple[2].substring(1); // remove *
			return new records.Course(courseCodeDouble[0], courseCodeDouble[1],
				{title:courseTriple[1], parentCode:parentCode});
		});

		return LASCourses;

	};

	namespace.exports.enterData = function() {
		var LASCourses = getLASCourses();
		var database = new db.Connection("courses");
		database.insert("las", LASCourses);
		//database.logCollection("las");
		//LASCourses[115]._info.title = "Changed";
		console.log(database.find("las", function(course) {return course._areaCode == "CIS"},
			function(field) { return field == "_areaCode" || field == "_number" || field == "_info"}));
		//console.log(LASCourses[115]._areaCode);
	};

	namespace.exports.getLASDatabaseName = function() {
		return "courses";
	}

	namespace.exports.getLASCollectionName = function() {
		return "las";
	}



})(provide("registrar"));

var reg = require("registrar");
reg.enterData();