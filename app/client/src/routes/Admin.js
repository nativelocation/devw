import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Api from "../config/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";

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



    await resDeveloper.data.map((dev) => {
      if (id.toString() === dev.active) {
        console.log("siexiste")
        this.setState({ active: true })

      } else {
        console.log("siexiste")
        this.setState({ active: false })

      }
    })



    let data = {
      apiId: "112233",
      active: true,
      fullTime: true
    };

    //await Api.CreateDeveloper(account.tokenAuth, data);

    //console.log("DEV ",resDeveloper);
  }

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  async onChangeActive(e, id) {
    const { account } = this.props;
    const developers = this.state.developers;



    console.log(e.target.checked, id)

    var exist


    await developers.data.map((dev) => {
      if (id.toString() === dev.apiId) {
        console.log("siexiste")
        exist = true;
      } else {
        console.log("siexiste")
        exist = false;
      }
    })

    console.log(exist)

    // if (e.target.checked) {
    //   let data = {
    //     apiId: id,
    //     active: true,
    //     fullTime: false
    //   };
    //   await Api.CreateDeveloper(account.tokenAuth, data);
    // }else{

    // }




    // if()
    // let data = {
    //   apiId:id,
    //   active:false,
    //   fullTime:true
    // }; 

    // await Api.CreateDeveloper(account.tokenAuth, data);

    // console.log("DEV ", developers);


  }

  async onChangeFullTime(e, id) {
    const { account } = this.props;

    if (e.target.checked) {
      let data = {
        apiId: id,
        active: false,
        fullTime: true
      };
      await Api.CreateDeveloper(account.tokenAuth, data);
      console.log("se creo ", id)
    } else {
      await Api.DeleteDeveloper(account.tokenAuth, { apiId: id.toString() })
      console.log("se borro", id)
    }

    console.log(e.target.checked, id)
  }

  render() {
    const { people } = this.state;
    const developers = this.state.developers;


    if (people.data) {
      let ppl = people.data.people
      console.log("PP", ppl["first-name"])
      var peopleList = ppl.map((r, i) => {
        let fullName = r["first-name"] + " " + r["last-name"]
        var active = false;
        var fullTime = false;

        developers.data.map((a) => {
          if (r.id === a.apiId) {
            console.log(a.apiId, a.active, a.fullTime)
            if (a.active) {
              console.log("entro actve")
              active = true
            }
            if (a.fullTime) {
              console.log("entro fullTime")
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
                className="form-check-input mt-1"
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
                className="form-check-input mt-1"
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
        <Wrapper name="Show:" onClick={this.onLogout}>
          <div className="d-flex flex-row">
            <p>Admin</p>
          </div>
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
          </div>
        </Wrapper>
      </Fragment>
    );
  }
}
export default connect(s => ({ account: s.account }))(Admin);
