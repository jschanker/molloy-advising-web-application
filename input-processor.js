function hasElementWithSubstring(sub)
{

}

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

function hasCommonElement(arr1, arr2)
{
	// returns true iff arr1 and arr2 have a common element
	for(var i = 0; i < arr1.length; i++)
	{
		if(arr2.indexOf(arr1[i]) != -1)
			return true;
	}

	return false;
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

function getCourseCode(courseItem) {
	return makeCourseCode(courseItem.courseAreaCode, courseItem.courseNumber);
}

function makeCourseCode(area, courseNum) {
	return area + "  " + courseNum;
}

function isCourseItemInItemList(courseItem, courseItemList) {
	return isCourseItemInList(courseItem, courseItemList.map(function(courseListItem) {
		return getCourseCode(courseListItem);
	}));
}

function isCourseItemInList(courseItem, courseList) {
	return courseList.indexOf(getCourseCode(courseItem)) != -1;
}

function isCourseItemNotInList(courseList, courseItem) {
	return !isCourseItemInList(courseItem, courseList);
}

function isCourseItemNotInItemList(courseList, courseItem) {
	return !isCourseItemInItemList(courseItem, courseList);
}

function removeCourseItemFromList(courseItemList, courseItem) {
	var courseCodes = courseItemList.map(function(courseListItem) {
		return getCourseCode(courseListItem);
	});
	var indexInList = courseCodes.indexOf(getCourseCode(courseItem));
	if(indexInList != -1) {
		courseItemList.splice(indexInList, 1);
	}
}

function isTransferCourse(courseItem) {
	return courseItem.grade == "Transfer";
}

/*
function removeInvalidCourseItems(courseItems) {
	courseItems = courseItems.filter(function(courseItem) {
		return parseFloat(courseItem.credits) >= 0;
	});
}
*/

function getCourseList(courseHistoryItems, courseList, criteriaFunction, duplicateFunction) {
	// returns the array of courses taken in courseList of course codes
	// that meet the given criteriaFunction, listing courses with equal 
	// codes more than once only if duplicateFunction is met
	var filteredCourseList = [];
	courseHistoryItems.forEach(function(courseHistoryItem) {
		
		// Patch to fix bug in which courseCredits = -1 because not actual course (e.g., Spring 2015)
		var isValidCourse = (parseFloat(courseHistoryItem.credits) >= 0);

		var isInCourseList = !courseList || isCourseItemInList(courseHistoryItem, courseList); // default: all courses in list
		var meetsCriteriaFunction = !criteriaFunction || criteriaFunction(courseHistoryItem); // default: all courses meet criteria
		// default: only transfer courses double counted
		var isDoubleCounted = 
		  duplicateFunction ? duplicateFunction(courseHistoryItem) : isTransferCourse(courseHistoryItem);

		if( isValidCourse && meetsCriteriaFunction && isInCourseList && 
		    (!isCourseItemInItemList(courseHistoryItem, filteredCourseList) || isDoubleCounted) ) {
		   		filteredCourseList.push(courseHistoryItem);
		}
	});
	return filteredCourseList;
}

function getNumOfCredits(courseHistoryItems, courseList, criteriaFunction, duplicateFunction) {
	return getCourseList(courseHistoryItems, courseList, criteriaFunction, duplicateFunction)
	       .reduce(function(totalSoFar, courseItem) {
		    return totalSoFar + parseFloat(courseItem.credits);
	       }, 0);
}

function getTotal(arr, numProperty) {
	// precondition: arr is an array of objects having a numProperty property with a floating-point value
	// postcondition: returns sum of all arr's objects numProperty values
	return arr.reduce(function(totalSoFar, obj) {
		    return totalSoFar + parseFloat(obj[numProperty]);
	       }, 0); 
}

/*
function getNumOfCredits(courseHistoryItems, courseList, criteriaFunction, duplicateFunction) {
	// returns the total number of credits for courses taken in courseList
	// that meet the given criteriaFunction, double counting only if meets duplicateFunction

	var countedCourseList = [];
	//var total = 0;  
	return courseHistoryItems.filter(function(courseHistoryItem) {
		return criteriaFunction(courseHistoryItem) && isCourseItemInList(courseHistoryItem, courseList);
	}).reduce(function(totalSoFar, courseHistoryItem) {
		var numOfCredits = parseFloat(courseHistoryItem.credits);
		if(( !isCourseItemInList(courseHistoryItem, countedCourseList) || (duplicateFunction && duplicateFunction(courseHistoryItem)) ) && numOfCredits > 0) {
			// Patch to fix bug in which courseCredits = -1 because not actual course (e.g., Spring 2015)
			countedCourseList.push(getCourseCode(courseHistoryItem));
			return totalSoFar + numOfCredits;
		} else {
			return totalSoFar;
		}
	}, 0);
}
*/

function getCourseItems(courseHistoryItems, courseList, criteriaFunction)
{
	// returns an array of course items taken in courseList
	// that meet the given criteriaFunction

	var courseItems = [];
	var courseCodes = [];

	for(var i = 0; i < courseHistoryItems.length; i++)
	{
		var courseCode = courseHistoryItems[i].courseAreaCode + "  " + courseHistoryItems[i].courseNumber;
		if( courseList.indexOf(courseCode) != -1 && criteriaFunction(courseHistoryItems[i]) 
			&& courseCodes.indexOf(courseCode) == -1)
		{
			if(courseHistoryItems[i].grade != "Transfer")
				courseCodes.push(courseCode); // add course so it's not double counted unless it's transfer
			courseItems.push(courseHistoryItems[i]);
		}
	}
	return courseItems;
}

function generateCourseCodeList(courseItems, criteriaFunction)
{
	// generates list of course codes from courseItems that meet the optionally supplied criteriaFunction
	var courseCodes = [];
	for(var i = 0; i < courseItems.length; i++)
	{
		if(!criteriaFunction || criteriaFunction(courseItems[i]))
		{
			// only add if it meets criteriaFunction or no criteriaFunction was supplied
			courseCodes.push(courseItems[i].courseAreaCode + "  " + courseItems[i].courseNumber);
		}
	}

	return courseCodes;
}

function getCreditWarning(numOfCredits, semestersToGraduate)
{
	// Returns warning if student will have trouble getting the required number of credits to graduate

	var REQUIRED_NUMBER_OF_CREDITS = 128;
	var NORMAL_TERM_CREDIT_LOAD = 16;
	var MAX_TERM_CREDIT_LOAD = 18;
	var neededCredits = REQUIRED_NUMBER_OF_CREDITS - numOfCredits
	var totalCreditsUnderNormalLoad = semestersToGraduate * NORMAL_TERM_CREDIT_LOAD;
	var totalCreditsUnderMaxLoad = semestersToGraduate * MAX_TERM_CREDIT_LOAD;
	var warning = "";

	if(neededCredits > totalCreditsUnderMaxLoad)
	{
		warning = "You still need " + neededCredits + " credits.  Even taking " + MAX_TERM_CREDIT_LOAD + 
		          " credits per term, it appears that you won't be able to graduate at the specified time "
		          + "without taking summer courses.";
	}

	else if(neededCredits > totalCreditsUnderNormalLoad)
	{
		warning = "It appears that you won't be able to graduate at the specified time without taking summer " + 
		          "courses or overloading.  Beyond a normal " + NORMAL_TERM_CREDIT_LOAD + " credit per term load, you need "
		          + parseInt(neededCredits - totalCreditsUnderNormalLoad) + " additional credits.";
	}

	return warning;
}

function getLASCreditWarning(numOfLASCredits, semestersToGraduate)
{
	// Returns warning if student is not on pace to get the required number of LAS credits by graduation
	var REQUIRED_NUMBER_OF_LAS_CREDITS = 90; // 60 if B.S.
	var NUM_OF_SEMESTERS = 8;
	var targetLASCredits = REQUIRED_NUMBER_OF_LAS_CREDITS/NUM_OF_SEMESTERS * (NUM_OF_SEMESTERS - semestersToGraduate);
	var warning = "";

	if(targetLASCredits > numOfLASCredits)
	{
		warning = "You currently have taken or are taking " + numOfLASCredits + " LAS credits.  " + 
		          "You appear to still need " + parseInt(REQUIRED_NUMBER_OF_LAS_CREDITS - numOfLASCredits) +
		          " more.  Check to make sure you are on pace to reach this goal.";
	}

	return warning;
}

function getCountingGradeList(criteria) {
	var gradeLists = {
		PASSING_TRANS_WIP: ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "Transfer", "WIP"],
		MAJOR_TRANS_WIP: ["A", "A-", "B+", "B", "B-", "C+", "C", "Transfer", "WIP"],
		TRANSFER: ["Transfer"]
	};
	return gradeLists[criteria];
}

