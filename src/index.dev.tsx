import { h, render } from 'preact';
import 'preact/devtools';
import App from './components/app';
import './style/index.css';
import './lib/init';

render(<App />, document.body);
