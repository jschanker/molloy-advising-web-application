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
			});
			Array.prototype.push.apply(this._documents, documents);
		} else {
			documents._id = documents._id || id;
			this._documents.push(documents);
		}
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
		return this._collectionsByName[name];
	}

	Database.prototype.addCollection = function(collectionName) {
		if(!(collectionName in this._collectionsByName)) {
			this._collectionsByName[collectionName] = new Collection(collectionName);
		}
	}

	namespace.exports.Connection = function(databaseName) {
		this.use(databaseName);
	};

	namespace.exports.Connection.prototype.insert = function(collectionName, documents) {
		this._database.getCollectionByName(collectionName).insert(documents);
		console.log(this._database.getCollectionByName(collectionName)._documents);
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

})(provide("connection"));

var connect = require("connection");
var c = new connect.Connection("abc");
var d = new connect.Connection("def");
d.createCollection("X");
d.createCollection("Y");
d.insert("X", [{"abc": 5}, {_id: "xyz", def: "abc"}]);
d.insert("X", {"a": 10});
console.log(d.show("collections"));