function isPassingGradeFunction() {
	return generateMatchingGradeFunction(getCountingGradeList("PASSING_TRANS_WIP"));
}

function generateMatchingGradeFunction(gradeList) {
	return function(courseItem) {
		return courseItem.countsForCredit && gradeList.indexOf(courseItem.grade) != -1;
	}
}

function getNeededGenEdRequirements(courseHistoryItems) {
	var genEdRequirements = getGenEdObject();
	
	var isCountingGradeFunc = generateMatchingGradeFunction( getCountingGradeList("PASSING_TRANS_WIP") );
	//var isTransferFunc = generateMatchingGradeFunction( getCountingGradeList("TRANSFER") );
	
	//var unusedCountingCourses = getCourseList(courseHistoryItems, undefined, isCountingGradeFunc, isTransferFunc);
	var unusedCountingCourses = getCourseList(courseHistoryItems, undefined, isCountingGradeFunc);

	var categoriesAndCreditsNeeded = [];
	//var coursesUsed = [];

	// For now assume cross-listed courses are counted according to their current
    // designation (e.g., HIS 213 counted as a history requirement and not as a Political Science
    // requirement even though it's cross-listed as POL 213)
	// NONINTELLIGENT: Doesn't try to apply "best" strategy to counting general education courses

	// TODO: Look up cross-listed codes and find strategy for identifying best way to count courses toward each area

	genEdRequirements.forEach(function(genEdCategory) {
		var numOfCreditsFromCategoryNeeded = parseFloat(genEdCategory.totalCredits);
		// assume each area is equally represented by credits in category
		var maxCreditsPerArea = genEdCategory.totalCredits / genEdCategory.neededAreas;

		genEdCategory.areas.forEach(function(area) {
			//var unusedCoursesInArea = getCourseList(courseHistoryItems, area, isCourseItemNotInItemList.bind(undefined, coursesUsed));
			var unusedCoursesInArea = getCourseList(unusedCountingCourses, area);
			var areaCredits = 0;

			unusedCoursesInArea.forEach(function(course) {
				if(maxCreditsPerArea > areaCredits) {
					areaCredits = Math.min(areaCredits + course.credits, maxCreditsPerArea);
					removeCourseItemFromList(unusedCountingCourses, course);
					//console.log(unusedCountingCourses.length +"\n");
				}
			});

			numOfCreditsFromCategoryNeeded -= areaCredits;
		});

		if(numOfCreditsFromCategoryNeeded > 0)
			categoriesAndCreditsNeeded.push({name: genEdCategory.name, credits:numOfCreditsFromCategoryNeeded});
	});

	return categoriesAndCreditsNeeded; 
}

function getNeededMajorMinorCourses(courseHistoryItems, majorOne, majorTwo, minor)
{
	var neededMajorAndMinorCourses = {
		majorsRequirements:[ [], [] ],
		relatedsRequirements:[ [], [] ],
	};

	var isCountingGradeForRelatedFunc = generateMatchingGradeFunction( getCountingGradeList("PASSING_TRANS_WIP") );
	var isCountingGradeForMajorFunc = generateMatchingGradeFunction( getCountingGradeList("MAJOR_TRANS_WIP") );

	var majorAndRelatedRequirements = [getMajorRequirements(majorOne), getMajorRequirements(majorTwo)];
	var unusedCountingMajorCourses = getCourseList(courseHistoryItems, undefined, isCountingGradeForMajorFunc);
	//var countingRelatedCourses = getCourseList(courseHistoryItems, undefined, isCountingGradeForRelatedFunc);
	//var unusedCountingRelatedCourses = getCourseList(courseHistoryItems, undefined, isCountingGradeForRelatedFunc);
	var majorIndex = 0;

	majorAndRelatedRequirements.forEach(function(major) {
		var majorAreaCode = majorAndRelatedRequirements[majorIndex].majorName;
		major.majorCodeNumbers.forEach(function(codeList) {
			var neededCourseSelection = codeList.map(function(code) {
				return makeCourseCode(majorAreaCode, code);
			});

			var possibleCourses = getCourseList(unusedCountingMajorCourses, neededCourseSelection);

			var useIndex = 0; // TODO: Make course choice intelligent

			if(possibleCourses.length > 0) {
				removeCourseItemFromList(unusedCountingMajorCourses, possibleCourses[useIndex]);
			} else if(neededCourseSelection.length > 0) {
				neededMajorAndMinorCourses.majorsRequirements[majorIndex].push(
					{ info:getCourseWithCode(majorAreaCode, codeList[useIndex]),
					 area: majorAreaCode, codeNumber:codeList[useIndex] } );
			}
		});
		majorIndex++;
	});

	majorIndex = 0;

	majorAndRelatedRequirements.forEach(function(major) {
		var countingRelatedCourses = getCourseList(courseHistoryItems, undefined, isCountingGradeForRelatedFunc); // reset for each major
		major.relatedCodes.forEach(function(codeList) {
			var possibleCourses = getCourseList(countingRelatedCourses, codeList);

			var useIndex = 0; // TODO: Make course choice intelligent

			if(possibleCourses.length > 0) {
				removeCourseItemFromList(countingRelatedCourses, possibleCourses[useIndex]);
			} else if(codeList.length > 0) {
				neededMajorAndMinorCourses.relatedsRequirements[majorIndex].push(
					{ info:getCourseWithCode(codeList[useIndex].split("  ")[0].trim(), parseInt(codeList[useIndex].split("  ")[1].trim())),
					 area: codeList[useIndex].split("  ")[0], codeNumber:codeList[useIndex].split("  ")[1] } );
			}
		});
		majorIndex++;
	});

	return neededMajorAndMinorCourses;
}

