// =====================================================
// CarJoy - Advanced Payment & Reservation System
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("======================================");
    console.log("CARJOY PAYMENT PAGE INITIALIZED");
    console.log("======================================");


    // =====================================================
    // HELPER FUNCTIONS
    // =====================================================

    function get(id) {
        return document.getElementById(id);
    }


    function setText(id, value) {

        const element = get(id);

        if (element) {
            element.textContent = value;
        } else {
            console.warn("Element not found:", id);
        }
    }


    function money(value) {

        const number = Number(value) || 0;

        return "₹" + number.toLocaleString("en-IN");
    }


    function parseAmount(value) {

        if (typeof value === "number") {
            return value;
        }

        if (typeof value === "string") {

            return Number(
                value.replace(/[₹,\s]/g, "")
            ) || 0;
        }

        return 0;
    }


    // =====================================================
    // LOAD LOCAL STORAGE
    // =====================================================

    let selectedCar = null;
    let booking = null;

    try {

        const savedCar =
            localStorage.getItem("selectedCar");

        const savedBooking =
            localStorage.getItem("booking");


        if (savedCar) {

            selectedCar =
                JSON.parse(savedCar);

        }


        if (savedBooking) {

            booking =
                JSON.parse(savedBooking);

        }

    } catch (error) {

        console.error(
            "Error reading localStorage:",
            error
        );

    }


    console.log("SELECTED CAR:");
    console.log(selectedCar);

    console.log("BOOKING:");
    console.log(booking);


    // =====================================================
    // CHECK CAR
    // =====================================================

    if (!selectedCar) {

        alert(
            "No car selected. Please select a car first."
        );

        window.location.href =
            "index.html";

        return;
    }


    // =====================================================
    // DISPLAY VEHICLE
    // =====================================================

    setText(
        "carName",
        selectedCar.name || "Selected Car"
    );


    setText(
        "carInfo",
        `${selectedCar.fuel || "Fuel"} • ` +
        `${selectedCar.transmission || "Transmission"} • ` +
        `${selectedCar.seats || "5"} Seats`
    );


    setText(
        "fuelDisplay",
        selectedCar.fuel || "Fuel"
    );


    setText(
        "transmissionDisplay",
        selectedCar.transmission || "Automatic"
    );


    setText(
        "seatsDisplay",
        `${selectedCar.seats || 5} Seats`
    );


    const carImage =
        get("carImage");


    if (carImage) {

        carImage.src =
            selectedCar.image || "";

        carImage.alt =
            selectedCar.name || "Selected car";

    }


    // =====================================================
    // PAYMENT SUMMARY CAR
    // =====================================================

    setText(
        "summaryCarName",
        selectedCar.name || "Selected Car"
    );


    setText(
        "summaryCarInfo",
        `${selectedCar.fuel || "Fuel"} • ` +
        `${selectedCar.transmission || "Transmission"} • ` +
        `${selectedCar.seats || "5"} Seats`
    );


    const summaryCarImage =
        get("summaryCarImage");


    if (summaryCarImage) {

        summaryCarImage.src =
            selectedCar.image || "";

        summaryCarImage.alt =
            selectedCar.name || "Selected car";

    }


    // =====================================================
    // BOOKING INFORMATION
    // =====================================================

    const rentalDays =
        Number(
            booking?.rentalDays
        ) || 1;


    const pickupDate =
        booking?.pickupDate || "";


    const returnDate =
        booking?.returnDate || "";


    console.log("Pickup:", pickupDate);
    console.log("Return:", returnDate);
    console.log("Rental Days:", rentalDays);


    // =====================================================
    // DISPLAY DATES
    // =====================================================

    setText(
        "pickupDisplay",
        pickupDate || "-"
    );


    setText(
        "returnDisplay",
        returnDate || "-"
    );


    setText(
        "daysDisplay",
        rentalDays +
        (rentalDays === 1 ? " Day" : " Days")
    );


    // Right side summary

    setText(
        "summaryPickup",
        pickupDate || "-"
    );


    setText(
        "summaryReturn",
        returnDate || "-"
    );


    setText(
        "summaryDays",
        rentalDays
    );


    // =====================================================
    // CALCULATE RENTAL
    // =====================================================

    const pricePerDay =
        parseAmount(
            selectedCar.price
        );


    const rentalAmount =
        pricePerDay * rentalDays;


    console.log("Price per day:", pricePerDay);
    console.log("Rental amount:", rentalAmount);


    // =====================================================
    // EXTRA SERVICES
    // =====================================================

    const gps =
        booking?.gps === true;


    const driver =
        booking?.driver === true;


    const insurance =
        booking?.insurance === true;


    const GPS_PRICE = 300;
    const DRIVER_PRICE = 1000;
    const INSURANCE_PRICE = 500;


    const gpsAmount =
        gps ? GPS_PRICE : 0;


    const driverAmount =
        driver ? DRIVER_PRICE : 0;


    const insuranceAmount =
        insurance ? INSURANCE_PRICE : 0;


    const extraServices =
        gpsAmount +
        driverAmount +
        insuranceAmount;


    console.log("GPS:", gps);
    console.log("Driver:", driver);
    console.log("Insurance:", insurance);
    console.log("Extra services:", extraServices);


    // =====================================================
    // TAX
    // =====================================================

    const taxableAmount =
        rentalAmount +
        extraServices;


    const tax =
        Math.round(
            taxableAmount * 0.18
        );


    // =====================================================
    // SERVICE FEE
    // =====================================================

    const serviceFee = 500;


    // =====================================================
    // TOTAL
    // =====================================================

    let subtotal =
        rentalAmount +
        extraServices;


    let grandTotal =
        subtotal +
        tax +
        serviceFee;


    let discount = 0;


    console.log("--------------------------------");
    console.log("PRICE PER DAY:", pricePerDay);
    console.log("RENTAL DAYS:", rentalDays);
    console.log("RENTAL:", rentalAmount);
    console.log("EXTRA SERVICES:", extraServices);
    console.log("TAX:", tax);
    console.log("SERVICE FEE:", serviceFee);
    console.log("TOTAL:", grandTotal);
    console.log("--------------------------------");


    // =====================================================
    // DISPLAY PRICES
    // =====================================================

    setText(
        "rentalAmount",
        money(rentalAmount)
    );


    setText(
        "serviceAmount",
        money(extraServices)
    );


    setText(
        "taxAmount",
        money(tax)
    );


    setText(
        "serviceFee",
        money(serviceFee)
    );


    setText(
        "grandTotal",
        money(grandTotal)
    );


    setText(
        "buttonAmount",
        money(grandTotal)
    );


    // =====================================================
    // PROMO CODE
    // =====================================================

    const promoInput =
        get("promoCode");


    const applyPromo =
        get("applyPromo");


    const promoMessage =
        get("promoMessage");


    if (applyPromo) {

        applyPromo.addEventListener(
            "click",
            function () {

                const code =
                    promoInput
                        ? promoInput.value
                            .trim()
                            .toUpperCase()
                        : "";


                // Reset if empty
                if (!code) {

                    if (promoMessage) {

                        promoMessage.textContent =
                            "Please enter a promo code.";

                        promoMessage.style.color =
                            "#dc3545";

                    }

                    return;
                }


                // Prevent applying twice
                if (discount > 0) {

                    if (promoMessage) {

                        promoMessage.textContent =
                            "Promo code is already applied.";

                    }

                    return;
                }


                // =================================================
                // CARJOY10
                // =================================================

                if (code === "CARJOY10") {

                    discount =
                        Math.round(
                            grandTotal * 0.10
                        );


                    grandTotal =
                        grandTotal - discount;


                    setText(
                        "grandTotal",
                        money(grandTotal)
                    );


                    setText(
                        "buttonAmount",
                        money(grandTotal)
                    );


                    if (promoMessage) {

                        promoMessage.textContent =
                            `✓ Promo applied! You saved ${money(discount)}.`;

                        promoMessage.style.color =
                            "#198754";

                    }


                    localStorage.setItem(
                        "promoDiscount",
                        JSON.stringify({

                            code: code,

                            discount: discount,

                            finalAmount: grandTotal

                        })
                    );


                } else {

                    if (promoMessage) {

                        promoMessage.textContent =
                            "Invalid promo code.";

                        promoMessage.style.color =
                            "#dc3545";

                    }

                }

            }
        );

    }


    // =====================================================
    // PAYMENT METHOD
    // =====================================================

    let paymentMethod = "card";

    let selectedBank = "";


    const paymentTabs =
        document.querySelectorAll(
            ".payment-tab"
        );


    const paymentPanels =
        document.querySelectorAll(
            ".payment-panel"
        );


    paymentTabs.forEach(function (tab) {

        tab.addEventListener(
            "click",
            function () {

                paymentTabs.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                paymentPanels.forEach(
                    function (panel) {

                        panel.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                paymentMethod =
                    this.dataset.method;


                const panel =
                    get(
                        paymentMethod +
                        "Panel"
                    );


                if (panel) {

                    panel.classList.add(
                        "active"
                    );

                }


                console.log(
                    "Payment method:",
                    paymentMethod
                );

            }
        );

    });


    // =====================================================
    // BANK SELECTION
    // =====================================================

    const bankItems =
        document.querySelectorAll(
            ".bank-item"
        );


    const selectedBankBox =
        get("selectedBank");


    bankItems.forEach(function (bank) {

        bank.addEventListener(
            "click",
            function () {

                bankItems.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                selectedBank =
                    this.dataset.bank;


                if (selectedBankBox) {

                    selectedBankBox.innerHTML = `
                        <i class="bi bi-check-circle-fill"></i>
                        <span>${selectedBank} selected</span>
                    `;

                }


                console.log(
                    "Selected bank:",
                    selectedBank
                );

            }
        );

    });


    // =====================================================
    // UPI VERIFICATION
    // =====================================================

    const verifyUpi =
        get("verifyUpi");


    let upiVerified = false;


    if (verifyUpi) {

        verifyUpi.addEventListener(
            "click",
            function () {

                const upiInput =
                    get("upiId");


                const upiStatus =
                    get("upiStatus");


                if (!upiInput || !upiStatus) {
                    return;
                }


                const upi =
                    upiInput.value
                        .trim()
                        .toLowerCase();


                if (!upi) {

                    upiVerified = false;

                    upiStatus.textContent =
                        "Please enter your UPI ID.";

                    upiStatus.style.color =
                        "#dc3545";

                    return;
                }


                const upiPattern =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;


                if (!upiPattern.test(upi)) {

                    upiVerified = false;

                    upiStatus.textContent =
                        "Invalid UPI ID. Example: name@upi";

                    upiStatus.style.color =
                        "#dc3545";

                    return;
                }


                upiVerified = true;


                upiStatus.textContent =
                    "✓ UPI ID verified successfully";

                upiStatus.style.color =
                    "#198754";


                localStorage.setItem(
                    "verifiedUPI",
                    upi
                );

            }
        );

    }


    // =====================================================
    // CARD INPUT
    // =====================================================

    const cardName =
        get("cardName");


    const cardNumber =
        get("cardNumber");


    const expiry =
        get("expiry");


    const cvv =
        get("cvv");


    const cardPreviewNumber =
        get("cardPreviewNumber");


    const cardPreviewName =
        get("cardPreviewName");


    const cardPreviewExpiry =
        get("cardPreviewExpiry");


    // Card holder

    if (cardName) {

        cardName.addEventListener(
            "input",
            function () {

                const value =
                    this.value.trim();


                if (cardPreviewName) {

                    cardPreviewName.textContent =
                        value ||
                        "YOUR NAME";

                }

            }
        );

    }


    // Card number

    if (cardNumber) {

        cardNumber.addEventListener(
            "input",
            function () {

                let value =
                    this.value
                        .replace(/\D/g, "")
                        .substring(0, 16);


                value =
                    value.replace(
                        /(.{4})/g,
                        "$1 "
                    )
                    .trim();


                this.value =
                    value;


                if (cardPreviewNumber) {

                    cardPreviewNumber.textContent =
                        value ||
                        "•••• •••• •••• ••••";

                }


                const cardBrand =
                    get("cardBrand");


                if (cardBrand) {

                    const digits =
                        value.replace(
                            /\s/g,
                            ""
                        );


                    if (
                        digits.startsWith("4")
                    ) {

                        cardBrand.textContent =
                            "VISA";

                    } else if (
                        /^5[1-5]/.test(digits)
                    ) {

                        cardBrand.textContent =
                            "MASTERCARD";

                    } else {

                        cardBrand.textContent =
                            "";

                    }

                }

            }
        );

    }


    // Expiry

    if (expiry) {

        expiry.addEventListener(
            "input",
            function () {

                let value =
                    this.value
                        .replace(/\D/g, "")
                        .substring(0, 4);


                if (value.length >= 3) {

                    value =
                        value.substring(0, 2) +
                        "/" +
                        value.substring(2);

                }


                this.value =
                    value;


                if (cardPreviewExpiry) {

                    cardPreviewExpiry.textContent =
                        value ||
                        "MM/YY";

                }

            }
        );

    }


    // CVV

    if (cvv) {

        cvv.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .replace(/\D/g, "")
                        .substring(0, 4);

            }
        );

    }


    // =====================================================
    // TOGGLE CVV
    // =====================================================

    const toggleCvv =
        get("toggleCvv");


    if (toggleCvv && cvv) {

        toggleCvv.addEventListener(
            "click",
            function () {

                if (
                    cvv.type === "password"
                ) {

                    cvv.type = "text";

                    this.innerHTML =
                        '<i class="bi bi-eye-slash"></i>';

                } else {

                    cvv.type = "password";

                    this.innerHTML =
                        '<i class="bi bi-eye"></i>';

                }

            }
        );

    }


    // =====================================================
    // BILLING INPUT


    const billingPhone =
        get("billingPhone");


    if (billingPhone) {

        billingPhone.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .replace(/\D/g, "")
                        .substring(0, 10);

            }
        );

    }


    const billingPin =
        get("billingPin");


    if (billingPin) {

        billingPin.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .replace(/\D/g, "")
                        .substring(0, 6);

            }
        );

    }


    // =====================================================
    // PAY BUTTON
    // =====================================================

    const payButton =
        get("payButton");


    if (!payButton) {

        console.error(
            "payButton not found."
        );

        return;
    }


    payButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            // =============================================
            // BILLING
            // =============================================

            const name =
                get("billingName")
                    ?.value.trim();


            const phone =
                get("billingPhone")
                    ?.value.trim();


            const email =
                get("billingEmail")
                    ?.value.trim();


            const city =
                get("billingCity")
                    ?.value.trim();


            const pin =
                get("billingPin")
                    ?.value.trim();


            const address =
                get("billingAddress")
                    ?.value.trim();


            // =============================================
            // VALIDATE BILLING
            // =============================================

            if (
                !name ||
                !phone ||
                !email ||
                !city ||
                !address
            ) {

                alert(
                    "Please complete all billing details."
                );

                return;
            }


            // Email

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            // Phone

            if (
                phone.length !== 10
            ) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;
            }


            // PIN

            if (
                pin &&
                pin.length !== 6
            ) {

                alert(
                    "Please enter a valid 6-digit PIN."
                );

                return;
            }


            // =============================================
            // TERMS
            // =============================================

            const terms =
                get("paymentTerms");


            if (
                terms &&
                !terms.checked
            ) {

                alert(
                    "Please agree to the Terms & Conditions."
                );

                return;
            }


            // =============================================
            // PAYMENT VALIDATION
            // =============================================

            if (paymentMethod === "card") {

                const cardHolder =
                    cardName?.value.trim();


                const cardDigits =
                    cardNumber?.value
                        .replace(/\D/g, "");


                const expiryValue =
                    expiry?.value.trim();


                const cvvValue =
                    cvv?.value.trim();


                if (
                    !cardHolder ||
                    !cardDigits ||
                    !expiryValue ||
                    !cvvValue
                ) {

                    alert(
                        "Please complete your card details."
                    );

                    return;
                }


                if (
                    cardDigits.length !== 16
                ) {

                    alert(
                        "Please enter a valid 16-digit card number."
                    );

                    return;
                }


                if (
                    !/^\d{2}\/\d{2}$/.test(
                        expiryValue
                    )
                ) {

                    alert(
                        "Please enter expiry as MM/YY."
                    );

                    return;
                }


                if (
                    cvvValue.length < 3
                ) {

                    alert(
                        "Please enter a valid CVV."
                    );

                    return;
                }

            }


            if (paymentMethod === "upi") {

                if (!upiVerified) {

                    alert(
                        "Please verify your UPI ID first."
                    );

                    return;
                }

            }


            if (paymentMethod === "bank") {

                if (!selectedBank) {

                    alert(
                        "Please select your bank."
                    );

                    return;
                }

            }


            // =============================================
            // GENERATE IDS
            // =============================================

            const timestamp =
                Date.now();


            const bookingId =
                "CJ-" +
                timestamp
                    .toString()
                    .slice(-8);


            const transactionId =
                "TXN-" +
                timestamp
                    .toString()
                    .slice(-10);


            const paymentDate =
                new Date();


            // =============================================
            // RESERVATION OBJECT
            // =============================================

            const reservation = {

                bookingId: bookingId,

                transactionId: transactionId,

                status: "Confirmed",

                paymentStatus: "Paid",


                car: {

                    name:
                        selectedCar.name,

                    image:
                        selectedCar.image,

                    fuel:
                        selectedCar.fuel,

                    transmission:
                        selectedCar.transmission,

                    seats:
                        selectedCar.seats,

                    pricePerDay:
                        pricePerDay

                },


                rental: {

                    pickupDate:
                        pickupDate,

                    returnDate:
                        returnDate,

                    rentalDays:
                        rentalDays

                },


                services: {

                    gps: gps,

                    driver: driver,

                    insurance: insurance

                },


                customer: {

                    name: name,

                    email: email,

                    phone: phone,

                    city: city,

                    pin: pin,

                    address: address

                },


                payment: {

                    method:
                        paymentMethod,

                    bank:
                        selectedBank,

                    rentalAmount:
                        rentalAmount,

                    extraServices:
                        extraServices,

                    tax:
                        tax,

                    serviceFee:
                        serviceFee,

                    discount:
                        discount,

                    totalAmount:
                        grandTotal,

                    paymentDate:
                        paymentDate.toLocaleString(
                            "en-IN"
                        )

                },


                reservationDate:
                    paymentDate.toLocaleString(
                        "en-IN"
                    )

            };


            // =============================================
            // SAVE RESERVATION
            // =============================================

            localStorage.setItem(
                "reservation",
                JSON.stringify(
                    reservation
                )
            );


            // =============================================
            // SAVE PAYMENT
            // =============================================

            localStorage.setItem(
                "payment",
                JSON.stringify({

                    bookingId:
                        bookingId,

                    transactionId:
                        transactionId,

                    customer:
                        name,

                    email:
                        email,

                    phone:
                        phone,

                    car:
                        selectedCar.name,

                    amount:
                        grandTotal,

                    paymentMethod:
                        paymentMethod,

                    status:
                        "Paid",

                    paymentDate:
                        paymentDate.toLocaleString(
                            "en-IN"
                        )

                })
            );


            // =============================================
            // RESERVATION HISTORY
            // =============================================

            let history = [];


            try {

                history =
                    JSON.parse(
                        localStorage.getItem(
                            "reservationHistory"
                        )
                    ) || [];

            } catch {

                history = [];

            }


            history.push(
                reservation
            );


            localStorage.setItem(
                "reservationHistory",
                JSON.stringify(
                    history
                )
            );


            localStorage.setItem(
                "bookingId",
                bookingId
            );


            // =============================================
            // PROCESSING MODAL
            // =============================================

            const processingModal =
                get("processingModal");


            if (
                processingModal &&
                typeof bootstrap !== "undefined"
            ) {

                const modal =
                    new bootstrap.Modal(
                        processingModal
                    );

                modal.show();

            }


            // Disable button

            this.disabled = true;


            this.innerHTML = `
                <span>
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Processing Payment...
                </span>

                <strong>
                    ${money(grandTotal)}
                </strong>
            `;


            console.log(
                "======================================"
            );

            console.log(
                "RESERVATION CREATED"
            );

            console.log(
                reservation
            );

            console.log(
                "======================================"
            );


            // =============================================
            // PAYMENT SIMULATION
            // =============================================

            setTimeout(
                function () {

                    window.location.href =
                        "success.html";

                },
                2500
            );

        }
    );


    // =====================================================
    // INITIAL DEBUG
    // =====================================================

    console.log(
        "✓ Vehicle loaded:",
        selectedCar.name
    );

    console.log(
        "✓ Price per day:",
        pricePerDay
    );

    console.log(
        "✓ Rental days:",
        rentalDays
    );

    console.log(
        "✓ Final amount:",
        grandTotal
    );

    console.log(
        "✓ Payment page ready"
    );

});