/* @refresh reload */
import { render } from 'solid-js/web';
import { getModal, getModalV2 } from './modal';

import './index.css';
import App from './App';

export * from './hooks';
export * from './modal/get-modal';
// export * from './modal/theme';
export * from './provider';
export * from './provider-v2';

export const DefaultModal = getModal('simple_v2');
export const DefaultModalV2 = getModalV2('simple_v2');


render(() => <App />, document.getElementById('root') as HTMLElement);