/*

function getNeededGenEdRequirements(courseHistoryItems)
{
	var genEdRequirements = getGenEdObject();
	var numOfCategories = genEdRequirements.length;
	var isCountingGradeFunc = generateMatchingGradeFunction( getCountingGradeList("PASSING_TRANS_WIP") );
	var isTransferFunc = generateMatchingGradeFunction( getCountingGradeList("TRANSFER") );
	var categoriesAndCreditsNeeded = [];
	var countingCourses = getCourseList(courseHistoryItems, undefined, isCountingGradeFunc, isTransferFunc);


	//var coursesCounted = [];
	//var historyCourseCodeList = generateCourseCodeList(courseHistoryItems);

    // For now assume cross-listed courses are counted according to their current
    // designation (e.g., HIS 213 counted as a history requirement and not as a Political Science
    // requirement even though it's cross-listed as POL 213)

	for(var i = 0; i < numOfCategories; i++)
	{
		var genEdCategory = genEdRequirements[i];
		var numOfCoursesFromCategoryNeeded = parseInt(genEdCategory.neededAreas);
		var numOfCreditsFromCategoryNeeded = parseFloat(genEdCategory.totalCredits);
		var neededCreditsPerArea = genEdCategory.totalCredits / genEdCategory.neededAreas;
		// assume each area is equally represented by credits in category
		var neededCoursesPerArea = 1; // assume only 1 requirement is needed from each area

		for(var j = 0; j < genEdCategory.areas.length; j++)
		{
			// iterate over areas in category
			var creditsCountedForArea = 0;
			var coursesCountedForArea = 0;
			var courseItems = getCourseItems(courseHistoryItems, genEdCategory.areas[j], 
				function(courseItem)
				{
					return gradeList.indexOf(courseItem.grade) != -1; // passing grade in course or in progress
				}); // courseItems stores all taken courses with passing grades (or in-progress) from area
			for(var k = 0; k < courseItems.length; k++)
			{
				courseDesignation = courseItems[k].courseAreaCode + "  " + courseItems[k].courseNumber;
				if(coursesCounted.indexOf(courseDesignation) == -1)
				{ // course not already counted
					var creditsCountedFromCourse = Math.min(neededCreditsPerArea, parseFloat(courseItems[k].credits));
					if(coursesCountedForArea < neededCoursesPerArea)
					{
						numOfCoursesFromCategoryNeeded--;
						coursesCountedForArea++;
						if(courseItems[k].grade != "Transfer")
							coursesCounted.push(courseDesignation); // Don't worry about double counting transfer courses
					}
					if(creditsCountedForArea < neededCreditsPerArea)
					{
						creditsCountedForArea += creditsCountedFromCourse;
						numOfCreditsFromCategoryNeeded -= creditsCountedFromCourse;
						if(coursesCounted.indexOf(courseDesignation) == -1 && courseItems[k].grade != "Transfer")
							coursesCounted.push(courseDesignation);
					}
				}
			}
		}
		if(numOfCreditsFromCategoryNeeded > 0)
			categoriesAndCreditsNeeded.push({name: genEdCategory.name, credits:numOfCreditsFromCategoryNeeded});

	}

	return categoriesAndCreditsNeeded;
}

*/

function getGenEdWarning(courseHistoryItems)
{
	var genEdCreditsNeeded = 0;
	var categoriesAndCreditsNeeded = getNeededGenEdRequirements(courseHistoryItems);
	var warning = "For your general education requirements, you still need the following:\n";

	categoriesAndCreditsNeeded.forEach(function(categoryAndCreditsNeeded) {
		genEdCreditsNeeded += parseFloat(categoryAndCreditsNeeded.credits);
		warning += categoryAndCreditsNeeded.credits + " credit(s) of " + categoryAndCreditsNeeded.name + ", \n";
	});

	warning += "for a total of " + genEdCreditsNeeded + " credit(s)."

	return warning;
}

function getCourseDepth(courseAreaCode, courseNumber, startSemesterOffset, takenCourseCodes, maxDepth)
{
	// Returns the beginning of the semester number starting from Fall 2014 for which you'll be able to take
	// a course requiring code courseAreaCode courseNumber if you start the required sequence startSemesterOffset 
	// semesters after Fall 2014 and have courses takenCourseCodes due to prerequisites and scheduled 
	// course offering times:
	//
	// For example, if course A only runs in the Spring and requires course B which only runs in the fall 
	// which requires course C which only runs in the spring and takenCourseCodes does not include courses A, B, or C,
	// getCourseDepth will return 4 for A with a startSemesterOffset of 1, but returns 6 with a startSemesterOffset
	// of 2 or 3 since you need to wait until Spring of 2016 to take course C if you don't take it in Spring
	// 2015.

	var courseItem = getCourseWithCode(courseAreaCode, courseNumber);
	//alert(courseItem.prerequisites);
	var courseCode = makeCourseCode(courseAreaCode, courseNumber);
	var maxNumOfSemesters = startSemesterOffset;
	var fourBitString;

	if(maxDepth <= 0)
		return startSemesterOffset; // prevent circular list of requirements leading to infinite recursion

	if(takenCourseCodes.indexOf(courseCode) != -1)
		return startSemesterOffset;

	courseItem.prerequisites.forEach(function(prerequisiteCourseCode) {
		var prerequisiteCourseAreaCode = prerequisiteCourseCode.substring(0, prerequisiteCourseCode.indexOf(" "));
		var prerequisiteCourseNumber = parseInt(prerequisiteCourseCode.substring(prerequisiteCourseCode.indexOf("  ")+2));
		var neededSemesters = getCourseDepth(prerequisiteCourseAreaCode, prerequisiteCourseNumber, 
			                                 startSemesterOffset, takenCourseCodes, maxDepth-1);
		if(neededSemesters > maxNumOfSemesters)
		{
			maxNumOfSemesters = neededSemesters;
		}
	});

	if((parseInt(courseItem.offered) & 15) == 0)
	{
		//alert(parseInt(courseItem.offered) & 15);
		return 100+maxNumOfSemesters; // course is never offered or invalid offered 4-bit string
	}

	//maxNumOfSemesters++;
	fourBitString = 1 << (3 - (maxNumOfSemesters % 4));

	while((parseInt(courseItem.offered) & fourBitString) == 0)
	{
		// circular shift
		if(fourBitString == 1)
		{
			//alert("8 == 0");
			fourBitString = 8;
		}
		else
			fourBitString = fourBitString >> 1;

		maxNumOfSemesters++;
	}

	return maxNumOfSemesters+1;

	//getCourseItems(courseHistoryItems, [courseCode], criteriaFunction)
}

