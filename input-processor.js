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
	for(var i = 0; i < courseHistoryItems.length; i++)
	{
		var courseCode = courseHistoryItems[i].courseAreaCode + "  " + courseHistoryItems[i].courseNumber;
		if( courseList.indexOf(courseCode) != -1 && criteriaFunction(courseHistoryItems[i]) )
		{
			credits += parseFloat(courseHistoryItems[i].credits);
		}
	}
	return credits;
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
		warning = "Even taking " + MAX_TERM_CREDIT_LOAD + 
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