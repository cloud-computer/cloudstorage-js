import * as React from "react";

import { CloudFactory } from "../cloudstorage";
import { List, ListItem } from "react-toolbox/lib/list";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuthorizeView from "./AuthorizeView";

interface AddAccountProps {
    factory: CloudFactory
};

export class AddAccount extends React.Component<AddAccountProps, {}> {
    render() {
        return <List>
            {this.props.factory.availableProviders().map((value, _) => {
                return <a key={value} href={this.props.factory.authorizeUrl(value)} target="_blank">
                    <ListItem caption={value} />
                </a>;
            })}
        </List>;
    }
};