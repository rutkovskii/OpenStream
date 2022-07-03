import React, { useContext, useEffect, useState } from "react";
import { Link } from "wouter";
import { ConnectWallet } from "../actions/actions";
import { store } from "../context/context";

import Button from "./Button";

const Header = () => {
	const { state, dispatch } = useContext(store);
	console.log(state);

	return (
		<>
			<div className="flex justify-between p-[16px] h-[60px] sticky top-0 bg-white">
				<Link href="/">
					<span className="font-bold text-lg">OpenStream</span>
				</Link>
				{!!state.address ? (
					<span className="truncate  w-[180px] cursor-pointer bg-primary-dark rounded-[12px] p-2 h-10 -mt-1">{state.address}</span>
				) : (
					<Button primary warning onClick={() => ConnectWallet(dispatch)}>
						Login
					</Button>
				)}
			</div>
		</>
	);
};

export default Header;
