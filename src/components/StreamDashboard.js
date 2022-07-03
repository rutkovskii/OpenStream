import React from "react";

import { ReactComponent as Pencil } from "../svg/pencil.svg";

const StreamDashboard = () => {
	return (
		<>
			<div className="flex flex-col justify-center items-center">
				<div className="flex-col items-center h-[270px] mt-8  gap-[10px] w-[600px]">
					<h1 className="font-bold text-3xl text-center">Stream 1’s Dashboard</h1>
					<h2 className="text-black/40 font-thin mt-4 text-center">
						<span>Here’s your stream dashboard — make sure you have enough funds in the pool, otherwise top up the pool. You can also cancel the stream at any time.</span>
					</h2>
				</div>
				<div className="flex-col bg-white rounded-[12px] w-[450px] h-[250px] p-[15px]">
					<div className="flex justify-between gap-[10px]">
						<div className="flex gap-[25px]">
							<h2 className="text-2xl">Stream 1</h2>
							<div className="cursor-pointer">
								<Pencil className="w-5 h-5 mt-1" />
							</div>
						</div>
						<div className="text-danger p-[8px] bg-red-200 rounded-[12px] cursor-pointer">Cancel Stream</div>
					</div>
					<div className="flex justify-between mr-6 mt-6">
						<div className="flex-col">
							<div className="px-[10px]">
								<span>alice.ton</span>
							</div>
							<div className="border-2 flex-col h-[100px] w-[164px] mt-5 rounded-[10px] p-[10px]">
								<div className="text-2xl">Pool</div>
								<br />
								<div>4.049 TON</div>
							</div>
						</div>
						<div>
							<div>5,000.00 TON/mo</div>
							<div className="text-2xl mt-5">Streamed</div>

							<span className="text-black/40">951 Ton</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StreamDashboard;
