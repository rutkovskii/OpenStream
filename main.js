const TonWeb = require("tonweb");
const BN = TonWeb.utils.BN;

const toNano = TonWeb.utils.toNano;
const fromNano = TonWeb.utils.fromNano;

const init = async () => {
    const providerUrl = 'https://testnet.toncenter.com/api/v2/jsonRPC'; // TON HTTP API url. Use this url for testnet
    const apiKey = '6283e3289b031abaccff45dad6da451fd41adeb3367f44af184bf778bf3085b8'; // Obtain your API key in https://t.me/tontestnetapibot
    const tonweb = new TonWeb(new TonWeb.HttpProvider(providerUrl, {apiKey})); // Initialize TON SDK


    //---------------------------- Initialize seeds ----------------------------
    const seedA = TonWeb.utils.base64ToBytes('WFIYBf/byhLQuybaeEwhyFM7YFbcWxOoCfviff+B1K8='); // A's private (secret) key
    const keyPairA = tonweb.utils.keyPairFromSeed(seedA); // Obtain key pair (public key and private key)

    const seedB = TonWeb.utils.base64ToBytes('mQbes5CpgWSb2++4WG/sbhPWlFBJQH8gtxtmTxh5/Uo='); // B's private (secret) key
    const keyPairB = tonweb.utils.keyPairFromSeed(seedB); // Obtain key pair (public key and private key)

    console.log()

    //---------------------------- Create Wallet Objects ---------------------------
    const walletA = tonweb.wallet.create({
        publicKey: keyPairA.publicKey
    });
    const walletAddressA = await walletA.getAddress(); // address of this wallet in blockchain
    console.log('walletAddressA = ', walletAddressA.toString(true, true, true));

    const walletB = tonweb.wallet.create({
        publicKey: keyPairB.publicKey
    });
    const walletAddressB = await walletB.getAddress(); // address of this wallet in blockchain
    console.log('walletAddressB = ', walletAddressB.toString(true, true, true));


    // Get Balance
    let walletBalanceA = await tonweb.getBalance(walletAddressA.toString(true, true, true))
    let walletBalanceB = await tonweb.getBalance(walletAddressB.toString(true, true, true))
    console.log()
    console.log('Original walletA balance: ',fromNano(walletBalanceA));
    console.log('Original walletB balance: ',fromNano(walletBalanceB));
    console.log()


    //---------------------------- Payment Channel Set Up ----------------------------
    const channelInitState = {
        balanceA: toNano('3'), // A's initial balance in Toncoins. Next A will need to make a top-up for this amount
        balanceB: toNano('1'), // B's initial balance in Toncoins. Next B will need to make a top-up for this amount
        seqnoA: new BN(0), // initially 0
        seqnoB: new BN(0)  // initially 0
    };

    const channelConfig = {
        channelId: new BN(150), // new BN(~~(Date.now() / 1000)), // Channel ID, for each new channel there must be a new ID
        addressA: walletAddressA, // A's funds will be withdrawn to this wallet address after the channel is closed
        addressB: walletAddressB, // B's funds will be withdrawn to this wallet address after the channel is closed
        initBalanceA: channelInitState.balanceA,
        initBalanceB: channelInitState.balanceB
    }

    // Each on their side creates a payment channel object with this configuration

    const channelA = tonweb.payments.createChannel({
        ...channelConfig,
        isA: true,
        myKeyPair: keyPairA,
        hisPublicKey: keyPairB.publicKey,
    });
    const channelAddress = await channelA.getAddress(); // address of this payment channel smart-contract in blockchain
    console.log('channelAddress=', channelAddress.toString(true, true, true));

    const channelB = tonweb.payments.createChannel({
        ...channelConfig,
        isA: false,
        myKeyPair: keyPairB,
        hisPublicKey: keyPairA.publicKey,
    });

    if ((await channelB.getAddress()).toString() !== channelAddress.toString()) {
        throw new Error('Channels address not same');
    }


    //---------------------------- Helper methods ----------------------------

    const fromWalletA = channelA.fromWallet({
        wallet: walletA,
        secretKey: keyPairA.secretKey
    });

    const fromWalletB = channelB.fromWallet({
        wallet: walletB,
        secretKey: keyPairB.secretKey
    });


    //---------------------------- Deploy Channel ----------------------------
    await fromWalletA.deploy().send(toNano('0.1'));

    // To check you can use blockchain explorer https://testnet.tonscan.org/address/<CHANNEL_ADDRESS>
    // We can also call get methods on the channel (it's free) to get its current data.


    //---------------------------- Wait for Channel Creation ----------------------------

    async function getStateDeploy() {
        console.log("Getting state after deploy...")

        didntGotState = true

        while (didntGotState) {
            try {
                const stateDeploy = await channelA.getChannelState();
                console.log("Got state!", stateDeploy)
                didntGotState = false
                return stateDeploy
            } catch {
                await new Promise((resolve) => setTimeout(() => resolve(), 5000))
            }
        }
    }

    let state = await getStateDeploy()
    console.log(state)

    let data = await channelA.getData();
    console.log('balanceA = ', data.balanceA.toString())
    console.log('balanceB = ', data.balanceB.toString())
    console.log('seqnoA', data.seqnoA.toString())
    console.log('seqnoB', data.seqnoA.toString())


    //---------------------------- Top Up and Waiting for Funds to Arrive ----------------------------
    // await fromWalletA
    //     .topUp({coinsA: channelInitState.balanceA, coinsB: new BN(0)})
    //     .send(channelInitState.balanceA.add(toNano('0.1'))); // +0.05 TON to network fees
    //
    // await fromWalletB
    //     .topUp({coinsA: new BN(0), coinsB: channelInitState.balanceB})
    //     .send(channelInitState.balanceB.add(toNano('0.1'))); // +0.05 TON to network fees


    async function getBalanceDeploy() {
        console.log("Getting Balance after deploy...")

        didntGotState = true

        while (didntGotState) {
            try {
                let data = await channelA.getData();
                if (data.balanceA.toString() === channelInitState.balanceA.toString() &&
                    data.balanceB.toString() === channelInitState.balanceB.toString()) {
                    console.log("Coins Received!", data.balanceA.toString(), data.balanceB.toString())
                    didntGotState = false
                }
                // should comment it out when example would start working
                else {
                    console.log(data.balanceA.toString())
                    console.log(data.balanceB.toString())
                    console.log()
                }
                await new Promise((resolve) => setTimeout(() => resolve(), 5000))
            } catch {
                await new Promise((resolve) => setTimeout(() => resolve(), 5000))
            }
        }
    }
    await getBalanceDeploy()


    //---------------------------- Init Channel and Wait for Init to finish ----------------------------

    await fromWalletA.init(channelInitState).send(toNano('0.1'));


    // wait for state from Channel
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
    }
    state = await getStateInit();
    console.log(state);


    //---------------------------- See Balance and Seqno's Prior to 1st Transaction ----------------------------

    console.log('See Balance and Seqno\'s Prior to 1st Transaction')
    data = await channelA.getData();
    BalA = data.balanceA.toString();
    BalB = data.balanceB.toString();
    segA = data.seqnoA.toString();
    segB = data.seqnoB.toString();

    console.log('balanceA = ', BalA);
    console.log('balanceB = ', BalB);
    console.log('seqnoA', segA);
    console.log('seqnoB', segB);
    console.log()


    //---------------------------- Make Streaming Payments ----------------------------
    function createChannelState(updatedBalanceA,updatedBalanceB,seqnoA_incr,seqnoB_incr) {
        let channelState = {
            balanceA: toNano(updatedBalanceA.toString()),
            balanceB: toNano(updatedBalanceB.toString()),
            seqnoA: new BN(segA).add(new BN(seqnoA_incr)), //2
            seqnoB: new BN(segB).add(new BN(seqnoB_incr))  //0
        };
        return channelState
    }

    async function makeStreamPayments(updatedBalanceA,updatedBalanceB,seqnoA_incr,seqnoB_incr) {
        let channelState = createChannelState(updatedBalanceA, updatedBalanceB, seqnoA_incr, seqnoB_incr)

        let signatureA1 = await channelA.signState(channelState);
        if (!(await channelB.verifyState(channelState, signatureA1))) {
            throw new Error('Invalid A signature');
        }

        let signatureB1 = await channelB.signState(channelState);

        return channelState
    }

    // get Ton/min
    function changeSum(currentSum) {
        let stepBalanceA;
        let stepBalanceB;
        let channelState;
        let interval = '60000'; // minute
        let payment = currentSum/interval; //NanoTon/Min
        let timerId = setInterval(
            function() {
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

    let monthlyStreamingAmount = '2';
    let monthlyStreamingAmountNano = toNano(monthlyStreamingAmount)
    let channelState = await changeSum(monthlyStreamingAmountNano);


    // let amount = 15;
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

    //---------------------------- Closure of Channel ----------------------------

    const signatureCloseB = await channelB.signClose(channelState);

    // A verifies and signs this closing message and include B's signature

    // A sends closing message to blockchain, payments channel smart contract
    // Payment channel smart contract will send funds to participants according to the balances of the sent state.

    if (!(await channelA.verifyClose(channelState, signatureCloseB))) {
        throw new Error('Invalid B signature');
    }

    await fromWalletA.close({
        ...channelState,
        hisSignature: signatureCloseB
    }).send(toNano('0.06'));



    // wait for state from Channel
    async function getStateFinal() {
        console.log("Getting state after Close...")

        didntGotState = true

        while (didntGotState) {
            try {
                const stateInit = await channelA.getChannelState();
                console.log("Got state:", stateInit)
                let data = await channelA.getData();
                console.log('balanceA = ', data.balanceA.toString())
                console.log('balanceB = ', data.balanceB.toString())
                segA = data.seqnoA.toString();
                segB = data.seqnoB.toString();
                console.log('seqnoA', segA);
                console.log('seqnoB', segB);
                if (stateInit === 0) {
                    console.log("Got state!", stateInit)
                    didntGotState = false
                    return stateInit
                }
                await new Promise((resolve) => setTimeout(() => resolve(), 5000))
            } catch {
                await new Promise((resolve) => setTimeout(() => resolve(), 5000))
            }
        }
    }
    state = await getStateFinal()
    console.log(state)


    data = await channelA.getData();;
    console.log('seqnoA', data.seqnoA.toString());
    console.log('seqnoB', data.seqnoB.toString());

    console.log('Final Balances:')
    walletBalanceA = await tonweb.getBalance(walletAddressA.toString(true, true, true))
    walletBalanceB = await tonweb.getBalance(walletAddressB.toString(true, true, true))

    await new Promise(r => setTimeout(r, 5000));

    console.log()
    console.log('Final walletA balance: ',fromNano(walletBalanceA));
    console.log('Final walletB balance: ',fromNano(walletBalanceB));
    console.log('End')
}

// let currentSum ='2000';
// let interval = '60000'; // minute
//
// let payment = toNano(currentSum)/interval;
//
// // let payment = (toNano((currentSum/interval).toString()));
// console.log(payment)

init();