// ========================================
// CarJoy Booking JS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Get selected car
    const savedCar = localStorage.getItem("selectedCar");

    console.log("BOOKING PAGE");
    console.log("Saved car:", savedCar);


    // ========================================
    // Check Car
    // ========================================

    if (!savedCar) {

        alert("No car selected. Please select a car first.");

        return;
    }


    // Convert JSON into object
    const selectedCar = JSON.parse(savedCar);

    console.log("Selected car on booking page:", selectedCar);


    // ========================================
    // Car Information
    // ========================================

    const carImage =
        document.getElementById("selectedCarImage");

    const carName =
        document.getElementById("selectedCarName");

    const carInfo =
        document.getElementById("selectedCarInfo");


    if (carImage) {

        carImage.src = selectedCar.image;

        carImage.alt = selectedCar.name;
    }


    if (carName) {

        carName.textContent =
            selectedCar.name;
    }


    if (carInfo) {

        carInfo.textContent =
            `${selectedCar.fuel} • ${selectedCar.transmission} • ${selectedCar.seats} Seats`;
    }


    // ========================================
    // Price
    // ========================================

    const pricePerDay =
        Number(selectedCar.price);

    console.log("Price per day:", pricePerDay);
    const pricePerDayElement =
    document.getElementById("pricePerDay");

    if (pricePerDayElement) {
        pricePerDayElement.textContent =
            "₹" + pricePerDay.toLocaleString() + " / Day";
    }


    // ========================================
    // Elements
    // ========================================

    const pickupDate =
        document.getElementById("pickupDate");

    const returnDate =
        document.getElementById("returnDate");

    const gps =
        document.getElementById("gps");

    const driver =
        document.getElementById("driver");

    const insurance =
        document.getElementById("insurance");

    const days =
        document.getElementById("days");

    const gpsPrice =
        document.getElementById("gpsPrice");

    const driverPrice =
        document.getElementById("driverPrice");

    const insurancePrice =
        document.getElementById("insurancePrice");

    const totalPrice =
        document.getElementById("totalPrice");

    const continueBtn =
        document.getElementById("continueBtn");

    const agree =
        document.getElementById("agree");


    // ========================================
    // Service Prices
    // ========================================

    const gpsCost = 300;
    const driverCost = 1000;
    const insuranceCost = 500;


    // ========================================
    // Set Minimum Date
    // ========================================

    const today =
        new Date().toISOString().split("T")[0];

    pickupDate.min = today;
    returnDate.min = today;


    // ========================================
    // Calculate Total
    // ========================================

    function calculateTotal() {

        let rentalDays = 1;


        if (
            pickupDate.value &&
            returnDate.value
        ) {

            const start =
                new Date(pickupDate.value);

            const end =
                new Date(returnDate.value);

            const difference =
                end - start;

            rentalDays =
                Math.ceil(
                    difference /
                    (1000 * 60 * 60 * 24)
                );

            if (rentalDays < 1) {

                rentalDays = 1;
            }
        }


        // Base price
        let total =
            pricePerDay * rentalDays;


        // Rental days
        days.textContent =
            rentalDays + " Day(s)";


        // ========================================
        // GPS
        // ========================================

        if (gps.checked) {

            total += gpsCost;

            gpsPrice.textContent =
                "₹" + gpsCost.toLocaleString();

        } else {

            gpsPrice.textContent =
                "₹0";
        }


        // ========================================
        // Driver
        // ========================================

        if (driver.checked) {

            total += driverCost;

            driverPrice.textContent =
                "₹" + driverCost.toLocaleString();

        } else {

            driverPrice.textContent =
                "₹0";
        }


        // ========================================
        // Insurance
        // ========================================

        if (insurance.checked) {

            total += insuranceCost;

            insurancePrice.textContent =
                "₹" + insuranceCost.toLocaleString();

        } else {

            insurancePrice.textContent =
                "₹0";
        }


        // ========================================
        // Final Total
        // ========================================

        totalPrice.textContent =
            "₹" + total.toLocaleString();


        return {
            rentalDays: rentalDays,
            total: total
        };
    }


    // ========================================
    // Events
    // ========================================

    pickupDate.addEventListener(
        "change",
        calculateTotal
    );

    returnDate.addEventListener(
        "change",
        calculateTotal
    );

    gps.addEventListener(
        "change",
        calculateTotal
    );

    driver.addEventListener(
        "change",
        calculateTotal
    );

    insurance.addEventListener(
        "change",
        calculateTotal
    );


    // ========================================
    // Continue To Payment
    // ========================================

    continueBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            // Check dates
            if (
                !pickupDate.value ||
                !returnDate.value
            ) {

                alert(
                    "Please select Pickup and Return dates."
                );

                return;
            }


            // Check terms
            if (!agree.checked) {

                alert(
                    "Please accept the Terms & Conditions."
                );

                return;
            }


            // Calculate
            const result =
                calculateTotal();


            // ========================================
            // Booking Data
            // ========================================

            const booking = {

                car: selectedCar.name,

                pricePerDay:
                    pricePerDay,

                pickupDate:
                    pickupDate.value,

                returnDate:
                    returnDate.value,

                rentalDays:
                    result.rentalDays,

                gps:
                    gps.checked,

                driver:
                    driver.checked,

                insurance:
                    insurance.checked,

                totalAmount:
                    result.total

            };


            console.log(
                "Final booking:",
                booking
            );


            // Save booking
            localStorage.setItem(
                "booking",
                JSON.stringify(booking)
            );


            // Go payment
            window.location.href =
                "payment.html";
        }
    );


    // ========================================
    // Initial Calculation
    // ========================================

    calculateTotal();

});