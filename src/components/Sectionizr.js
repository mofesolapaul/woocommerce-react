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

export default props => 
    <div {...props} className="Sectionizr">
        <div className="flex">
            {props.children.map(s => (console.log(), s))}
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
                left: -${props.current * 100}%
            }
        `}</style>
    </div>