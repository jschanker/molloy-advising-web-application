"use strict";

// simulate database connection

(function(namespace) {

	var databasesByName = {};

	var Collection = function(name) {
		this._documents = [];
	}

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
				id++;
			});
			Array.prototype.push.apply(this._documents, documents);
		} else {
			documents._id = documents._id || id;
			this._documents.push(documents);
		}
	}

	Collection.prototype.find = function(criteriaFunction, projectionFunction) {
		// for now, query short-circuited with criteriaFunction
		// projections also short-circuited with projectionFunction
		// only shallow projections implemented for now but commented out for now
		// projections change the object's type
		// returns all documents in collection that meet criteriaFunction

		criteriaFunction = criteriaFunction ? criteriaFunction : function(documentItem) { return true; };
		projectionFunction = projectionFunction ? projectionFunction : function(field) { return true; };

		return this._documents.filter(criteriaFunction);/*.map(function(documentItem) { 
			var partialDocument = {};
			//var fields = Object.keys(documentItem);
			for(var field in documentItem) {
				if(documentItem.hasOwnProperty(field) && projectionFunction(field)) {
					partialDocument[field] = documentItem[field];
				}
			}

			return partialDocument;
		});*/
	}

	var Database = function(name) {
		this._name = name;
		this._collectionsByName = {};
		databasesByName[name] = this;
	};

	Database.prototype.getCollectionNames = function() {
		return Object.keys(this._collectionsByName)
	}

	Database.prototype.getCollectionByName = function(name) {
		return this.addCollection(name);
	}

	Database.prototype.addCollection = function(collectionName) {
		// add collection if it doesn't already exist and return collection
		if(!(collectionName in this._collectionsByName)) {
			this._collectionsByName[collectionName] = new Collection(collectionName);
		}

		return this._collectionsByName[collectionName];
	}

	namespace.exports.Connection = function(databaseName) {
		this.use(databaseName);
	};

	namespace.exports.Connection.prototype.insert = function(collectionName, documents) {
		this._database.getCollectionByName(collectionName).insert(documents);
		//console.log(this._database.getCollectionByName(collectionName)._documents);
	};

	namespace.exports.Connection.prototype.show = function(type) {
		if(type === "dbs") {
			return Object.keys(databasesByName);
		} else if(type === "collections") {
			return this._database.getCollectionNames();
		} else {
			return {};
		}
	};

	namespace.exports.Connection.prototype.use = function(databaseName) {
		if(databaseName in databasesByName) {
			this._database = databasesByName[databaseName];
		} else {
			this._database = new Database(databaseName);
		}
	};

	namespace.exports.Connection.prototype.createCollection = function(name) {
		this._database.addCollection(name);
	};

	namespace.exports.Connection.prototype.find = function(collectionName, criteriaFunction, projectionFunction) {
		return this._database.getCollectionByName(collectionName).find(criteriaFunction, projectionFunction);
	};

	namespace.exports.Connection.prototype.logCollection = function(name) {
		console.log(this._database.getCollectionByName(name)._documents);
	};

})(provide("connection"));

/*
var connect = require("connection");
var c = new connect.Connection("abc");
var d = new connect.Connection("def");
d.createCollection("X");
d.createCollection("Y");
d.insert("X", [{"abc": 5}, {_id: "xyz", def: "abc"}]);
d.insert("X", {"a": 10});
console.log(d.show("collections"));
*/