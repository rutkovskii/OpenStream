function changeSum(currentSum) {
    let time = '60000';
    let payment = (currentSum/time);
    let timerId = setInterval(function() {
        if (currentSum > 0) {

            currentSum = currentSum - payment;

        }
        else if (currentSum == 0) {
            clearInterval(timerId);

        }
        console.log(currentSum);
    }, 60000);

}
changeSum(5000);