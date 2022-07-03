const TonWeb = require("tonweb");


function changeSum(currentSum) {
    console.log("Paying...")
    let stepBalanceA;
    let stepBalanceB;
    let channelState;
    let interval = '60000'; // minute
    let payment = currentSum/interval; //NanoTon/Min
    let newCurrentSum;
    let data;

    stillPaying = true

    while (stillPaying) {
        newCurrentSum = currentSum - payment;

        if (newCurrentSum > 0) {
            currentSum = newCurrentSum
            data = channelA.getData();
            stepBalanceA = new BN(BalA).sub(payment); // Check whether TotoNano(toNano(Ton/Min)) changes anything
            stepBalanceB = new BN(BalB).add(payment);
            channelState = makeStreamPayments(stepBalanceA,stepBalanceB,2,0);

        } else if (newCurrentSum === 0) {
            // Create final state -- incroment both segno's
            channelState = makeStreamPayments(stepBalanceA,stepBalanceB,2,2);
            stillPaying = false
            return channelState

        } else {
            // less than 0
            // for now just assume `newCurrentSum` never becomes less than zero
            channelState = makeStreamPayments(stepBalanceA,stepBalanceB,2,2);
            stillPaying = false
            return channelState
        }
        await new Promise((resolve) => setTimeout(() => resolve(),5000)); // for minute its 6000

        }
    }

    let timerId = setInterval(function() {
            if (currentSum > 0) {
                currentSum = currentSum - payment;
            }
            else if (currentSum == 0) {
                clearInterval(timerId);
                // Create final state
                channelState = makeStreamPayments(stepBalanceA,stepBalanceB,2,2);
                return channelState
            }

            console.log(typeof payment)
            stepBalanceA = new BN(BalA).sub(payment); // Check whether TotoNano(toNano(Ton/Min)) changes anything
            stepBalanceB = new BN(BalB).add(payment);
            channelState = makeStreamPayments(stepBalanceA,stepBalanceB,2,0);

            console.log('Amount left to pay:', currentSum);
        }, 5000); //60000 ms = 1 min; 5000 = 5 sec;

    // return channelState   ---- Must implement
}


async function getStateInit() {
    console.log("Getting state after Init...")

    didntGotState = true

    while (didntGotState) {
        try {
            const stateInit = await channelA.getChannelState();
            console.log("Got state:", stateInit)
            if (stateInit === TonWeb.payments.PaymentChannel.STATE_OPEN) {
                console.log("Got state:", stateInit)
                didntGotState = false
                return stateInit
            }
            await new Promise((resolve) => setTimeout(() => resolve(), 5000))
        } catch {
            await new Promise((resolve) => setTimeout(() => resolve(), 5000))
        }
    }


}// let amount = 15;
// let int_finalBalanceA = new BN(BalA).sub(toNano(amount));
// let int_finalBalanceB = new BN(BalB).add(toNano(amount));
//
//
// // let amount = '15';
// // let int_finalBalanceA = new BN(BalA).sub(toNano(amount));
// // let int_finalBalanceB = new BN(BalB).add(toNano(amount));
//
// const channelState1 = {
//     balanceA: toNano(int_finalBalanceA.toString()),
//     balanceB: toNano(int_finalBalanceB.toString()),
//     seqnoA: new BN(segA).add(new BN(2)),
//     seqnoB: new BN(segB).add(new BN(0))
// };
//
//
// //---------------------------- Signing the Transaction ----------------------------
// const signatureA1 = await channelA.signState(channelState1);
// if (!(await channelB.verifyState(channelState1, signatureA1))) {
//     throw new Error('Invalid A signature');
// }
// let signatureB1 = await channelB.signState(channelState1);
//
//
// //---------------------------- Prior to Closure Transaction ----------------------------
//
// data = await channelA.getData();
// segA = data.seqnoA.toString();
// segB = data.seqnoB.toString();
//
// // For final transaction balance does not change
// const channelState2 = {
//     balanceA: toNano(int_finalBalanceA.toString()),
//     balanceB: toNano(int_finalBalanceB.toString()),
//     seqnoA: new BN(segA).add(new BN(2)),
//     seqnoB: new BN(segB).add(new BN(2))
// };
//
// const signatureA2 = await channelA.signState(channelState2);
// if (!(await channelB.verifyState(channelState2, signatureA2))) {
//     throw new Error('Invalid A signature');
// }
// const signatureB2 = await channelB.signState(channelState2);

// get Ton/min
// function changeSum(currentSum) {
//     let stepBalanceA;
//     let stepBalanceB;
//     let channelState;
//     let interval = '60000'; // minute
//     let payment = currentSum/interval; //NanoTon/Min
//     let timerId = setInterval(function() {
//         if (currentSum > 0) {
//             currentSum = currentSum - payment;
//         }
//         else if (currentSum == 0) {
//             clearInterval(timerId);
//             // Create final state
//             channelState = makeStreamPayments(stepBalanceA,stepBalanceB,2,2);
//             return channelState
//         };
//
//         console.log(typeof payment)
//         let data = await channelA.getData();
//         stepBalanceA = new BN(data.balanceA.toString()).sub(payment); // Check whether TotoNano(toNano(Ton/Min)) changes anything
//         stepBalanceB = new BN(data.balanceB.toString()).add(payment);
//         channelState = makeStreamPayments(stepBalanceA,stepBalanceB,2,0);
//
//         console.log('Amount left to pay:', currentSum);
//     }, 5000); //60000 ms = 1 min; 5000 = 5 sec;
//
//     // return channelState   ---- Must implement
// }