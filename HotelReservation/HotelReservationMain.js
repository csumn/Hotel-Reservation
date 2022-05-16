/*
Execution     : default node
purpose       : Program for Booking a Hotel ( Hotel Reservation System)
@description  : Take the details from user and book a hotel for the user
@file         : HotelReservastionMain.js
@version      : 1.0.0
@since        : 10-05-2022
*/

let callFunc = require('./HotelReservationBL');

callFunc.booking(callFunc.startProcess);
