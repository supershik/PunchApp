import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = [];
const logger = createLogger();

middleware.push(logger, thunk);

export default middleware;
