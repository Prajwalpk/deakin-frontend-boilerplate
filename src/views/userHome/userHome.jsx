import React, { Component } from 'react';
import Card from '../../components/card/card';
import M from 'materialize-css';
import Chat from '../../components/chat/chat';
import { ThemeProvider } from 'styled-components';

import HappyGroup from '../../images/Family-Therapy.jpg';
import HappyMan from '../../images/happy-man.jpg';
import HappyWoman from '../../images/happy-woman.jpg';

// Chat theme
const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#44cdff',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#44cdff',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};

class UserHome extends Component {

    componentDidMount() {
        M.AutoInit();
    }

    // Static users home page
    render() {
        return (
            <div className="container">
                <div className="parallax-container">
                    <div className="parallax">
                        <img src={HappyGroup} alt="Happy group of people" />
                    </div>
                </div>
                <div className="section white">
                    <div className="row container">
                        <h2 className="header">Mental Health</h2>
                        <p className="grey-text text-darken-3 lighten-3">
                            It’s an expression we use every day, so it might surprise you that the term ‘mental health’ is frequently misunderstood.
                            ‘Mental health’ is often used as a substitute for mental health conditions – such as depression, anxiety conditions, schizophrenia, and others.
                            According to the World Health Organization, however, mental health is “a state of well-being in which every individual realises his or her own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to her or his community.”
                            So rather than being about ‘what’s the problem?’ it’s really about ‘what’s going well?'
                        </p>
                    </div>
                </div>
                <div className="parallax-container">
                    <div className="parallax">
                        <img src={HappyMan} alt="Happy man" />
                    </div>
                </div>
                <div className="section white">
                    <div className="row container">
                        <h2 className="header">Mental health is about wellness rather than illness</h2>
                        <p className="grey-text text-darken-3 lighten-3">
                            To make things a bit clearer, some experts have tried coming up with different terms to explain the difference between ‘mental health’ and ‘mental health conditions’. Phrases such as ‘good mental health’, ‘positive mental health’, ‘mental wellbeing’, ‘subjective wellbeing’ and even ‘happiness’ have been proposed by various people to emphasise that mental health is about wellness rather than illness. While some say this has been helpful, others argue that using more words to describe the same thing just adds to the confusion.
                            As a result, others have tried to explain the difference by talking about a continuum where mental health is at one end of the spectrum – represented by feeling good and functioning well – while mental health conditions (or mental illness) are at the other – represented by symptoms that affect people’s thoughts, feelings or behaviour.
                        </p>
                    </div>
                </div>
                <div className="parallax-container">
                    <div className="parallax">
                        <img src={HappyWoman} alt="Happy woman" />
                    </div>
                </div>
                <div className="section white">
                    <div className="row container center-align">
                        <h2 className="header">Benefits of staying well</h2>
                        <p className="grey-text text-darken-3 lighten-3">
                            Research shows that high levels of mental health are associated with increased learning, creativity and productivity, more pro-social behaviour and positive social relationships, and with improved physical health and life expectancy. In contrast, mental health conditions can cause distress, impact on day-to-day functioning and relationships, and are associated with poor physical health and premature death from suicide.
                            But it’s important to remember that mental health is complex. The fact that someone is not experiencing a mental health condition doesn’t necessarily mean their mental health is flourishing. Likewise, it’s possible to be diagnosed with a mental health condition while feeling well in many aspects of life.
                            Ultimately, mental health is about being cognitively, emotionally and socially healthy – the way we think, feel and develop relationships - and not merely the absence of a mental health condition.
                        </p>
                        <br /><br />
                        <h3 className="header">Find out more</h3>
                        <Card cardClass="col s12 m4 l4 card">
                            <div className="card-content">
                                <h6>Get Help</h6>
                            </div>
                            <div className="card-action">
                                <a href="#!">Visit</a>
                            </div>
                        </Card>
                        <Card cardClass="col s12 m4 l4 card">
                            <div className="card-content">
                                <h6>Find out about treatments</h6>
                            </div>
                            <div className="card-action">
                                <a href="#!">Visit</a>
                            </div>
                        </Card>
                        <Card cardClass="col s12 m4 l4 card">
                            <div className="card-content">
                                <h6>Get Support</h6>
                            </div>
                            <div className="card-action">
                                <a href="#!">Visit</a>
                            </div>
                        </Card>
                    </div>
                </div>
                <ThemeProvider theme={theme}>
                    <Chat />
                </ThemeProvider>
            </div>
        )
    }
}

export default UserHome;