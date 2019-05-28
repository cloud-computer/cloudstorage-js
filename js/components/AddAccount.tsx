import * as React from "react";

import { CloudFactory } from "../cloudstorage";
import { List, ListItem } from "react-toolbox/lib/list";

interface AddAccountProps {
    factory: CloudFactory
};

export class AddAccount extends React.Component<AddAccountProps, {}> {
    patchUrl = (url: string) => {
        const m = url.match("^(.*)redirect_uri=[^&]*(.*)$");
        if (m) {
            if (url.indexOf("hubic.com") != -1)
                return `${m[1]}redirect_uri=${process.env.HOSTNAME}/${m[2]}`;
            else
                return `${m[1]}redirect_uri=${process.env.HOSTNAME}${m[2]}`;
        }
        else {
            const m = url.match(`^${process.env.HOSTNAME}/([^/]*)/login(.*)$`);
            return `${process.env.HOSTNAME}/#/${m[1]}/login${m[2]}`;
        }
    }

    render() {
        return <List>
            {this.props.factory.availableProviders().map((value, _) => {
                return <a key={value} href={this.patchUrl(this.props.factory.authorizeUrl(value))}>
                    <ListItem caption={value} />
                </a>;
            })}
        </List>;
    }
};