/*****

function getMajorMinorAdvice(courseHistoryItems, majorOne, majorTwo, minor)
{
	var neededMajorAndMinorCourses = {
		majorRequirements:[],
		relatedRequirements:[]
	};

	var majorPassingGradeList = ["A", "A-", "B+", "B", "B-", "C+", "C", "WIP", "Transfer"];
	var relatedPassingGradeList = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "WIP", "Transfer"];

	var majorAndRelatedRequirements = getMajorRequirements(majorOne);
	var secondaryMajorAndRelatedRequirements = getMajorRequirements(majorTwo);
	
	var countedFirstMajorRequirementCodes = [];
	var countedFirstRelatedRequirementCodes = [];
	var countedSecondMajorRequirementCodes = [];
	var countedSecondRelatedRequirementCodes = [];

	for(var i = 0; i < majorAndRelatedRequirements.majorCodeNumbers.length; i++)
	{
		var hasOneCourseOption = false;
		var useCourseWithIndex = -1; // If multiple options are present, may want to use a specific option so you can
		                             // also get credit for other major or minor as well. => not used yet

		for(var j = 0; j < majorAndRelatedRequirements.majorCodeNumbers[i].length; j++)
		{
			var courseCode = majorAndRelatedRequirements.majorName + "  " + 
			                 majorAndRelatedRequirements.majorCodeNumbers[i][j];
			//alert(courseCode);
			var countingCourses = getCourseItems(courseHistoryItems, [courseCode], 
				function(courseItem)
				{
					return majorPassingGradeList.indexOf(courseItem.grade) != -1; // passing grade in course or in progress
				}); // courseItems stores all taken courses with passing grades (or in-progress) from area
			if(!hasOneCourseOption && countingCourses.length > 0 && countedFirstMajorRequirementCodes.indexOf(courseCode) == -1)
			{
				hasOneCourseOption = true; // taken at least one course for single class requirement
				useCourseWithIndex = j;
				countedFirstMajorRequirementCodes.push(courseCode);
			}

			// Add variable to keep track of courses already counting toward other major
		}

		if(!hasOneCourseOption && majorAndRelatedRequirements.majorCodeNumbers[i].length > 0)
		{
			var neededCourse = getCourseWithCode(majorAndRelatedRequirements.majorName, 
			                 majorAndRelatedRequirements.majorCodeNumbers[i][0]);

			neededCourse.area = majorAndRelatedRequirements.majorName; // decorating object, add this as part of course item
			neededCourse.codeNumber = majorAndRelatedRequirements.majorCodeNumbers[i][0]; // another quick patch: object decoration

			neededMajorAndMinorCourses.majorRequirements.push(neededCourse);
		}
	}

	//****VERY UGLY CODE DUPLICATION - THIS MUST BE FIXED LATER!****

	for(var i = 0; i < majorAndRelatedRequirements.relatedCodes.length; i++)
	{
		var hasOneCourseOption = false;
		var useCourseWithIndex = -1; // If multiple options are present, may want to use a specific option so you can
		                             // also get credit for other major or minor as well. => not used yet

		for(var j = 0; j < majorAndRelatedRequirements.relatedCodes[i].length; j++)
		{
			var courseCode = majorAndRelatedRequirements.relatedCodes[i][j];
			//alert(courseCode);
			var countingCourses = getCourseItems(courseHistoryItems, [courseCode], 
				function(courseItem)
				{
					return relatedPassingGradeList.indexOf(courseItem.grade) != -1; // passing grade in course or in progress
				}); // courseItems stores all taken courses with passing grades (or in-progress) from area
			if(!hasOneCourseOption && countingCourses.length > 0 && countedFirstRelatedRequirementCodes.indexOf(courseCode) == -1)
			{ // hasn't already counted course
				hasOneCourseOption = true; // taken at least one course for single class requirement
				useCourseWithIndex = j;
				countedFirstRelatedRequirementCodes.push(courseCode);
			}

			// Add variable to keep track of courses already counting toward other major
		}

		if(!hasOneCourseOption && majorAndRelatedRequirements.relatedCodes[i].length > 0)
		{
			var neededCourseCode = majorAndRelatedRequirements.relatedCodes[i][0];
			var dividerIndex = neededCourseCode.indexOf("  "); // This should be implemented differently; store both area and code separately
			if(dividerIndex >= 0)
			{ // only chance for valid course code
				var neededCourseArea = neededCourseCode.substring(0,dividerIndex);
				var neededCourseNumber = parseInt(neededCourseCode.substring(dividerIndex+2));
				var neededCourse = getCourseWithCode(neededCourseArea, neededCourseNumber);

				neededCourse.area = neededCourseArea; // decorating object, add this as part of course item
				neededCourse.codeNumber = neededCourseNumber; // another quick patch: object decoration

				neededMajorAndMinorCourses.relatedRequirements.push(neededCourse);
			}
		}
	}

	return neededMajorAndMinorCourses;
}

***********/

function getMajorMinorWarning(majorMinorCourseRequirements, semestersToGraduate, courseHistoryCodes)
{
	// may want to include major/minor logic in this function instead

    var MAX_COURSE_DEPTH = 8; // for error prevention: don't go deeper than 8 courses of prerequisites
    var OFFSET_FROM_FALL_2014 = 2;
	
	var warning = "For your major and related requirements, you still need the following (Note: each course may have an unlisted alternative.):\n";

	for(var j = 0; j < 2; j++) {
		var ord = j == 0 ? "first" : "second";
		var majorCreditsNeeded = 0;
		var relatedCreditsNeeded = 0;

		for(var i = 0; i < majorMinorCourseRequirements.majorsRequirements[j].length; i++)
		{
			var requirement = majorMinorCourseRequirements.majorsRequirements[j][i];
			var credits = requirement.info.credits;
			var title = requirement.info.title;
			var area = requirement.area;
			var code = requirement.codeNumber;
			var neededNumberOfSemesters = getCourseDepth(area, code, OFFSET_FROM_FALL_2014, 
														 courseHistoryCodes, MAX_COURSE_DEPTH)-OFFSET_FROM_FALL_2014;

			majorCreditsNeeded += parseFloat(credits);
			warning += area + "  " + code + "  " + title + " \n";

			if(neededNumberOfSemesters > semestersToGraduate)
				warning += "It appears that you will not be able to take this course in order" + 
			               " to graduate on time without transfer credit (possibly because of when it or its prerequisites are offered).\n";

			else if(getCourseDepth(area, code, OFFSET_FROM_FALL_2014+1, 
				                   courseHistoryCodes, MAX_COURSE_DEPTH)-OFFSET_FROM_FALL_2014 > semestersToGraduate)
				warning += "It appears that you need to take this course or one or more of its prerequisites this semester" + 
			               " to graduate on time without transfer credit.\n";
		}

		warning += "You appear to need a total of " + majorCreditsNeeded + " major requirement credit(s) for your " + ord + " major.\n\n";

		//****MORE DISGUSTING CODE DUPLICATION COMING RIGHT UP******/

		for(var i = 0; i < majorMinorCourseRequirements.relatedsRequirements[j].length; i++)
		{
			var requirement = majorMinorCourseRequirements.relatedsRequirements[j][i];
			var credits = requirement.info.credits;
			var title = requirement.info.title;
			var area = requirement.area;
			var code = requirement.codeNumber;
			var neededNumberOfSemesters = getCourseDepth(area, code, OFFSET_FROM_FALL_2014, 
				                                         courseHistoryCodes, MAX_COURSE_DEPTH)-OFFSET_FROM_FALL_2014;

			relatedCreditsNeeded += parseFloat(credits);
			warning += area + "  " + code + "  " + title + " \n";
			if(neededNumberOfSemesters > semestersToGraduate)
				warning += "It appears that you will not be able to take this course in order" + 
			               " to graduate on time without transfer credit (possibly because of when it or its prerequisites are offered).\n";

			else if(getCourseDepth(area, code, OFFSET_FROM_FALL_2014+1,
			                       courseHistoryCodes, MAX_COURSE_DEPTH)-OFFSET_FROM_FALL_2014 > semestersToGraduate)
				warning += "It appears that you need to take this course or one or more of its prerequisites this semester" + 
			               " to graduate on time without transfer credit.\n";
		}

		warning += "You appear to need a total of " + relatedCreditsNeeded + " related requirement credit(s) for your " + ord + " major.\n\n";
	}

	return warning;
}

