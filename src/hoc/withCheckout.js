import css from '../../styles/vars'
import Head from 'next/head'

export default (childComponent, options) => (
    <div className="OrderPreview">
        <Head>
            <title>{options.page_title}</title>
        </Head>

        <div className="flex col">
            <h1 className="font-sourcesans">{options.section_header}
                <a className="close" onClick={() => this.actionHandler(`${options.section_name}.dismiss`)}>{`\u00d7`}</a>
            </h1>
            <div className="wrapper flex">
                {childComponent}
            </div>
        </div>

        <style jsx>{`
            @keyframes drawUp {
                to { bottom: 0 }
            }
            .OrderPreview {
                background: ${css.colors.ultrawhite};
                padding: 2rem 5%;
                box-shadow: rgba(82,89,101,.25) 0px -2px 8px 3px;
                position: fixed;
                overflow: auto;
                width: 100%;
                left: 0;
                z-index: 999;
                transition: .25s ease-in-out;
                height: 100%;
                bottom: -100%;
                animation: drawUp ease-in .25s both;
            }
            @media screen and (min-width: 720px) {
                .OrderPreview {
                    height: 60%;
                    bottom: -65%;
                    animation: drawUp ease-in .25s both;
                }
                .wrapper {
                    flex-direction: row-reverse;
                }
            }
            .close {
                font-weight: 100;
                border: none;
                opacity: .4;
                float: right;
                padding: 0 .5rem;
                cursor: pointer;
            }
            .close:hover {
                opacity: .8;
            }

            .flex {
                height: 100%;
            }
            .wrapper {
                flex-grow: 1;
            }
            @media screen and (max-width: 719px) {
                .wrapper {
                    flex-direction: column;
                }
            }
        `}</style>
    </div>
)