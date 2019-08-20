import React, { Component } from "react";

class NewDashboard extends Component {
    render() {
        return (
            <div id="page-top" style={{ overflowY: "auto" }}>
                <div className="masthead text-white text-center"
                    style={{ backgroundImage: 'url("../assets/img/hero-background.jpg")', backgroundRepeat: "round", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                    <div className="container d-flex align-items-center flex-column">
                        <img className="masthead-avatar mb-5" src="/assets/img/SD-logo.png" alt="" style={{ width: "35rem" }} />
                        <h1 className="masthead-heading mb-0" style={{ textShadow: "0px 3px 0px rgba(30, 50, 73, 0.26)", fontSize: "40px", fontFamily: "Raleway", paddingTop: "6rem", paddingBottom: "10rem" }}>
                            TEAM MEMBERS PORTAL
                        </h1>

                        <div className="divider-custom divider-light" style={{ marginBottom: "13rem" }}>
                            <a className="btn btn-outline-light btn-social mx-1" href="#one" >
                                <i class="fas fa-arrow-down"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <section className="page-section portfolio" id="one" style={{ backgroundColor: "#344457" }} >
                    <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem", textAlign: "left" }}>
                    <div className="d-card-columns">
                        <div className="card" style={{ backgroundColor: "#3a5574" }}>
                            <div className="card-img-caption">
                                <p className="card-text">Wrike</p>
                                <img src="/assets/img/wrike-title-bg.jpg" className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body" >
                                <div>
                                    <a href="https://www.wrike.com/workspace.htm" target="_blank" className="btn link btn-lg btn-block grad"
                                        style={{ fontSize: "20px", color: "#fff", padding: "2rem", textAlign: "left", marginBottom: "1rem" }}>
                                        <h2 style={{ fontFamily: "Raleway" }} >WRIKE
                                                <span className="pull-right">
                                                <span className="glyphicon glyphicon-chevron-right"></span>
                                            </span>
                                        </h2>
                                    </a>
                                </div>
                                <div>
                                    <a href="https://www.wrike.com/workspace.htm?acc=2851865#path=folder&id=368548591&p=356019157&a=2851865&c=list&so=10&bso=10&sd=0&f=&st=space-356019157"
                                        className="btn btn-lg btn-block grad" target="_blank" style={{ fontSize: "20px", color: "#fff", padding: "2rem", marginBottom: "1rem", textAlign: "left" }}>
                                        <h2 style={{ fontFamily: "Raleway" }}>WRIKE TRAINING
                                                <span className="pull-right" >
                                                <span className="glyphicon glyphicon-chevron-right"></span>
                                            </span>
                                        </h2>
                                    </a>
                                </div>
                                <div>
                                    <a href="https://www.wrike.com/workspace.htm?acc=2851865#path=request-forms&accountid=2851865&formid=242466"
                                        className="btn btn-lg btn-block grad" target="_blank" style={{ fontSize: "20px", color: "#fff", padding: "2rem", marginBottom: "1rem", textAlign: "left" }}>
                                        <h2 style={{ fontFamily: "Raleway" }}>WRIKE-REQUEST <br />ACCESS TO PROJECT
                                                <span className="pull-right">
                                                <span className="glyphicon glyphicon-chevron-right"></span>
                                            </span>
                                        </h2>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={{ backgroundColor: "#3a5574" }}>
                            <div className="card-img-caption">
                                <p className="card-text">SerpicoDev</p>
                                <img src="/assets/img/SD-title-bg.jpg " className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <div>
                                    <a href="https://serpicodev.sharepoint.com/:b:/s/SerpicoDEV_all/EYrQtSnjUjpAu6Dfhe7xckYBpVUI3AFByc1lg8MziPp-Kg?e=MTkpMN" target="_blank"
                                        className="btn btn-lg btn-block grad" style={{ color: "#fff", padding: "2rem", marginBottom: "1rem", textAlign: "left" }}>
                                        <h2 style={{ fontFamily: "Raleway" }}>TEAM MEMBER <br />HANDBOOK
                                                <span className="pull-right" >
                                                <span className="glyphicon glyphicon-chevron-right pull-right"></span>
                                            </span>
                                        </h2>
                                    </a>
                                </div>
                                <div>
                                    <a href="http://devview.serpicodev.com/dailygoals" target="_blank" className="btn btn-lg btn-block grad"
                                        style={{ fontSize: "20px", color: "#fff", padding: "2rem", marginBottom: "1rem", textAlign: "left" }}>
                                        <h2 style={{ fontFamily: "Raleway" }}>DEV VIEW GOALS
                                                <span className="pull-right" >
                                                <span className="glyphicon glyphicon-chevron-right"></span>
                                            </span>
                                        </h2>
                                    </a>
                                </div>
                                <div>
                                    <a href="https://serpicodev-invoice.herokuapp.com" className="btn btn-lg btn-block grad" target="_blank" style={{ fontSize: "20px", color: "#fff", padding: "2rem", marginBottom: "1rem", textAlign: "left" }}>
                                        <h2 style={{ fontFamily: "Raleway" }}>PAYMENT CENTER
                                                <span className="pull-right" >
                                                <span className="glyphicon glyphicon-chevron-right"></span>
                                            </span>
                                        </h2>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={{ backgroundColor: "#3a5574" }}>
                            <div className="card-img-caption">
                                <p className="card-text">Request</p>
                                <img src="/assets/img/requests-title-bg.jpg" className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <div>
                                    <a  target="_blank" href="https://www.wrike.com/workspace.htm?acc=2851865#path=request-forms&accountid=2851865&formid=240462" className="btn btn-lg btn-block grad"
                                        style={{ fontSize: "20px", color: "#fff", padding: "2rem", marginBottom: "1rem", textAlign: "left" }}>
                                        <h2 style={{ fontFamily: "Raleway" }}>REQUEST RESOURCES
                                                <span className="pull-right" >
                                                <span className="glyphicon glyphicon-chevron-right"></span>
                                            </span>
                                        </h2>
                                    </a>
                                </div>
                                <div>
                                    <a  target="_blank" href="https://www.wrike.com/form/eyJhY2NvdW50SWQiOjI4NTE4NjUsInRhc2tGb3JtSWQiOjI0Njg3OX0JNDcxOTg2NDIyNTY4MQkwY2I2NTQ2ZjgyNTMyNjU2OTk3MzBlYTVlYzgxNDM0OWNjNWMyN2VjZThlNDY3NGU2Mjk3Njk1MDJhMmI0N2Ix" className="btn btn-lg btn-block grad" style={{ fontSize: "20px", color: "#fff", padding: "2rem", marginBottom: "1rem", textAlign: "left" }}>
                                        <h2 style={{ fontFamily: "Raleway" }}>
                                            REQUEST FOR <br />MORE WORK
                                                <span className="pull-right">
                                                <span className="glyphicon glyphicon-chevron-right"></span>
                                            </span>
                                        </h2>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>

            <footer className="nd-footer text-center " style={{ backgroundColor: "#1a2530" }} >
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 mb-5 mb-lg-0">
                            <a className="btn btn-outline-light btn-social mx-1" target="_blank" href="https://www.linkedin.com/company/serpico-dev">
                                <i className="fa fa-lg fa-linkedin"></i>
                            </a>
                            <a className="btn btn-outline-light btn-social mx-1" target="_blank" href="https://twitter.com/SerpicoDEV">
                                <i className="fa fa-lg fa-twitter"></i>
                            </a>
                            <a className="btn btn-outline-light btn-social mx-1" href="mailto:Contact@SerpicoDEV.com">
                                <i className="fa fa-lg fa-envelope"></i>
                            </a>
                        </div>

                        <div className="container" style={{ fontSize: "1.5rem", margin: "3rem", fontFamily: "Raleway", fontStyle: "italic", fontSize: "24px" }}>
                            <small>Copyrights &copy; 2005-2019 Serpico Enterprises. LLC Scottsdale AZ USA</small>
                        </div>
                    </div>
                </div>
            </footer>
            </div >
        );
    }
}
export default NewDashboard;
