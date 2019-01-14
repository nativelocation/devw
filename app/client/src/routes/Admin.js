import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Api from "../config/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
import { ToastContainer, ToastStore } from 'react-toasts';


class Admin extends Component {
  state = {
    people: [],
    developers: [],
    active: {},
    isGoing: false,
  };

  async componentWillMount() {
    const { account } = this.props;
    const resPeople = await Api.GetPeople(account.tokenAuth);
    const resDeveloper = await Api.GetAllDeveloper(account.tokenAuth);
    this.setState({ people: resPeople, developers: resDeveloper });

    // await Api.CreateDeveloper(account.tokenAuth, { apiId: "123456", active: true, fullTime: true });

   // ToastStore.info('Hey, it worked !');



  }

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  async onChangeActive(e, id) {
    const { account } = this.props;

    if (e.target.checked) {
      const dev = await Api.GetDeveloperByApiId(account.tokenAuth, { apiId: id.toString() });
      if (dev.data != null) {
        if (dev.data.fullTime) {
          await Api.DeleteDeveloper(account.tokenAuth, { apiId: id.toString() });
          await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: true, fullTime: true });
          ToastStore.success('Developer has been updated');
        }
        else {
          await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: true, fullTime: false });
          ToastStore.success('Developer has been added');
        }
      } else {
        await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: true, fullTime: false });
        ToastStore.success('Developer has been added');
      }
    } else {
      const dev = await Api.GetDeveloperByApiId(account.tokenAuth, { apiId: id.toString() });
      if (dev.data.fullTime) {
        await Api.DeleteDeveloper(account.tokenAuth, { apiId: id.toString() });
        await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: false, fullTime: true });
        ToastStore.success('Developer has been updated');
      } else {
        await Api.DeleteDeveloper(account.tokenAuth, { apiId: id.toString() });
        ToastStore.success('Developer has been removed');
      }
    }
  }

  async onChangeFullTime(e, id) {
    const { account } = this.props;
    ToastStore.error('Hey, it worked !');


    if (e.target.checked) {
      const dev = await Api.GetDeveloperByApiId(account.tokenAuth, { apiId: id.toString() });
      if (dev.data != null) {
        if (dev.data.active) {
          await Api.DeleteDeveloper(account.tokenAuth, { apiId: id.toString() });
          await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: true, fullTime: true });          
          ToastStore.success('Developer has been updated');

        } else {
          await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: false, fullTime: true });
          ToastStore.success('Developer has been added');
        }
      } else {
        await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: false, fullTime: true });
        ToastStore.success('Developer has been added');
      }
    } else {
      await Api.DeleteDeveloper(account.tokenAuth, { apiId: id.toString() });
      ToastStore.success('Developer has been removed');

    }
  }

  render() {
    const { people } = this.state;
    const developers = this.state.developers;

    if (people.data) {
      let ppl = people.data.people
      var peopleList = ppl.map((r, i) => {
        let fullName = r["first-name"] + " " + r["last-name"]
        var active = false;
        var fullTime = false;

        developers.data.map((a) => {
          if (r.id === a.apiId) {
            if (a.active) {
              active = true
            }
            if (a.fullTime) {
              fullTime = true
            }
          }
        })
        return (
          <tr key={i}>
            <td>{fullName}</td>
            <td align="center">
              <input
                //style={styles.checkBoxWidth}
                className="mt-1"
                type="checkbox"
                id={r.id + "A"}
                value={r.id + "A"}
                {...(active ? { checked: true } : {})}
                onChange={e => this.onChangeActive(e, r["id"])}
              />
            </td>
            <td align="center">
              <input
                //style={styles.checkBoxWidth}
                className="mt-1"
                type="checkbox"
                id={r.id + "F"}
                value={r.id + "F"}
                {...(fullTime ? { checked: true } : {})}
                onChange={e => this.onChangeFullTime(e, r["id"])}

              />
            </td>
          </tr>
        );
      });
    }

    return (

      <Fragment>
        <Sidebar admin='admin' />
        <Wrapper title="Admin" onClick={this.onLogout} hideLink>
          <div className="d-flex flex-row table-responsive tableProjects">
            <table className="table table-striped table-hover table-borderless">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="text-center">Active</th>
                  <th className="text-center">Full-Time</th>
                </tr>
              </thead>
              <tbody>
                {peopleList}
              </tbody>
            </table>
            <div>
              <ToastContainer store={ToastStore} position={ToastContainer.POSITION.TOP_RIGHT} lightBackground />
            </div>
          </div>
        </Wrapper>
      </Fragment>
    );
  }
}
export default connect(s => ({ account: s.account }))(Admin);
