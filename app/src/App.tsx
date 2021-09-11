import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";
import HomePage from "./components/pages/HomePage";
import SearchByCountryPage from "./components/pages/SearchByCountryPage";
import PageWrapper from "./components/common/PageWrapper";
import AllButHomePageWrapper from "./components/common/AllButHomePageWrapper";

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<PageWrapper>
						<HomePage />
					</PageWrapper>
				</Route>

				<Route exact path="/search_by_country">
					<PageWrapper>
						<AllButHomePageWrapper>
							<SearchByCountryPage />
						</AllButHomePageWrapper>
					</PageWrapper>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
