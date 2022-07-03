import { toast } from "react-toastify";
export const ConnectWallet = async (dispatch) => {
	if (!!window.ton) {
		const provider = window.ton;
		console.log("isTonWallet=", provider.isTonWallet);
		const accounts = await provider.send("ton_requestAccounts");
		console.log(accounts);
		// Accounts now exposed, use them
		const account = accounts[0]; // We currently only ever provide a single account,
		// but the array gives us some room to grow.
		dispatch({ type: "SET_WALLET_ADDRESS", data: account });
		toast.success("wallet is connected");
		console.log(await provider.send("ton_requestWallets"));

		provider.on("accountsChanged", function (accounts) {
			console.log("accountsChanged", accounts);
			const account = accounts[0];
			showAccountAddress(account);
		});
	} else toast.error("Please install TonWallet");
};
