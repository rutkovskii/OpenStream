import React from "react";
import { useLocation } from "wouter";

const Receive = () => {
	const [location, setLocation] = useLocation();
	return (
		<>
			<div className="flex flex-col">
				<div className="flex flex-col items-center my-[40px] gap-[15px]">
					<h1 className="font-bold text-3xl">My Earnings</h1>
					<h2 className="font-thin text-black/40 text-xl">All your current earnings are shown here</h2>
				</div>
				<div className="flex justify-center items-start py-[64px] px-[20px] gap-[50px] cursor-pointer" onClick={() => setLocation("/myearnings/stream1")}>
					<div className="flex flex-col items-start p-[20px] gap-[16px] rounded-[12px] bg-white w-[325px] h-[185px]">
						<h2 className="font-normal text-2xl">Stream 1</h2>
						<div className="bg-gray-lightest rounded-[12px] p-4">
							<span>Bob.ton</span>
						</div>
						<div>
							<span className="text-black/40 text-xl">5.000 TON/mo</span>
						</div>
					</div>
					<div className="flex flex-col items-start p-[20px] gap-[16px] rounded-[12px] bg-white w-[325px] h-[185px]">
						<h2 className="font-normal text-2xl">Stream 1</h2>
						<div className="bg-gray-lightest rounded-[12px] p-4">
							<span>Bob.ton</span>
						</div>
						<div>
							<span className="text-black/40 text-xl">5.000 TON/mo</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Receive;
