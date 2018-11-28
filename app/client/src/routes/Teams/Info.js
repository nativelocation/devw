import React, { Component, Fragment } from 'react';
import Wrapper from '../../components/Wrapper';
import Profile from '../../components/ProfileView';
import IconInfo from '../../components/IconInfo';
import ToggleButton from '../../components/ToggleButton';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { COLORS, FONTS } from '../../config/constants';
import Api from '../../config/api';

class Info extends Component {
  state = {
    wrapperType: true,
    id: this.props.match.params.id || '',
    name: '',
  }

  componentDidMount() {
    this.getTeam();
  }

  getTeam = () => {
    const { id } = this.state;
    const { account } = this.props;
    if (id) {
      Api.GetTeam(account.tokenAuth, id).then(res => {
        if (res.status === 201) {
          this.setState({ name: res.data.name })
        }
      }).catch(err => {
        //TODO: show error
        console.log('err :', err);
      });
    }
  }

  changeList = type => {
    this.setState({ wrapperType: type });
  }

  render() {
    const { wrapperType, name } = this.state;
    let users = [
      { 'id': 1, 'name': 'Maria Hamilton', 'type': 'Athlete' },
      { 'id': 2, 'name': 'Natasha Hamilton', 'type': 'Agent' },
      { 'id': 3, 'name': 'John Hamilton', 'type': 'Agent' },
      { 'id': 4, 'name': 'David Hamilton', 'type': 'Athlete' },
      { 'id': 5, 'name': 'Maria Hamilton', 'type': 'Athlete' },
      { 'id': 6, 'name': 'Peter Hamilton', 'type': 'Athlete' },
      { 'id': 7, 'name': 'Alex Hamilton', 'type': 'Athlete' },
      { 'id': 8, 'name': 'Zamyr Hamilton', 'type': 'Athlete' },
      { 'id': 9, 'name': 'Gustavo Hamilton', 'type': 'Athlete' },
    ]
    return (
      <Wrapper name='Info Team'>
        <Button text='Add new user' onClick={() => console.log('add user')} />
        <ToggleButton onChange={this.changeList.bind(this)} />
        <div className='col-md-12 mt-3 pl-0'>
          <h3 style={styles.text}>{`Team: ${name}`}</h3>
        </div>
        <div className='d-flex mt-3 col-md-12 flex-row flex-wrap'>
          {users.map(u =>
            <div key={u.id} className={wrapperType ? 'col-md-3' : 'col-md-8'}>
              <Profile  src="/assets/img/4.jpg" title={u.name} subtitle={u.type} orientation={wrapperType ? false : true} >
                <div className={!wrapperType ? "d-flex justify-content-end px-3 pt-3" : ""} style={{ flex: 1 }}>
                  <IconInfo color="#2C3A41" hover="#777777" icon="eye" />
                  <IconInfo color="#2C3A41" hover="#777777" icon="eyedropper px-1" />
                  <IconInfo color="#2C3A41" hover="#777777" icon="trash" />
                </div>
              </Profile>
            </div>
          )}
        </div>
      </Wrapper>
    );
  }
}

const styles = {
  text: {
    fontFamily: FONTS.RobotoLight,
    color: COLORS.LightBlack,
  },
}

export default connect(s => ({ account: s.account }))(Info)
