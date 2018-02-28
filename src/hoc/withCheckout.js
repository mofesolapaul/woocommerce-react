export default props => (
    <div className="OrderPreview">
        <Head>
            <title>{props.page_title}</title>
        </Head>

        <div className="flex col">
            <h1 className="font-sourcesans">{props.section_header}
                <a className="close" onClick={() => this.actionHandler(`${props.section_name}.dismiss`)}>{`\u00d7`}</a>
            </h1>
            <div className="wrapper flex">
                {props.children}
            </div>
        </div>
    </div>
)