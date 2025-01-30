"use strict";
$("#CircleForm").validate({


});


function CircleCalculation() {

    window.alert("Start of Calculations");
    if ($("#CircleForm").valid()) {}
    let radius;
    let diameter;
    let circumference;
    let radiusfp;
    let area;
    radius = document.getElementById("radius").value;
    radiusfp=parseFloat(radius)
    diameter = calculateDiameter(radiusfp);
    document.getElementById("diameter").innerHTML=diameter
    area = calculateArea(radiusfp);
    document.getElementById("area").innerHTML= area

    circumference = calculateCircumference(radiusfp);
    document.getElementById("circumference").innerHTML = circumference;
    let x=1;
}

function calculateDiameter(r) {
    return 2 * r;
}
function calculateCircumference(r) {

    return 2 * Math.PI * r
}

function calculateArea(r) {
    return Math.PI * r
}