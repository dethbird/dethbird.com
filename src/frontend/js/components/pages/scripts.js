import React from 'react'
import { browserHistory, Link } from 'react-router'

import { Script } from "./scripts/script"
import {
    ScriptsBreadcrumb
} from './scripts/scripts-breadcrumb'
import { Spinner } from "../ui/spinner"

const Scripts = React.createClass({
    componentDidMount() {
        $.ajax({
            url: '/api/project_scripts',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({scripts: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr);
            }.bind(this)
        });
    },
    render() {
        let that = this
        if (this.state) {
            let scriptNodes = this.state.scripts.map(function(script) {
                return (
                    <Script
                        script={ script }
                        key={ script.id }
                    >
                    </Script>
                );
            });

            return (
                <div>
                    <ScriptsBreadcrumb script={ this.state.script } />

                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link
                                className="nav-link btn btn-success"
                                to={
                                    '/script/add'
                                }>Add</Link>
                        </li>
                    </ul>
                    <br />

                    <div className="scriptsList">
                        { scriptNodes }
                    </div>
                </div>
            )
        }
        return (
            <Spinner />
        )
    }
})

module.exports.Scripts = Scripts
