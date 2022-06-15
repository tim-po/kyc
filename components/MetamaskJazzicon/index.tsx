import React, {useContext} from "react";
import texts from './localization'
import LocaleContext from "../../Standard/LocaleContext";
import {localized} from "../../Standard/utils/localized";
import './index.css'

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type SnippetComponentPropType = {
    // You should declare props like this, delete this if you don't need props
    someProp: any
    somePropWithDefaultOption?: string
}

const SnippetComponentDefaultProps = {
    // You should declare default props like this, delete this if you don't need props
    somePropWithDefaultOption: 'default value'
}

const SnippetComponent = (props: SnippetComponentPropType) => {
    const {locale} = useContext(LocaleContext)

    return (
        <div className={'some-classname'}>
            {/* example of localisation usage */}
            <div>
                {localized(texts, locale)}
            </div>
        </div>
    )
};

SnippetComponent.defaultProps = SnippetComponentDefaultProps

export default SnippetComponent