import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "wouter";

import Button from "./Button";
import Input from "./Input";

const Create = () => {
	const [tonAmount, setTonAmount] = useState("");
	const [address, setAddress] = useState("");
	const [schedule, setSchedule] = useState("minutely");
	const [location, setLocation] = useLocation();

	const setAmount = (value) => {
		if (!isNaN(value)) setTonAmount(value);
		else toast.error("Enter Number only");
	};

	const parseNumber = () => {
		if (!!tonAmount) setTonAmount(parseInt(tonAmount).toFixed(2));
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center gap-[15px] ">
				<div>
					<img
						src="https://s3-alpha-sig.figma.com/img/fb68/5ec1/1b06bd1f993de525d2032f06cc6c0f80?Expires=1657497600&Signature=duqJX8SlSPwwLk36L7R4go8ggYIpTLzEcVpOqH7tP-AO6RivkdceLR7-gmUdNM38A-kSiJn6hZ0nLyweRZYY87e0IfRCGhYKxf7ovXJYI6YbF2zIQMhZQcG6JT6ET~4FfE8Pcx2ZNQwrvYRNj68eNMrFzboJrLNL7ERX0Tr3t5a3h4ulY3YpYfLSEIipvr9jBFSlKv5Pwx8v-n5nAGU7nMCqfoA-cEeBkM9qfoSbuNmYIFmpajkL2V~vnO~NMM9jWkXJ6FZSrqlOB~102NQ-MfjY6WY4Eh4GDmDtDF26O2q~ILA6DQcZCOSqrVXl8Qc42U17-uEenwlAbvmTP30wKw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
						className=" h-[150px] w-[150px] self-center"
					/>
				</div>
				<h1 className="font-extrabold text-2xl">Create a Stream</h1>
				<p className="text-black/40 font-semibold">Stream Payrolls to Your DAO Members for Their Contributions</p>
				<div className="flex flex-col rounded-[44px] bg-white p-[32px] items-start h-[350px]">
					<div className="flex flex-col items-start gap-[10px]">
						<Input label="Monthly Streaming" small placeholder="5.00 TON" value={tonAmount} onChange={(e) => setAmount(e.target.value)} name="tonAmount" className="font-2xl" />
						<Input label="Enter the Address" placeholder="alice.ton" value={address} onChange={(e) => setAddress(e.target.value)} name="tonAmount" onFocus={parseNumber} />
						<span className="mt-1">Streaming Schedule</span>
						<div className="flex-col items-start gap-[8px] w-[400px] h-[108px]">
							<div className="flex gap-[25px]">
								<div className={`${schedule === "minutely" ? "ring-2" : ""} cursor-pointer p-[8px] h-[40px] rounded-[12px] bg-gray-lightest`} onClick={() => setSchedule("minutely")}>
									Minutely
								</div>
								<div className={`${schedule === "hourly" ? "ring-2" : ""} cursor-pointer p-[8px] h-[40px] rounded-[12px] bg-gray-lightest`} onClick={() => setSchedule("hourly")}>
									Hourly
								</div>
								<div className={`${schedule === "daily" ? "ring-2" : ""} cursor-pointer p-[8px] h-[40px] rounded-[12px] bg-gray-lightest`} onClick={() => setSchedule("daily")}>
									Daily
								</div>
								<div className={`${schedule === "weekly" ? "ring-2" : ""} cursor-pointer p-[8px] h-[40px] rounded-[12px] bg-gray-lightest`} onClick={() => setSchedule("weekly")}>
									Weekly
								</div>
							</div>
							<div className="flex items-start gap-[8px] w-[400px] mt-2">
								<div
									className={`${schedule === "month" ? "ring-2" : ""} cursor-pointer text-center w-[180px] rounded-[12px] bg-gray-lightest h-[36px] p-[5px]`}
									onClick={() => setSchedule("month")}
								>
									Take a Month
								</div>
								<div
									className={`${schedule === "monthly" ? "ring-2" : ""} cursor-pointer text-center w-[180px] rounded-[12px] bg-gray-lightest h-[36px] p-[5px]`}
									onClick={() => setSchedule("monthly")}
								>
									Monthly
								</div>
							</div>
						</div>
					</div>
					<div>
						<Button onClick={() => setLocation("/mystreams")} className="bg-primary-dark text-primary-light rounded-[12px]" noUpperCase>
							Create a Stream
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Create;
