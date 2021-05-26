import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent(){
        switch (this.props.auth){
            case null:
                return;
            case false: 
                return (console.log(this.props),<li><a href="/auth/google">Login with google</a></li>);
            default: 
                return (console.log(this.props.auth),<li><a href="/api/logout">Logout</a></li>);
        }
    }

    render(){
        return(
                <nav>
                    <div className="nav-wrapper">
                        <Link 
                            to={ this.props.auth ? '/surveys' : '/'} 
                            className="left brand-logo">
                            Emaily
                        </Link>
                        <ul id="nav-mobile" className="right">
                            {this.renderContent()}
                        </ul>
                    </div>
                </nav>
        )
    }
}

function mapStateToProps({ auth }){
    return { auth };
}

export default connect(mapStateToProps)(Header);