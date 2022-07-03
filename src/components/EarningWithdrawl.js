import React from "react";
import Button from "./Button";

const EarningWithdrawl = () => {
	return (
		<>
			<div className="bg-gray-dark h-screen flex flex-col items-center">
				<div className="mt-16">
					<span className="font-bold text-white text-2xl">Withdrawl</span>
				</div>
				<div>
					<p className="text-white h-[20px] mt-2">Withdrawl your funds by cancelling the payment channel</p>
				</div>
				<div className="rounded-[15px] flex flex-col  p-[22px] gap-[20px] bg-white h-[220px] w-[420px] mt-16">
					<div>
						<span>Confirm Your Address : -</span>
					</div>
					<div className="bg-gray-light rounded-[12px] p-[8px]">
						<span>alice.ton</span>
					</div>
					<Button className="rounded-md bg-primary-dark text-gray-lightest h-[40px] mt-8">Send</Button>
				</div>
			</div>
		</>
	);
};

export default EarningWithdrawl;
