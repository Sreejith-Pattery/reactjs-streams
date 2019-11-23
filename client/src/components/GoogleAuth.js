import React from 'react';
import { connect } from 'react-redux';
import { SignIn, SignOut } from '../actions';

class GoogleAuth extends React.Component {
    // state = { isSignedIn:null };
    componentDidMount() {
        window.gapi.load('client:auth2',
            () => {
                window.gapi.client.init({
                    clientId: '746967682660-udabuattkvp244vtoidpscotp0kqeo50.apps.googleusercontent.com',
                    scope: 'email'
                }).then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
            });
    };

    onAuthChange = isSignedIn => {
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        if (isSignedIn) {
            this.props.SignIn(this.auth.currentUser.get().getId());
        } else {
            this.props.SignOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn == null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui blue google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const MapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(MapStateToProps, { SignIn, SignOut })(GoogleAuth);