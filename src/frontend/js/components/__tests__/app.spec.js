import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/app';

describe('App', () => {
    test('rendered body contains .app', () => {
        const app = shallow(
            <App />
        );
        expect(app.find('.app').length).toEqual(1);
    });
});
