import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ReactDOMServer from 'react-dom/server';
import { Counter } from "./components/counter"




ReactDOM.render(<Counter compiler="TypeScript" framework="React" />, document.getElementById('root'))