function convertInfoAreaCodeTripleToCourseItem(courseTriple) {
	return {
		courseAreaCode:  courseTriple.area,
		courseNumber:    courseTriple.codeNumber,
		countsForCredit: courseTriple.info.credits > 0,
		credits:         courseTriple.info.credits,
		grade:           "WIP"
	};
}

function convertMajorMinorRequirementsToCourseItemList(majorMinorRequirementsNeeded) {

	var majorMinorCourseItemsNeeded = majorMinorRequirementsNeeded.majorsRequirements[0]
										.map(convertInfoAreaCodeTripleToCourseItem);

	Array.prototype.push.apply(majorMinorCourseItemsNeeded, 
							   majorMinorRequirementsNeeded.majorsRequirements[1]
								.map(convertInfoAreaCodeTripleToCourseItem));

	Array.prototype.push.apply(majorMinorCourseItemsNeeded, 
							   majorMinorRequirementsNeeded.relatedsRequirements[0]
								.map(convertInfoAreaCodeTripleToCourseItem));

	Array.prototype.push.apply(majorMinorCourseItemsNeeded, 
							   majorMinorRequirementsNeeded.relatedsRequirements[0]
								.map(convertInfoAreaCodeTripleToCourseItem));

	return majorMinorCourseItemsNeeded;
}

function getCourseWarnings(courseInput)
{
	// gets credit warnings by comparing number of needed credits with and without course
	// TODO: Make this less ugly, really need consistent template for course data

	var courseInfo = courseInput.selectedCourse;
	var courseItem = {
			courseAreaCode:  courseInfo.area,
			courseNumber:    courseInfo.number,
			countsForCredit: courseInfo.credits > 0,
			credits:         courseInfo.credits,
			grade:           "WIP"
		};

	var courseDescription = getCourseWithCode(courseInfo.area, parseInt(courseInfo.number));

	var warnings = [];
	var courseHistoryItems = parseCourseHistory(courseInput.courseHistory);
	var courseHistoryItemsWithCourse = courseHistoryItems.slice();
	courseHistoryItemsWithCourse.push(courseItem);
	var genEdCategoriesAndCreditsNeededWithoutCourse = getNeededGenEdRequirements(courseHistoryItems);
	var genEdCategoriesAndCreditsNeededWithCourse = getNeededGenEdRequirements(courseHistoryItemsWithCourse);
	var majorMinorRequirementsNeededWithoutCourse = 
		convertMajorMinorRequirementsToCourseItemList( getNeededMajorMinorCourses(courseHistoryItems, 
		                                                    courseInput.firstMajor, courseInput.secondMajor,
		                                                    courseInput.minor) );

	var majorMinorRequirementsNeededWithCourse = 
		convertMajorMinorRequirementsToCourseItemList( getNeededMajorMinorCourses(courseHistoryItemsWithCourse, 
		                                                    courseInput.firstMajor, courseInput.secondMajor,
		                                                    courseInput.minor) );

	var courseHistoryItemsWithMajorMinorReqsAndCourse = courseHistoryItemsWithCourse.slice();
	Array.prototype.push.apply(courseHistoryItemsWithMajorMinorReqsAndCourse, 
								majorMinorRequirementsNeededWithCourse);
	var genEdCategoriesAndCreditsNeededWithCourseAndOtherReqs = 
			getNeededGenEdRequirements( courseHistoryItemsWithMajorMinorReqsAndCourse );

	var courseHistoryItemsWithMajorMinorReqs = courseHistoryItems.slice();
	Array.prototype.push.apply(courseHistoryItemsWithMajorMinorReqs, 
								majorMinorRequirementsNeededWithoutCourse);

	var genEdCategoriesAndCreditsNeededWithOtherReqs = 
			getNeededGenEdRequirements( courseHistoryItemsWithMajorMinorReqs );

	//var earnedCreditCountWithoutCourse = getNumOfCredits(courseHistoryItems, generateCourseCodeList(courseHistoryItems), isPassingGradeFunction, isTransferCourse);
	//var earnedCreditCountWithCourse = getNumOfCredits(courseHistoryItemsWithCourse, generateCourseCodeList(courseHistoryItemsWithCourse), isPassingGradeFunction, isTransferCourse);


	if(courseItem.credits == 0) {
		warnings.push("Noncredit/Remedial");
	}

	else if(isCourseItemInItemList(courseItem, courseHistoryItems)) {
		warnings.push("Repeat")
	}

	else if( getTotal(majorMinorRequirementsNeededWithoutCourse, "credits") == 
		getTotal(majorMinorRequirementsNeededWithCourse, "credits")        ) {

		if( getTotal(genEdCategoriesAndCreditsNeededWithoutCourse, "credits") == 
		    getTotal(genEdCategoriesAndCreditsNeededWithCourse, "credits")        ) {
			warnings.push("Elective/Prereq");
		}

		else if( getTotal(genEdCategoriesAndCreditsNeededWithCourseAndOtherReqs, "credits") == 
		    getTotal(genEdCategoriesAndCreditsNeededWithOtherReqs, "credits")        ) {
			warnings.push("Area Gen ed. req. already met by major/minor req.");
		}
	}

	if( !isCourseItemInList(courseItem, getLASCodes()) )
		warnings.push("Not an LAS");

	if(courseDescription) {

		var passingGradeFunction = generateMatchingGradeFunction( getCountingGradeList("PASSING_TRANS_WIP") );

		var takenPrereqs = getCourseList( courseHistoryItems, courseDescription.prerequisites, 
			          passingGradeFunction ).map(getCourseCode);

		var foundMissingPrereqYet = false;

		courseDescription.prerequisites.forEach(function(prerequisite) {
			if(takenPrereqs.indexOf(prerequisite) == -1) {
				foundMissingPrereqYet = true;
			}
		});

		if(foundMissingPrereqYet) {
			warnings.push("Missing Pre-/Co-requisite(s)");
		}
	}

	return warnings;//["Elective","Not an LAS","Gen ed. req. met by major/minor req.","Pre-/Co-requisite(s) needed"];
}

