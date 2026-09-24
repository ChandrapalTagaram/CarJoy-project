document.addEventListener("DOMContentLoaded", function () {

    const bookButtons = document.querySelectorAll(".book");

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCar = {
                name: this.dataset.name,
                price: Number(this.dataset.price),
                fuel: this.dataset.fuel,
                transmission: this.dataset.transmission,
                seats: Number(this.dataset.seats),
                image: this.dataset.image
            };

            console.log("Selected car:", selectedCar);

            // Save selected car
            localStorage.setItem(
                "selectedCar",
                JSON.stringify(selectedCar)
            );

            // Go to booking page
            window.location.href = "booking.html";
        });

    });

});