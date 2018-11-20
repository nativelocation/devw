import React, { Component } from 'react';
import Wrapper from '../../components/Wrapper';
import Button from '../../components/Button';
import IconInfo from '../../components/IconInfo';
import Profile from '../../components/ProfileView';

export default class Teams extends Component {

  newTeam() {
    const { history } = this.props;
    history.push('/team/new');
  }

  render() {
    return (
      <Wrapper name='List of Teams'>
        <Button text='Add new user' onClick={this.newTeam.bind(this)} />
        <div className="d-flex flex-row mt-3 col-md-6">
          <Profile src="/assets/img/4.jpg" title='Los pachucos' subtitle="equipo 1" orientation noImage>
            <div className="d-flex justify-content-end align-items-center px-3">
              <IconInfo color="#2C3A41" hover="#777777" icon="eye" />
              <IconInfo color="#2C3A41" hover="#777777" icon="eyedropper px-1" />
            </div>
          </Profile>
        </div>
      </Wrapper>
    );
  }
}
