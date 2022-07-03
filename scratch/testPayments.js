function changeSum(currentSum) {
    let time = '60000';
    let payment = (currentSum/time); //Ton(in Nano)/Min
    let timerId = setInterval(function() {
        if (currentSum > 0) {

            currentSum = currentSum - payment;

        }
        else if (currentSum == 0) {
            clearInterval(timerId);

        }
        console.log(currentSum);
        //Payment method here
    }, 2000);

}

changeSum(5000);