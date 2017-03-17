import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/app';

let securityContext = {};

beforeAll(() => {
    securityContext = {"id":5,"username":"application","application_user":1,"read":1,"write":0,"date_added":null,"date_updated":null}
});

describe('App', () => {
    test('render() contains header, body, and footer', () => {
        const app = shallow(
            <App securityContext={ securityContext } />
        );
        expect(app.find('.app-header').length).toEqual(1);
        expect(app.find('.app-body').length).toEqual(1);
        expect(app.find('.app-footer').length).toEqual(1);
    });
});
