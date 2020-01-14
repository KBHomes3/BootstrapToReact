import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { PARTNERS } from '../shared/partners';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import {Switch, Route, Redirect} from 'react-router-dom';
import { CAMPSITES } from '../shared/campsites';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            partners: PARTNERS,
            comments: COMMENTS,
            promotions: PROMOTIONS
        };
    }

    render() {

        const HomePage = () => {
            return (
                <Home />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
                    <Route exact path='/aboutus' render={() => <About partners={this.state.partners}/>} />
                    <Route exact path='/contactus' render={() => <Contact />} />
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default Main;