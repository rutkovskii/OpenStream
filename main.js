const channelA = tonweb.payments.createChannel({
    ...channelConfig,
    isA: true,
    myKeyPair: keyPairA,
    hisPublicKey: keyPairB.publicKey,
});

const channelAddress = await channelA.getAddress(); // address of this payment channel smart-contract in blockchain
console.log('channelAddress=', channelAddress.toString(true, true, true));

const fromWalletA = channelA.fromWallet({
    wallet: walletA,
    secretKey: keyPairA.secretKey
});

await fromWalletA.deploy().send(toNano('0.05'));

await fromWalletA
    .topUp({coinsA: channelInitState.balanceA, coinsB: new BN(0)})
    .send(channelInitState.balanceA.add(toNano('0.05'))) // +0.05 TON to network fees
    .init(channelInitState).send(toNano('0.05'));