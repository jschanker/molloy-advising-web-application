// Future module for maintaining consistent data format

function Course(areaCode, area, info) {
	this.areaCode = areaCode;
	this.area = area;

}

function Record(course, grade) {
	this.course = course;
	this.grade = grade;
}

function Transcript() {
	this.records_ = [];
}