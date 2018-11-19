import React, { Component } from 'react';
import Wrapper from '../components/Wrapper';
import Profile from '../components/ProfileImage.js';
import ButtonLarge from '../components/ButtonLarge.js';
import Label from '../components/Label.js';

export default class UserProfile extends Component {

    render() {
        return (
            <Wrapper name='View User Profile'>
                <div className="d-flex flex-column">
                    <div className="col-md-12"><ButtonLarge text="Edit" /></div>
                    <div className="col-md-12 d-flex flex-row">
                        <div className="col-md-2 mt-2">
                            <Profile src="/assets/img/4.jpg" w='100' />
                        </div>
                        <div className="col-md-10 d-flex flex-column">
                            <Label label="Full name" labelClass="form-text text-muted mb-1" />
                            <p className="justify-content-start">Alexander Guzman</p>
                            <Label label="Email address" labelClass="form-text text-muted mb-1" />
                            <p className="justify-content-start">alexander@gmail.com</p>
                            <Label label="Phone number" labelClass="form-text text-muted mb-1" />
                            <p className="justify-content-start">alexander@gmail.com</p>
                            <Label label="User Type" labelClass="form-text text-muted" b />
                            <p className="justify-content-start">Administrator</p>
                        </div>
                    </div>
                </div>
            </Wrapper>
        );
    }
}