function getNeededCredits(semestersToGraduate, courseHistoryItems, majorOne, majorTwo, minor) {

	var REQUIRED_NUMBER_OF_LAS_CREDITS = 90;
	var NUM_OF_CREDITS
	var majorMinorRequirementsNeeded = getNeededMajorMinorCourses(courseHistoryItems, majorOne, majorTwo, minor);
	var majorMinorCourseRequirementsList = convertMajorMinorRequirementsToCourseItemList(majorMinorRequirementsNeeded);
	var majorMinorCourseItemsNeeded = majorMinorRequirementsNeeded.majorsRequirements[0]
										.map(convertInfoAreaCodeTripleToCourseItem);

	Array.prototype.push.apply(majorMinorCourseItemsNeeded, 
							   majorMinorRequirementsNeeded.majorsRequirements[1]
								.map(convertInfoAreaCodeTripleToCourseItem));

	// Only push major requirements first to allow for overlap, now redo for relateds

	var coursesWithMajorRequirements = majorMinorCourseItemsNeeded.slice();
	Array.prototype.push.apply(coursesWithMajorRequirements, courseHistoryItems);

	var relatedsRequirementsNeeded = getNeededMajorMinorCourses(coursesWithMajorRequirements, majorOne, majorTwo, minor);
	//var relatedRequirementsItemsNeeded = convertMajorMinorRequirementsToCourseItemList(relatedRequirementsNeeded);


	for(var i = 0; i < 2; i++) {
		Array.prototype.push.apply(majorMinorCourseItemsNeeded, 
							   relatedsRequirementsNeeded.relatedsRequirements[i]
								.map(convertInfoAreaCodeTripleToCourseItem));
	}

	// Now add general education requirements
	var coursesWithAllMajorMinorRequirements = majorMinorCourseItemsNeeded.slice();

	var majorCreditsNeeded = getTotal(coursesWithAllMajorMinorRequirements, "credits");

	Array.prototype.push.apply(coursesWithAllMajorMinorRequirements, courseHistoryItems);

	var genEdCategoriesAndCreditsNeeded = getNeededGenEdRequirements(coursesWithAllMajorMinorRequirements);

	var genEdCreditsNeeded = getTotal(genEdCategoriesAndCreditsNeeded, "credits");

	var LASCreditsNeeded = Math.max(REQUIRED_NUMBER_OF_LAS_CREDITS - 
							getNumOfCredits(coursesWithAllMajorMinorRequirements, getLASCodes(), isPassingGradeFunction, isTransferCourse) - 
							genEdCreditsNeeded, 0); // All general education courses count for LAS

	// jQuery code should not be here nor should warnings!  Wow, this has gotten messy!
	// While we're at it, let's just cut and paste code from other functions - modularization, pfft, who needs that?
	// May as well start adding Spaghetti code as well.

	var REQUIRED_NUMBER_OF_CREDITS = 128;
	//var takenCredits = getNumOfCredits(courseHistoryItems, generateCourseCodeList(courseHistoryItems), isPassingGradeFunction, isTransferCourse);
	//alert(takenCredits);

	var passGradeList = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "Transfer"]; 

	var earnedCreditCount = getNumOfCredits(courseHistoryItems, generateCourseCodeList(courseHistoryItems), 
		function(courseItem)
		{
			//return hasCommonElement(courseInfo, gradeList);
			return courseItem.countsForCredit && passGradeList.indexOf(courseItem.grade) != -1; // passing grade in course, not remedial
		}, isTransferCourse);

	var creditsInProgress = getNumOfCredits(courseHistoryItems, generateCourseCodeList(courseHistoryItems), 
		function(courseItem)
		{
			//return hasCommonElement(courseInfo, gradeList);
			return courseItem.countsForCredit && courseItem.grade == "WIP"; // passing grade in course, not remedial
		}, isTransferCourse);

	var takenCredits = earnedCreditCount + creditsInProgress;


	var additionalCredits = Math.max(0, REQUIRED_NUMBER_OF_CREDITS - (majorCreditsNeeded + genEdCreditsNeeded + LASCreditsNeeded + takenCredits));
	var totalCreditsNeeded = majorCreditsNeeded + genEdCreditsNeeded + LASCreditsNeeded + additionalCredits;

	$("#major-minor-credits").text(majorCreditsNeeded);
	$("#gen-ed-credits").text(genEdCreditsNeeded);
	$("#las-credits").text(LASCreditsNeeded);
	$("#additional-credits").text(additionalCredits);
	$("#total-credits").text(totalCreditsNeeded);

	var NORMAL_TERM_CREDIT_LOAD = 16;
	var MAX_TERM_CREDIT_LOAD = 18;
	//var neededCredits = REQUIRED_NUMBER_OF_CREDITS - numOfCredits
	var totalCreditsUnderNormalLoad = (semestersToGraduate-1) * NORMAL_TERM_CREDIT_LOAD;
	var totalCreditsUnderMaxLoad = (semestersToGraduate-1) * MAX_TERM_CREDIT_LOAD;

	if(majorCreditsNeeded > totalCreditsUnderMaxLoad) {
		$("#major-minor-credits").addClass("text-danger");
		$("#major-minor-credits-warning").text("With your planned courses for this semester, you are in danger of not satisfying the requirements" +   
		   " for your major/minor on time.  Even taking " + MAX_TERM_CREDIT_LOAD + " credits per Fall/Spring term does not seem sufficient.");
		$("#major-minor-credits-warning").addClass("text-danger");
	} else if(majorCreditsNeeded > totalCreditsUnderNormalLoad) {
		$("#major-minor-credits").addClass("text-warning");
		$("#major-minor-credits").removeClass("text-danger");
		$("#major-minor-credits-warning").addClass("text-warning");
		$("#major-minor-credits-warning").text("With your planned courses for this semester, it appears you will need to take overloads or summer courses" +   
		   " in order to satisfy your major/minor requirements on time.  Beyond a normal " + NORMAL_TERM_CREDIT_LOAD + " credit per term load, you " + 
		   "appear to need " +  parseInt(majorCreditsNeeded - totalCreditsUnderNormalLoad) + " additional credits.");
		$("#major-minor-credits-warning").removeClass("text-danger");
	} else {
		$("#major-minor-credits").removeClass("text-danger");
		$("#major-minor-credits").removeClass("text-warning");
		$("#major-minor-credits-warning").text("");
		$("#major-minor-credits-warning").removeClass("text-danger");
		$("#major-minor-credits-warning").removeClass("text-warning");
	}


	if(genEdCreditsNeeded > totalCreditsUnderMaxLoad) {
		$("#gen-ed-credits").addClass("text-danger");
		$("#gen-ed-credits-warning").text("With your planned courses for this semester, you are in danger of not satisfying the general education" +   
		   " requirements on time.  Even taking " + MAX_TERM_CREDIT_LOAD + " credits per Fall/Spring term does not seem sufficient.");
		$("#gen-ed-credits-warning").addClass("text-danger");
	} else if(genEdCreditsNeeded > totalCreditsUnderNormalLoad) {
		$("#gen-ed-credits").addClass("text-warning");
		$("#gen-ed-credits").removeClass("text-danger");
		$("#gen-ed-credits-warning").addClass("text-warning");
		$("#gen-ed-credits-warning").text("With your planned courses for this semester, it appears you will need to take overloads or summer courses" +   
		   " in order to satisfy your general education requirements on time.  Beyond a normal " + NORMAL_TERM_CREDIT_LOAD + " credit per term load, you " + 
		   "appear to need " +  parseInt(genEdCreditsNeeded - totalCreditsUnderNormalLoad) + " additional credits.");
		$("#gen-ed-credits-warning").removeClass("text-danger");
	} else {
		$("#gen-ed-credits").removeClass("text-danger");
		$("#gen-ed-credits").removeClass("text-warning");
		$("#gen-ed-credits-warning").text("");
		$("#gen-ed-credits-warning").removeClass("text-danger");
		$("#gen-ed-credits-warning").removeClass("text-warning");
	}

	if(LASCreditsNeeded > totalCreditsUnderMaxLoad) {
		$("#las-credits").addClass("text-danger");
		$("#las-credits-warning").text("With your planned courses for this semester, you are in danger of not satisfying the LAS" +   
		   " requirements on time.  Even taking " + MAX_TERM_CREDIT_LOAD + " credits per Fall/Spring term does not seem sufficient." + 
		   " NOTE: This assumes " + REQUIRED_NUMBER_OF_LAS_CREDITS + " credits.  A B.S. degree only requires 60.");
		$("#las-credits-warning").addClass("text-danger");
	} else if(LASCreditsNeeded > totalCreditsUnderNormalLoad) {
		$("#las-credits").addClass("text-warning");
		$("#las-credits").removeClass("text-danger");
		$("#las-credits-warning").addClass("text-warning");
		$("#las-credits-warning").text("With your planned courses for this semester, it appears you will need to take overloads or summer courses" +   
		   " in order to satisfy the LAS requirements on time.  Beyond a normal " + NORMAL_TERM_CREDIT_LOAD + " credit per term load, you " + 
		   "appear to need " +  parseInt(LASCreditsNeeded - totalCreditsUnderNormalLoad) + " additional credits." + 
		   " NOTE: This assumes " + REQUIRED_NUMBER_OF_LAS_CREDITS + " credits.  A B.S. degree only requires 60.");
		$("#las-credits-warning").removeClass("text-danger");
	} else {
		$("#las-credits").removeClass("text-danger");
		$("#las-credits").removeClass("text-warning");
		$("#las-credits-warning").text("");
		$("#las-credits-warning").removeClass("text-danger");
		$("#las-credits-warning").removeClass("text-warning");
	}

	if(additionalCredits > totalCreditsUnderMaxLoad) {
		$("#additional-credits").addClass("text-danger");
		$("#additional-credits-warning").text("With your planned courses for this semester, you are in danger of not meeting the credit" +   
		   " requirement on time.  Even taking " + MAX_TERM_CREDIT_LOAD + " credits per Fall/Spring term does not seem sufficient.");
		$("#additional-credits-warning").addClass("text-danger");
	} else if(additionalCredits > totalCreditsUnderNormalLoad) {
		$("#additional-credits").addClass("text-warning");
		$("#additional-credits").removeClass("text-danger");
		$("#additional-credits-warning").addClass("text-warning");
		$("#additional-credits-warning").text("With your planned courses for this semester, it appears you will need to take overloads or summer courses" +   
		   " in order to satisfy the credit requirements on time.  Beyond a normal " + NORMAL_TERM_CREDIT_LOAD + " credit per term load, you " + 
		   "appear to need " +  parseInt(additionalCredits - totalCreditsUnderNormalLoad) + " additional credits.");
		$("#additional-credits-warning").removeClass("text-danger");
	} else {
		$("#additional-credits").removeClass("text-danger");
		$("#additional-credits").removeClass("text-warning");
		$("#additional-credits-warning").text("");
		$("#additional-credits-warning").removeClass("text-danger");
		$("#additional-credits-warning").removeClass("text-warning");
	}

	if(totalCreditsNeeded > totalCreditsUnderMaxLoad) {
		$("#total-credits").addClass("text-danger");
		$("#total-credits-warning").text("With your planned courses for this semester, you are in danger of not meeting the total credit" +   
		   " requirement on time.  Even taking " + MAX_TERM_CREDIT_LOAD + " credits per Fall/Spring term does not seem sufficient.");
		$("#total-credits-warning").addClass("text-danger");
	} else if(totalCreditsNeeded > totalCreditsUnderNormalLoad) {
		$("#total-credits").addClass("text-warning");
		$("#total-credits").removeClass("text-danger");
		$("#total-credits-warning").addClass("text-warning");
		$("#total-credits-warning").text("With your planned courses for this semester, it appears you will need to take overloads or summer courses" +   
		   " in order to satisfy the total credit requirements on time.  Beyond a normal " + NORMAL_TERM_CREDIT_LOAD + " credit per term load, you " + 
		   "appear to need " +  parseInt(totalCreditsNeeded - totalCreditsUnderNormalLoad) + " additional credits.");
		$("#total-credits-warning").removeClass("text-danger");
	} else {
		$("#total-credits").removeClass("text-danger");
		$("#total-credits").removeClass("text-warning");
		$("#total-credits-warning").text("");
		$("#total-credits-warning").removeClass("text-danger");
		$("#total-credits-warning").removeClass("text-warning");
	}


