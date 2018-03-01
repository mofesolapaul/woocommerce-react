import React from 'react'

export const Section = props =>
    <div {...props} className="Section">
        {props.children}

        {/* styles */}
        <style jsx>{`
            .Section {
                width: 100%;
                position: relative;
                overflow: auto;
                height: 100%;
            }
        `}</style>
    </div>

Section.defaultProps = {
    __typeof: 'Sectionizr.Section'
}

export default class Sectionizr extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: this.normalizeIndex(props.current)
        }
    }
    normalizeIndex(index) {
        const sections = this.extractSections().length
        return !!index? (
            index < 1? 1 : (
                index >= sections? sections:index
            )
        ):1
    }
    extractSections() {
        let {children} = this.props
        children = [].concat(children) // enforce array
        children = children.filter(c => c.props.__typeof && c.props.__typeof == 'Sectionizr.Section')
    }
    render() {
        return (
            <div className="Sectionizr">
                <div className="flex">
                    {this.extractSections()}
                </div>

                {/* styles */}
                <style jsx>{`
                    .Sectionizr {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    .flex {
                        position: relative;
                        left: -${(this.state.current-1) * 100}%
                    }
                `}</style>
            </div>
        )
    }
}