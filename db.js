"use strict";

// Simulate limited MongoDB database access : read only

(function(namespace) {

	var las = require("las");

	var Collection = function() {

	};

	Collection.prototype.find = function(criteria, projection) {

	};

	namespace.exports.Connection = function() {
		// Constructor
		myCollections_ = [];
		myCollections_.push("LASCourses");
	}; 

	namespace.exports.Connection.prototype.show = function(type) {
		if(type == "dbs") {
			return this;
		} else if(type == "collections") {
			return myCollections_;
		} else {
			return {};
		}
	};

	namespace.exports.LASCourses = new Collection(); 

	//exports.prototype.find = function()

})(provide("db"));