/*
	$("#major-minor-credits").addClass("text-danger");

	if(neededCredits > totalCreditsUnderMaxLoad)
	{
		warning = "You still need " + neededCredits + " credits.  Even taking " + MAX_TERM_CREDIT_LOAD + 
		          " credits per term, it appears that you won't be able to graduate at the specified time "
		          + "without taking summer courses.";
	}

	else if(neededCredits > totalCreditsUnderNormalLoad)
	{
		warning = "It appears that you won't be able to graduate at the specified time without taking summer " + 
		          "courses or overloading.  Beyond a normal " + NORMAL_TERM_CREDIT_LOAD + " credit per term load, you need "
		          + parseInt(neededCredits - totalCreditsUnderNormalLoad) + " additional credits.";
	}
*/
	//alert("Major credits needed: " + majorCreditsNeeded + "\nAdditional General Education Credits needed:" + genEdCreditsNeeded + 
	//	  "\nAdditional LAS Credits needed: " +  LASCreditsNeeded);

}

/*
function getNeededCredits(courseHistoryItems, majorOne, majorTwo, minor) {
	// TODO: Need to fix overlapping course issue: e.g., MAT/BIO: 92 credits but BIO/MATH 88 - should be 88
	// ELECTIVE CREDITS ISSUE

	var majorMinorRequirementsNeeded = getNeededMajorMinorCourses(courseHistoryItems, majorOne, majorTwo, minor);
	var majorMinorCourseRequirementsList = convertMajorMinorRequirementsToCourseItemList(majorMinorRequirementsNeeded);
	var majorMinorCourseItemsNeeded = majorMinorRequirementsNeeded.majorsRequirements[0]
										.map(convertInfoAreaCodeTripleToCourseItem);

	Array.prototype.push.apply(majorMinorCourseItemsNeeded, 
							   majorMinorRequirementsNeeded.majorsRequirements[1]
								.map(convertInfoAreaCodeTripleToCourseItem));


	for(var i = 0; i < 2; i++) {
		var relatedMajorRequirements = majorMinorRequirementsNeeded.relatedsRequirements[i]
											.map(convertInfoAreaCodeTripleToCourseItem);

		var neededAdditionalCourses = []; // use separate list because may have same elective in related requirement listed twice

		relatedMajorRequirements.forEach(function(additionalRequirement) {
			isAdditionalRequirementInList = false;
			majorMinorCourseItemsNeeded.forEach(function(requirement) {
				if(requirement.courseAreaCode == additionalRequirement.courseAreaCode && 
					requirement.courseNumber == additionalRequirement.courseNumber) {
					isAdditionalRequirementInList = true;
				}
			});
			if(!isAdditionalRequirementInList) {
				neededAdditionalCourses.push(additionalRequirement);
			}
		});

		Array.prototype.push.apply(majorMinorCourseItemsNeeded, 
							   		neededAdditionalCourses);
	}

	//alert(getTotal(majorMinorCourseItemsNeeded, "credits"));
}*/

