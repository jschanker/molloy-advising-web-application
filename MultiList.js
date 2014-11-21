MultiList.prototype = {
	NOT_FOUND_INDEX: -1,

	getListIndexOfElement: function(element) {
		// returns first index of list in which element is present if such a list exists;
		// otherwise returns NOT_FOUND_INDEX
		for(var i = 0; i < this._list.length; i++) {
			if(this._list[i].indexOf(element) != -1) {
				return i;
			}
		}

		return this.NOT_FOUND_INDEX; 
	},

	addToListWithElement: function(newElement, listElement) {
		// adds newElement to list with listElement; otherwise creates new list with single element newElement
		// returns index of list element was added to
		
		/* if(typeof listElement === "undefined") */

		var indexOfList = this.getListIndexOfElement(listElement);
		if(indexOfList != this.NOT_FOUND_INDEX) {
			this._list[indexOfList].push(newElement);
		} else {
			this._list.push([newElement]);
		}

		return indexOfList;
	},

	addElementToListWithIndex: function(element, index) {
		// adds element to list with index index
		this._list[index].push(element);
	},

	addEmptyList: function() {
		// adds element to list with index index
		this._list.push([]);
	},

	createFilteredMultiList: function(criteriaFunction) {
		// generates new MultiList by filtering existing multilist to only have elements for which criteriaFunction
		// evaluates to true
		filteredList = new MultiList();
		for(var i = 0; i < this._list.length; i++) {
			filteredList.addEmptyList();
			for(var j = 0; j < this._list[i].length; j++) {
				var element = this._list[i][j];
				if(criteriaFunction(element)) {
					filteredList.addElementToListWithIndex(element, i);
				}
			}
		}
		return filteredList;
	},

	areAllListsNonEmpty: function() {
		// returns true if and only if all lists are nonempty
		for(var i = 0; i < this._list.length; i++) {
			if(this._list[i].length == 0)
				return false;
		}

		return true;
	}
}

function MultiList() {
	this._list = [];
}
