
/*
@param string .......
*/

let callObject = require('./HotelReservation.json');
let read = require('readline-sync');

listOfHotels = () => {
  console.log("\n*** Here are the list of Hotels *** \n");
  callObject.Hotels.forEach(hotel => {
    console.log(hotel.Name);
  })
};

selectedHotel = () => {
  let confirmation;
  let conditon1 = false;
  let condition2 = false;
  let HotelName = read.question('\nWhich Hotel would you like to select from the above Hotels ?\n');
  callObject.Hotels.forEach(hotel => {
    if (hotel.Name == HotelName) {
      conditon1 = true;
      console.log(`\nYou have selected Hotel ${HotelName}\n`);
      console.log("\nHere are the details and facilites of the Hotel\n");
      let stringData = JSON.stringify(hotel);
      console.log(stringData);
      confirmation = read.question(`\nWould you like to go with Hotel ${HotelName} or search for other hotels ?\n\nPress 1 to book the Hotel ${HotelName}\n\nPress any key to check for other hotels\n`);
    }
  })
  if (conditon1 == false) {
    console.log(`\nSorry, No such Hotel Found in list\n`);
  }
  if (confirmation == "1") {
    condition2 = true;
  }
  if (condition2) {
    return HotelName;
  } else {
    booking(startProcess)
  }
}

features = (hotelName) => {
  callObject.Hotels.forEach(hotel => {
    if (hotel.Name == hotelName) {
      console.log(`     Total Rooms in Hotel are : ` + hotel['Room Count']);
      console.log(`     Location of the Hotel are : ` + hotel.Location);
      console.log(`     Free Internet : ` + hotel['Free Internet']);
      console.log(`     Air Conditioning : ` + hotel['Air Conditioning']);
      console.log(`     Power Back up : ` + hotel['Power-Backup']);
      console.log(`     Doctor on call : ` + hotel['Doctor on call']);
      console.log(`     Check-In Time is : ` + hotel['Check-in time']);
      console.log(`     Check-Out Time is : ` + hotel['Check-out time']);
      console.log(`     Price for One Night : ` + hotel.Price);
      console.log(`     Max 2 x Guests, 1 x Room\n`);
    }
  })
};

searchRoom = (hotelName) => {
  callObject.Hotels.forEach(hotel => {
    if (hotel.Name === hotelName) {
      let roomCount = hotel['Room Count'];
      let room1 = Math.floor((Math.random() * roomCount) + 1);
      let room2 = Math.floor((Math.random() * roomCount) + 1);
      if (room1 != room2) {
        selectedRoom(hotelName, room1, room2);
      } else {
        searchRoom(hotelName);
      }
    }
  })
};

selectedRoom = (hotelName, room1, room2) => {
  console.log(`\n     Available Rooms no's are ${room1} and ${room2}\n`);
  let selectedRoomNumber = read.question(`\nWhich room would you like to select from above ?\n`);
  if (selectedRoomNumber == room1 || selectedRoomNumber == room2) {
    console.log(`\nYou have selected Room No : ${selectedRoomNumber}\n`);
  } else {
    console.log(`Sorry, Room is already occupied`);
    searchRoom(hotelName);
  }
};

ifHotelSelectedGoToCheckinFunction = (hotelName) => {
  callObject.Hotels.forEach(hotel => {
    if (hotel.Name == hotelName) {
      console.log("\n***** Please check the below details *****\n");
      features(hotelName);
    }
  })
};

checkInDate = () => {
  let condition1 = false;
  let timeStamp = new Date().getTime();
  let yesterdayTimeStamp = timeStamp - 24 * 60 * 60 * 1000;
  let yesterdayDate = new Date(yesterdayTimeStamp)
  let checkIn = read.question(`\nWhen would you like to CheckIn to Hotel     -> YYYY-MM-DD :  `)
  let inDate = new Date(checkIn);
  if (inDate.getTime() >= yesterdayDate.getTime()) {
    condition1 = true;
    return inDate;
  }
  if (condition1 == false) {
    console.log("Here checkIn is flase");
    checkInDate();
  }
}