function generateAdvice(courseInput)
{
	var courseHistoryItems = parseCourseHistory(courseInput.courseHistory);
	Array.prototype.push.apply(courseHistoryItems, courseInput.plannedCourseItems);
	var majorOne = courseInput.firstMajor;
	var majorTwo = courseInput.secondMajor;
	var minor = courseInput.minor;
	getNeededCredits(courseInput.semestersToGraduate, courseHistoryItems, majorOne, majorTwo, minor);
	var LASCourseItems = getLASCodes();
	var passGradeList = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "Transfer"]; 
	var adviceItems = [];

	//var majorMinorCourseRequirements = getMajorMinorAdvice(courseHistoryItems, majorOne, majorTwo, minor);

	var LASCreditCount = getNumOfCredits(courseHistoryItems, LASCourseItems, isPassingGradeFunction, isTransferCourse);

	var earnedCreditCount = getNumOfCredits(courseHistoryItems, generateCourseCodeList(courseHistoryItems), 
		function(courseItem)
		{
			//return hasCommonElement(courseInfo, gradeList);
			return courseItem.countsForCredit && passGradeList.indexOf(courseItem.grade) != -1; // passing grade in course, not remedial
		}, isTransferCourse);

	//alert("Earned Credit Count: " + earnedCreditCount);
	var majorMinorCourseRequirements = getNeededMajorMinorCourses(courseHistoryItems, majorOne, majorTwo, minor);

	var creditsInProgress = getNumOfCredits(courseHistoryItems, generateCourseCodeList(courseHistoryItems), 
		function(courseItem)
		{
			//return hasCommonElement(courseInfo, gradeList);
			return courseItem.countsForCredit && courseItem.grade == "WIP"; // passing grade in course, not remedial
		}, isTransferCourse);
	/*var LASCreditsInProgress = getNumOfCredits(courseHistoryItems, LASCourseItems, 
		function(courseItem)
		{
			//return hasCommonElement(courseInfo, gradeList);
			return courseItem.countsForCredit && courseItem.grade == "WIP"; // passing grade in course, not remedial
		}, isTransferCourse);*/

	var majorMinorWarning = getMajorMinorWarning(majorMinorCourseRequirements, courseInput.semestersToGraduate, 
		                                         generateCourseCodeList(courseHistoryItems, 
		                                         	function(courseItem) {
		                                         		return passGradeList.indexOf(courseItem.grade) != -1 || courseItem.grade == "WIP";
		                                         	}));
	//alert(earnedCreditCount);
	//var creditWarning = getCreditWarning(earnedCreditCount+creditsInProgress, courseInput.semestersToGraduate);
	var genEdWarning = getGenEdWarning(courseHistoryItems);
	adviceItems.push(majorMinorWarning);
	adviceItems.push(genEdWarning);
	//adviceItems.push(creditWarning);
	//adviceItems.push(getLASCreditWarning(LASCreditCount + LASCreditsInProgress, courseInput.semestersToGraduate));
	//adviceItems.push(getLASCreditWarning(LASCreditCount, courseInput.semestersToGraduate));

	//alert("Depth: " + getCourseDepth("MAT", 115, 8, generateCourseCodeList(courseHistoryItems), 5));
//alert(parseInt(getCourseWithCode("MAT", 232).offered));
	return adviceItems;

	//return ["Earned Credits: " + earnedCreditCount, "Earned LAS Credits: " + LASCreditCount];
}

function parseCourseHistory(courseHistory)
{
	// returns an array of course objects from courseHistory string
	var lines = courseHistory.split("\n");
	var courseItems = [];
	var grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F", "P", "W", "WA", "WF", "WIP", "Transfer"];
	for(var i = 0; i < lines.length; i++)
	{
		var line = lines[i].replace(/\s+/g, ' ');
		var courseInfo = line.split(' ');
		var courseItem = {
			courseAreaCode:  courseInfo[0],
			courseNumber:    courseInfo[1],
			countsForCredit: courseInfo.indexOf("Credit") != -1 || courseInfo.indexOf("Transfer") != -1,
			credits:         getMatch(courseInfo, /[0-9][.][0-9][0-9]/),
			grade:           getCommonElement(courseInfo, grades)
		};
		courseItems.push(courseItem);
	}

	return courseItems;

	/*****
	var lasCount = 0;
	var lasCredits = 0;
	var courseCount = 0;
	var earnedCreditCount = 0;
	var grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D"];
	var creditMatch;
	var LASCodes = getLASCodes();
	for(var i = 0; i < lines.length; i++)
	{
		var line = lines[i].replace(/\s+/g, ' ');
		var courseInfo = line.split(' ');

		if(LASCodes.indexOf(courseInfo[0] + "  " + courseInfo[1]) != -1 && hasCommonElement(grades, courseInfo))
		{
			//lasCount++;
			//alert(courseInfo[0] + "  " + courseInfo[1]);
			creditMatch = getMatch(courseInfo, /[0-9][.][0-9][0-9]/);
			lasCount++;
			if(creditMatch)
			{
				lasCredits += parseFloat(creditMatch);
			}
		}

		if(courseInfo.indexOf("Credit") != -1 && hasCommonElement(grades, courseInfo))
		{
			creditMatch = getMatch(courseInfo, /[0-9][.][0-9][0-9]/);
			courseCount++;
			if(creditMatch)
			{
				earnedCreditCount += parseFloat(creditMatch);
			}
		}
	}
	//alert(lasCount + "\nCourses: " + courseCount + "\nEarned Credits: " + earnedCreditCount 
	//	+"\nEarned LAS Credits: " + lasCredits);
	//alert("Earned Credits: " + earnedCreditCount + "\nEarned LAS Credits: " + lasCredits);
	return ["Earned Credits: " + earnedCreditCount, "Earned LAS Credits: " + lasCredits];
	*******/
}
