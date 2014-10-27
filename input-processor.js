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

function getNumOfCredits(courseHistoryItems, courseList, criteriaFunction)
{
	// returns the total number of credits for courses taken in courseList
	// that meet the given criteriaFunction

	var credits = 0;
	var courseCodes = [];

	for(var i = 0; i < courseHistoryItems.length; i++)
	{
		var courseCode = courseHistoryItems[i].courseAreaCode + "  " + courseHistoryItems[i].courseNumber;
		if( courseList.indexOf(courseCode) != -1 && criteriaFunction(courseHistoryItems[i]) 
			&& courseCodes.indexOf(courseCode) == -1)
		{
			if(courseHistoryItems[i].grade != "Transfer")
				courseCodes.push(courseCode); // add course so it's not double counted unless it's transfer credit
			var courseCredits = parseFloat(courseHistoryItems[i].credits);
			if(courseCredits > 0)
			{ // Patch to fix bug in which courseCredits = -1 because not actual course (e.g., Transfer)
			  // There's still a problem here: when course is listed twice but still counted (Transfer credit)
				credits += courseCredits;
			}
		}
	}
	return credits;
}

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

function getNeededGenEdRequirements(courseHistoryItems)
{
	var genEdRequirements = getGenEdObject();
	var numOfCategories = genEdRequirements.length;
	var gradeList = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "Transfer", "WIP"];
	var categoriesAndCreditsNeeded = [];
	var coursesCounted = [];
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

function getGenEdWarning(courseHistoryItems)
{
	var genEdCreditsNeeded = 0;
	var categoriesAndCreditsNeeded = getNeededGenEdRequirements(courseHistoryItems);
	var warning = "For your general education requirements, you still need the following:\n";
	for(var i = 0; i < categoriesAndCreditsNeeded.length; i++)
	{
		genEdCreditsNeeded += parseFloat(categoriesAndCreditsNeeded[i].credits);
		warning += categoriesAndCreditsNeeded[i].credits + " credit(s) of " + categoriesAndCreditsNeeded[i].name + ", \n";
	}

	warning += "for a total of " + genEdCreditsNeeded + " credit(s)."

	return warning;
}

