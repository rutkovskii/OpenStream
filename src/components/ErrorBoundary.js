import { Link } from "wouter";
import { Component } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		//logErrorToMyService(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="h-full flex flex-col items-center justify-center">
					<div className="p-5 text-center">
						<img src="https://static.oxinis.com/healthmug/image/healthmug/error.png" className="w-44 h-44 inline-block" />
						<h4 className="mt-md text-md font-medium">Oops...</h4>
						<p className="text-gray-medium">Sorry, Something went wrong. Try again</p>
						<Link href="/">
							<button>CONTINUE SHOPPING</button>
						</Link>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
