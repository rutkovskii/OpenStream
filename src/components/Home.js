import React from "react";
import { useLocation } from "wouter";

import Button from "./Button";

const Home = () => {
	const [location, setLocation] = useLocation();
	console.log(location);
	return (
		<>
			<div className="flex flex-col">
				<img
					src="https://s3-alpha-sig.figma.com/img/fb68/5ec1/1b06bd1f993de525d2032f06cc6c0f80?Expires=1657497600&Signature=duqJX8SlSPwwLk36L7R4go8ggYIpTLzEcVpOqH7tP-AO6RivkdceLR7-gmUdNM38A-kSiJn6hZ0nLyweRZYY87e0IfRCGhYKxf7ovXJYI6YbF2zIQMhZQcG6JT6ET~4FfE8Pcx2ZNQwrvYRNj68eNMrFzboJrLNL7ERX0Tr3t5a3h4ulY3YpYfLSEIipvr9jBFSlKv5Pwx8v-n5nAGU7nMCqfoA-cEeBkM9qfoSbuNmYIFmpajkL2V~vnO~NMM9jWkXJ6FZSrqlOB~102NQ-MfjY6WY4Eh4GDmDtDF26O2q~ILA6DQcZCOSqrVXl8Qc42U17-uEenwlAbvmTP30wKw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
					className=" h-[200px] w-[200px] self-center"
				/>
				<div className="flex justify-around">
					<div className="font-bold text-3xl leading-10 text-center">
						<div>
							Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-success">OpenStream</span>
						</div>
						<p className="font-normal text-black/[.54] text-xl">The first streaming payroll toolkit for DAOs on The Open Network (TON)</p>
					</div>
				</div>
				<div className="flex justify-center items-start py-[64px] px-[16px] gap-[64px] h-[500px]">
					<div className="flex flex-col items-start p-[32px] gap-[32px] h-[300px] bg-white rounded-[44px]">
						<div className="rounded-[99px] bg-blue-400/1">
							<span className="text-primary-dark">DAO</span>
						</div>
						<div>
							<h2 className="font-bold text-xl text-black">Stream Payrolls to Your DAO Members for Their Contributions</h2>
						</div>
						<div>
							<p className="font-normal text-base text-black">Pay to your core contributors and team members by minute, by hour, or by day — continuously and fully automated.</p>
						</div>
						<div>
							<Button onClick={() => setLocation("/create")} className="rounded-[12px] bg-primary-dark text-primary-light">
								Create a Stream
							</Button>
						</div>
					</div>
					<div className="flex flex-col items-start p-[32px] gap-[32px] h-[300px] bg-white rounded-[44px]">
						<div className="rounded-[99px] bg-blue-400/1">
							<span className="text-primary-dark">DAO</span>
						</div>
						<div>
							<h2 className="font-bold text-xl text-black">Stream Payrolls to Your DAO Members for Their Contributions</h2>
						</div>
						<div>
							<p className="font-normal text-base text-black">Pay to your core contributors and team members by minute, by hour, or by day — continuously and fully automated.</p>
						</div>
						<div>
							<Button onClick={() => setLocation("/receive")} className="rounded-[12px] bg-orange-500 text-primary-light">
								Receive a Stream
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