function getCourseDepth(courseAreaCode, courseNumber, startSemesterOffset, takenCourseCodes, maxDepth)
{
	// Returns the beginning of the semester number starting from Fall 2014 for which you'll be able to take
	// a course requiring code courseAreaCode courseNumber if you start the reuired sequence after startSemesterOffset 
	// semesters following Spring 2015 and have courses takenCourseCodes due to prerequisites and scheduled 
	// course offering times:
	//
	// For example, if course A only runs in the Spring and requires course B which only runs in the fall 
	// which requires course C which only runs in the spring and takenCourseCodes does not include courses A, B, or C,
	// getCourseDepth will return 4 with a startSemesterOffset of 1, but returns 6 with a startSemesterOffset
	// of 2 or 3 since you need to wait until Spring of 2016 to take course C if you don't take it in Spring
	// 2015.

	var courseItem = getCourseWithCode(courseAreaCode, courseNumber);
	//alert(courseItem.prerequisites);
	var courseCode = courseAreaCode + "  " + courseNumber;
	var maxNumOfSemesters = startSemesterOffset;
	var fourBitString;

	if(maxDepth <= 0)
		return startSemesterOffset; // prevent circular list of requirements leading to infinite recursion

	if(takenCourseCodes.indexOf(courseCode) != -1)
		return startSemesterOffset;

	for(var i = 0; i < courseItem.prerequisites.length; i++)
	{
		var prerequisiteCourseCode = courseItem.prerequisites[i];
		var prerequisiteCourseAreaCode = prerequisiteCourseCode.substring(0, prerequisiteCourseCode.indexOf(" "));
		var prerequisiteCourseNumber = parseInt(prerequisiteCourseCode.substring(prerequisiteCourseCode.indexOf("  ")+2));
		var neededSemesters = getCourseDepth(prerequisiteCourseAreaCode, prerequisiteCourseNumber, 
			                                 startSemesterOffset, takenCourseCodes, maxDepth-1);
		if(neededSemesters > maxNumOfSemesters)
		{
			maxNumOfSemesters = neededSemesters;
		}
	}

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

	/****VERY UGLY CODE DUPLICATION - THIS MUST BE FIXED LATER!****/

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

function getMajorMinorWarning(majorMinorCourseRequirements, semestersToGraduate, courseHistoryCodes)
{
	// may want to include major/minor logic in this function instead

	var majorCreditsNeeded = 0;
	var relatedCreditsNeeded = 0;
    var MAX_COURSE_DEPTH = 8; // for error prevention: don't go deeper than 8 courses of prerequisites
	
	var warning = "For your major and related requirements, you still need the following (Note: each course may have an unlisted alternative.):\n";
	for(var i = 0; i < majorMinorCourseRequirements.majorRequirements.length; i++)
	{
		var requirement = majorMinorCourseRequirements.majorRequirements[i];
		var credits = requirement.credits;
		var title = requirement.title;
		var area = requirement.area;
		var code = requirement.codeNumber;
		var neededNumberOfSemesters = getCourseDepth(area, code, 1, courseHistoryCodes, MAX_COURSE_DEPTH)-1;

		majorCreditsNeeded += parseFloat(credits);
		warning += area + "  " + code + "  " + title + " \n";

		if(neededNumberOfSemesters > semestersToGraduate)
			warning += "It appears that you will not be able to take this course in order" + 
		               " to graduate on time without transfer credit (possibly because of when it or its prerequisites are offered).\n";

		else if(getCourseDepth(area, code, 2, courseHistoryCodes, MAX_COURSE_DEPTH)-1 > semestersToGraduate)
			warning += "It appears that you need to take this course or one or more of its prerequisites this semester" + 
		               " to graduate on time without transfer credit.\n";
	}

	warning += "You appear to need a total of " + majorCreditsNeeded + " major requirement credit(s) for your major.\n\n";

	//****MORE DISGUSTING CODE DUPLICATION COMING RIGHT UP******/

	for(var i = 0; i < majorMinorCourseRequirements.relatedRequirements.length; i++)
	{
		var requirement = majorMinorCourseRequirements.relatedRequirements[i];
		var credits = requirement.credits;
		var title = requirement.title;
		var area = requirement.area;
		var code = requirement.codeNumber;
		var neededNumberOfSemesters = getCourseDepth(area, code, 1, courseHistoryCodes, MAX_COURSE_DEPTH)-1;

		relatedCreditsNeeded += parseFloat(credits);
		warning += area + "  " + code + "  " + title + " \n";
		if(neededNumberOfSemesters > semestersToGraduate)
			warning += "It appears that you will not be able to take this course in order" + 
		               " to graduate on time without transfer credit (possibly because of when it or its prerequisites are offered).\n";

		else if(getCourseDepth(area, code, 2, courseHistoryCodes, MAX_COURSE_DEPTH)-1 > semestersToGraduate)
			warning += "It appears that you need to take this course or one or more of its prerequisites this semester" + 
		               " to graduate on time without transfer credit.\n";
	}

	warning += "You appear to need a total of " + relatedCreditsNeeded + " related requirement credit(s) for your major.\n\n";

	return warning;
}

function generateAdvice(courseInput)
{
	var courseHistoryItems = parseCourseHistory(courseInput.courseHistory);
	var majorOne = courseInput.firstMajor;
	var majorTwo = courseInput.secondMajor;
	var minor = courseInput.minor;
	var LASCourseItems = getLASCodes();
	var passGradeList = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "Transfer"]; 
	var adviceItems = [];

	var majorMinorCourseRequirements = getMajorMinorAdvice(courseHistoryItems, majorOne, majorTwo, minor);

	var LASCreditCount = getNumOfCredits(courseHistoryItems, LASCourseItems, 
		function(courseItem)
		{
			//return hasCommonElement(courseInfo, gradeList);
			return passGradeList.indexOf(courseItem.grade) != -1; // passing grade in course
		});

	var earnedCreditCount = getNumOfCredits(courseHistoryItems, generateCourseCodeList(courseHistoryItems), 
		function(courseItem)
		{
			//return hasCommonElement(courseInfo, gradeList);
			return courseItem.countsForCredit && passGradeList.indexOf(courseItem.grade) != -1; // passing grade in course, not remedial
		});

	var creditsInProgress = getNumOfCredits(courseHistoryItems, generateCourseCodeList(courseHistoryItems), 
		function(courseItem)
		{
			//return hasCommonElement(courseInfo, gradeList);
			return courseItem.countsForCredit && courseItem.grade == "WIP"; // passing grade in course, not remedial
		});
	var LASCreditsInProgress = getNumOfCredits(courseHistoryItems, LASCourseItems, 
		function(courseItem)
		{
			//return hasCommonElement(courseInfo, gradeList);
			return courseItem.countsForCredit && courseItem.grade == "WIP"; // passing grade in course, not remedial
		});

	var majorMinorWarning = getMajorMinorWarning(majorMinorCourseRequirements, courseInput.semestersToGraduate, 
		                                         generateCourseCodeList(courseHistoryItems, 
		                                         	function(courseItem) {
		                                         		return passGradeList.indexOf(courseItem.grade) != -1 || courseItem.grade == "WIP";
		                                         	}));
	//alert(earnedCreditCount);
	var creditWarning = getCreditWarning(earnedCreditCount+creditsInProgress, courseInput.semestersToGraduate);
	var genEdWarning = getGenEdWarning(courseHistoryItems);
	adviceItems.push(majorMinorWarning);
	adviceItems.push(genEdWarning);
	adviceItems.push(creditWarning);
	adviceItems.push(getLASCreditWarning(LASCreditCount + LASCreditsInProgress, courseInput.semestersToGraduate));

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
