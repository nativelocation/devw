import React, { Component } from 'react';
import Wrapper from '../components/Wrapper';
import Input from '../components/Input';
import Profile from '../components/ProfileInput.js';
import File from '../components/FileInput.js';
import ButtonLarge from '../components/ButtonLarge.js';
import Button from '../components/Button.js';
import Label from '../components/Label.js';

export default class UserProfile extends Component {

    render() {
        return (
            <Wrapper name='View User Profile'>
                <div className="d-flex flex-column">
                    <div className="col-md-12"><ButtonLarge text="Edit" /></div>
                    <div className="col-md-12">
                    </div>
                </div>
            </Wrapper>
        );
    }
}