checkOutDate = (checkInDateOfCustomer) => {
  let conditon2 = false;
  let checkOut = read.question(`\nWhen would you like to checkOut from Hotel -> YYYY-MM-DD :   `)
  let outDate = new Date(checkOut)
  console.log(outDate);
  if (outDate.getTime() >= checkInDateOfCustomer.getTime()) {
    conditon2 = true;
    return outDate;
  }
  if (conditon2 == false) {
    checkOutDate(checkInDateOfCustomer)
  }
}

paymentSummary = (HotelName, checkInDateOfCustomer, checkOutDateOfCustomer) => {
  const discounts = 2000;
  const taxes = 1500; callObject.Hotels.forEach(hotel => {
    if (hotel.Name == HotelName) {
      let priceOfTheHotel = parseInt(hotel.Price);
      const diffInMs = Math.abs(checkOutDateOfCustomer - checkInDateOfCustomer);
      let numberOfDays = diffInMs / (1000 * 3600 * 24);
      if (numberOfDays == 0) {
        numberOfDays = 1;
      }
      console.log(`\n     Here is the Price Summary\n\n     Hotel Price per night is : ${hotel.Price}\n     For ${numberOfDays} days : ${hotel.Price} * ${numberOfDays}`);
      console.log(`     Taxes & Fees : ${taxes}\n     Total Discounts : ${discounts}`);
      let payableAmount = ((numberOfDays * priceOfTheHotel) + taxes - discounts);
      console.log(`\n     Total Amount Payable Now is ${payableAmount}\n`);
      console.log("\n**Customer Payed the Amount**\n");
      console.log("\nDone! Hotel Room Booked Sucessfully \n");
    }
  })
};

startProcess = () => {
  let HotelName = selectedHotel();
  ifHotelSelectedGoToCheckinFunction(HotelName);
  searchRoom(HotelName);
  let checkInDateOfCustomer = checkInDate();
  let checkOutDateOfCustomer = checkOutDate(checkInDateOfCustomer);
  paymentSummary(HotelName, checkInDateOfCustomer, checkOutDateOfCustomer)
};

booking = (startProcess) => {
  listOfHotels();
  startProcess();
};

module.exports = { booking, startProcess }






























// startProcess = () => {
//   let hotelName = selectedHotel();
//   ifHotelSelectedGoToCheckinFunction(hotelName);
//   searchRoom(hotelName);
//   guestDetails(hotelName);
//   PaymentDetails(hotelName);
// }

// booking = (startProcess) => {
//   listOfHotels();
//   startProcess();
// };

// else {
//   searchRoom(hotelName);
// }
// chek_In_Time = () => {
//   const dateAndTime = read.question(`\nEnter the date when you would like to checkin yyyy-dd-mm HH-MM-SS : \n`);
//   var mydate = new Date(dateAndTime[0], dateAndTime[1] - 1, dateAndTime[2]);
//   console.log(mydate.toDateString());
//   console.log(`Hotel Booked at ${mydate}`);
// }

// ifHotelSelectedGoToCheckinFunction = (hotelName) => {
//   callObject.Hotels.forEach(hotel => {
//     if (hotel.Name == hotelName) {
//       console.log("\n*****Kindly Enter the details*****\n");
//       chek_In_Time();
//     }
//   })
// }

// booking = (StartProcess) => {
//   setTimeout(() => {
//     listOfHotels();
//     StartProcess();
//   }, 2000)
// };

// StartProcess = () => {
//   setTimeout(() => {
//     let hotelName = selectedHotel();
//     setTimeout(() => {
//       ifHotelSelectedGoToCheckinFunction(hotelName);
//     }, 1000)
//   }, 3000)
// }

