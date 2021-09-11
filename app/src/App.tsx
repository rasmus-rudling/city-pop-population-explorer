import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import SearchByCountryPage from "./components/pages/SearchByCountryPage";
import PageWrapper from "./components/common/PageWrapper";
import AllButHomePageWrapper from "./components/common/AllButHomePageWrapper";
import SearchByCityPage from "./components/pages/SearchByCityPage";
import PopulationResultPage from "./components/pages/PopulationResultPage";
import SelectedCityProvider from "./contexts/SelectedCityContext";

const App = () => {
	return (
		<SelectedCityProvider>
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

					<Route exact path="/search_by_city">
						<PageWrapper>
							<AllButHomePageWrapper>
								<SearchByCityPage />
							</AllButHomePageWrapper>
						</PageWrapper>
					</Route>

					<Route exact path="/population_result_page">
						<PageWrapper>
							<AllButHomePageWrapper>
								<PopulationResultPage />
							</AllButHomePageWrapper>
						</PageWrapper>
					</Route>
				</Switch>
			</Router>
		</SelectedCityProvider>
	);
};

export default App;
