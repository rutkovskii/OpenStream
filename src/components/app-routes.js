import { Route, Switch } from "wouter";

import ErrorBoundary from "./ErrorBoundary";
import PageNotFound from "./404";
import Home from "./Home";
import Create from "./create";
import Receive from "./receive";
import MyStream from "./MyStream";
import StreamDashboard from "./StreamDashboard";
import EarningDashboard from "./EarningDashboard";
import EarningWithdrawl from "./EarningWithdrawl";

const AppRoutes = () => {
	return (
		<ErrorBoundary>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/create" exact component={Create} />
				<Route path="/receive" exact component={Receive} />
				<Route path="/mystreams" exact component={MyStream} />
				<Route path="/mystreams/:stream_id" exact component={StreamDashboard} />
				<Route path="/myearnings/:stream_id" exact component={EarningDashboard} />
				<Route path="/earnwithdrawl" exact component={EarningWithdrawl} />
				<Route component={PageNotFound} />
			</Switch>
		</ErrorBoundary>
	);
};

export default AppRoutes;
