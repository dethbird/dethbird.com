import React from 'react';
import { mount } from 'enzyme';
import {
    Segment,
    Sidebar,
} from 'semantic-ui-react';

import Index from 'components/pages/index';

import LoginForm from 'components/ui/form/login-form';
import Footer from 'components/ui/footer';
import Masthead from 'components/ui/masthead';

describe('Index page', () => {
    test('render()', () => {
        const props = {
            route: {
                props: {
                    securityContext: {}
                }
            }
        };
        const component = mount(
            <Index { ... props } />
        );
        expect(component.find(Masthead).length).toEqual(1);
        expect(component.find(Masthead).props().onClickLogin !== undefined);
        expect(component.find(LoginForm).length).toEqual(1);
        expect(component.find(LoginForm).props().onClickCancel !== undefined);
    });
});
