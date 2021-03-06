import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import LayoutWithSidebar from '../../components/layout/LayoutWithSidebar';

describe('<LayoutWithSidebar />', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <LayoutWithSidebar sidebar={{ location: 'right', width: 'medium', containers: [{}, {}] }}>
                <p>Hola Mundo</p>
            </LayoutWithSidebar>
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});
