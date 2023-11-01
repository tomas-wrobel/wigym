import {Redirect, Route} from 'react-router-dom';
import type {FunctionComponent} from 'react';
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {newspaper, star, help, time} from 'ionicons/icons';

import {Auth} from './api';
import Feed from './pages/Feed';
import Marks from './pages/Marks';
import Info from './pages/Info';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Timetable from './pages/Timetable';
import NotFound from './pages/NotFound';

setupIonicReact();
Auth.load();

const App: FunctionComponent = () => (
	<IonApp>
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Route path="/info" component={Info} exact />
					<Route path="/feed" component={Feed} exact />
					<Route path="/marks" component={Marks} exact />
					<Route path="/timetable" component={Timetable} exact />
					<Route path="/login" component={Login} exact />
					<Route path="/" exact>
						<Redirect to="/feed" />
					</Route>
					<Route component={NotFound} />
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					<IonTabButton tab="feed" href="/feed">
						<IonIcon aria-hidden="true" icon={newspaper} />
						<IonLabel>Feed</IonLabel>
					</IonTabButton>
					<IonTabButton tab="timetable" href="/timetable">
						<IonIcon aria-hidden="true" icon={time} />
						<IonLabel>Rozvrh</IonLabel>
					</IonTabButton>
					<IonTabButton tab="marks" href="/marks">
						<IonIcon aria-hidden="true" icon={star} />
						<IonLabel>Známky</IonLabel>
					</IonTabButton>
					<IonTabButton tab="info" href="/info">
						<IonIcon aria-hidden="true" icon={help} />
						<IonLabel>Info</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;
