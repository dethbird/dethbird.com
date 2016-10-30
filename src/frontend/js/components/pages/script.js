import React from 'react'
import { browserHistory, Link } from 'react-router'

import { ScriptBreadcrumb } from "./script/script-breadcrumb"
import { Card } from "../ui/card"
import { CardBlock } from "../ui/card-block"
import { Description } from "../ui/description"
import { FountainFull } from "../ui/fountain-full"
import { SectionHeader } from "../ui/section-header"
import { Spinner } from "../ui/spinner"


const Script = React.createClass({
    componentDidMount() {
        $.ajax({
            url: '/api/project_script/' + this.props.params.scriptId,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({script: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(xhr);
            }.bind(this)
        });
    },
    render() {
        let that = this;
        if(this.state) {
            let script = this.state.script;
            return (
                <div className="scriptPage">
                    <ScriptBreadcrumb script={ this.state.script } />

                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link
                                className="nav-link btn btn-info"
                                to={
                                    '/script/' + that.props.params.scriptId
                                    + '/edit'
                                }>Edit</Link>
                        </li>
                    </ul>
                    <br />
                    <h1>{ this.state.script.name }</h1>
                    <Card>
                        <CardBlock>
                            <Description source={ this.state.script.description } />
                        </CardBlock>
                    </Card>

                    <Card>
                        <CardBlock>
                            <FountainFull source={ this.state.script.script } />
                        </CardBlock>
                    </Card>

                </div>
            )
        }
        return (
            <Spinner />
        )
    }
})

module.exports.Script = Script
