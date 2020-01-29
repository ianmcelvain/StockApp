import React from 'react';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee , faBars, faChartArea, faChartPie, faSearch, faPlus, faTimes, faDollarSign, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faCoffee, faBars, faChartArea, faChartPie, faSearch, faPlus, faTimes, faDollarSign, faCalendarAlt);

function App() {
  return (
    <Main />
  );
}

export default App;
