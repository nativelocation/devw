import React, { Component } from "react";
import Sidebar from "../components/sidebar";
const tw = require("teamwork-api")(
  "twp_GyX8Zgke05Wd4hHigpr6BN32ckvp",
  "https://serpicodev.teamwork.com"
);

export default class Dashboard extends Component {
  state = {
    projects: []
  };

  async componentDidMount() {
    await this.getAllProjects();
  }

  async getAllProjects(){
    await tw.projects
      .get({
        status: "ALL"
      })
      .then(res => {
        console.log("Projects ", res);
        this.setState({ projects: res });
      })
      .catch(err => {
        console.log("Error ", err);
      });
  };
  render() {
    console.log(this.state.projects);
    return (
      <Sidebar />
      // <div>
      //     {this.state.projects.each(r => {
      //         <p>r</p>
      //     })}
      // </div>
    );
  }
}
