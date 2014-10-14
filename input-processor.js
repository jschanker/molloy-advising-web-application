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
			courseCodes.push(courseCode); // add course so it's not double counted
			credits += parseFloat(courseHistoryItems[i].credits);
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
			courseCodes.push(courseCode); // add course so it's not double counted
			courseItems.push(courseHistoryItems[i]);
		}
	}
	return courseItems;
}

function generateCourseCodeList(courseItems)
{
	// generates list of course codes from courseItems
	var courseCodes = [];
	for(var i = 0; i < courseItems.length; i++)
	{
		courseCodes.push(courseItems[i].courseAreaCode + "  " + courseItems[i].courseNumber);
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
						coursesCounted.push(courseDesignation);
					}
					if(creditsCountedForArea < neededCreditsPerArea)
					{
						creditsCountedForArea += creditsCountedFromCourse;
						numOfCreditsFromCategoryNeeded -= creditsCountedFromCourse;
						if(coursesCounted.indexOf(courseDesignation) == -1)
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
	genEdCreditsNeeded = 0;
	categoriesAndCreditsNeeded = getNeededGenEdRequirements(courseHistoryItems);
	warning = "For your general education requirements, you still need the following:\n";
	for(var i = 0; i < categoriesAndCreditsNeeded.length; i++)
	{
		genEdCreditsNeeded += parseFloat(categoriesAndCreditsNeeded[i].credits);
		warning += categoriesAndCreditsNeeded[i].credits + " credit(s) of " + categoriesAndCreditsNeeded[i].name + ", \n";
	}

	warning += "for a total of " + genEdCreditsNeeded + " credit(s)."

	return warning;
}

function generateAdvice(courseInput)
{
	var courseHistoryItems = parseCourseHistory(courseInput.courseHistory);
	var LASCourseItems = getLASCodes();
	var passGradeList = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "Transfer"]; 
	var adviceItems = [];

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

	var creditWarning = getCreditWarning(earnedCreditCount+creditsInProgress, courseInput.semestersToGraduate);
	var genEdWarning = getGenEdWarning(courseHistoryItems);
	adviceItems.push(genEdWarning);
	adviceItems.push(creditWarning);
	adviceItems.push(getLASCreditWarning(LASCreditCount + LASCreditsInProgress, courseInput.semestersToGraduate));

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
