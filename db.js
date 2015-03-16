"use strict";

// Simulate limited MongoDB database access operations

(function(namespace) {

/**
	var las = require("las");

	var Collection = function(documents) {
		this.documents_ = documents;
	};
**/

	var Collection = function() {
		this._documents = [];
	}

	Collection.prototype.find = function(criteria, projection) {

		var getDocuments = function(criteria, documents) {
			if(!criteria) {
				return documents;
			}

			var filteredDocuments = documents;

			for(key in criteria) {
				if(key.indexOf("$") != 0) {
					filteredDocuments = filteredDocuments.filter(function(documentItem) {
						return (documentItem[key] === criteria[key]) || 
						        (Array.isArray(documentItem) && documentItem[key].indexOf(criteria[key]) != -1);
					});
				}
			}

			return filteredDocuments;
		};

	};

	Collection.prototype._generateLargestId = function() {
		// function to generate a unique id that's larger than every other one
		var id = 0;
		this._documents.forEach(function(documentItem) {
			var idNum = parseInt(documentItem._id)
			if(idNum >= id) {
				id = idNum+1;
			}
		});

		return id;
	}

	Collection.prototype.insert = function(documents) {
		var id = this._generateLargestId();

		if(Array.isArray(documents)) {
			documents.forEach(function(documentItem) {
				documentItem._id = documentItem._id || id;
			});
			Array.prototype.push.apply(this._documents, documents);
		} else {
			documents._id = documents._id || id;
			this._documents.push(documents);
		}
	}
/*
	Collection.prototype._parseQuery = function(criteria) {
		var startIndex = criteria.indexOf("{");
		var currentIndex = startIndex;
		var firstIndexOfOpenBracket = criteria.indexOf("{", currentIndex);
		var firstIndexOfCloseBracket = criteria.indexOf("}", currentIndex);
		var numOfOpenBrackets = 0;
		var query;

		if(criteria === "") {
			return this._documents;
		}

		while(currentIndex != -1 && currentIndex < criteria.length && 
		  (numOfOpenBrackets > 0 || firstIndexOfOpenBracket < firstIndexOfCloseBracket)) {
			if(firstIndexOfOpenBracket < firstIndexOfCloseBracket) {
				currentIndex = firstIndexOfOpenBracket + 1;
				numOfOpenBrackets++;
			} else {
				numOfCloseBrackets--;
				currentIndex = firstIndexOfCloseBracket + 1;
			}

			firstIndexOfOpenBracket = criteria.indexOf("{", currentIndex);
			firstIndexOfCloseBracket = criteria.indexOf("}", currentIndex);
		}

		if(currentIndex == -1 || currentIndex >= criteria.length) {
			return []; // Illformed query
		}

		innerCriteria = criteria.substring(firstIndexOfOpenBracket+1, firstIndexOfCloseBracket);

		if(innerCriteria.indexOf(":") != -1) {
			var resultPair = innerCriteria.split(":");
			var field = resultPair[0].trim();
			var value = resultPair[1].trim();

			if(value.indexOf("{") == -1) {
				return this._documents.filter(function(documentItem) {
					return documentItem[field] == value;
				});
			} else {
				return this._parseQuery(value);
			}
		} else {
			// Illformed query
			return [];
		}
	}
*/
	namespace.exports.Connection = function(dbName) {
		// Constructor: Model connection to database dbName
		//this.collections_ = [];
		//this.collections_.push("LASCourses");
		if(!namespace.exports.Connection[dbName]) {
			namespace.exports.Connection[dbName]._collections = [];
		}
		
		this._dbName = dbName;
	};

	namespace.exports.Connection.show = function(type) {
		if(type === "dbs") {
			return this;
		} else if(type === "collections") {
			return this._collections;
		} else {
			return {};
		}
	};

	namespace.exports.Connection.createCollection = function(name) {
		namespace.exports.Connection[name] = new Collection();
	}

	//namespace.exports.LASCourses = new Collection(las); 

	//exports.prototype.find = function()

})(provide("db"));

var dbs = require("db");

dbs.Connection["abc"] = "def";

var newDb = Object.create(dbs);

newDb.Connection.createCollection("xyz");

console.log("Name:" + dbs.Connection["xyz"]._documents);