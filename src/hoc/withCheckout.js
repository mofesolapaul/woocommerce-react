import css from '../../styles/vars';
import Head from 'next/head';

export default (childComponent, options, detachedViews) => (
    <div className="OrderPreview">
        <Head>
            <title>{options.page_title}</title>
        </Head>

        {detachedViews}

        <div className="flex col">
            <h1 className="font-primary">{options.section_header}
                <a className="close" onClick={() => options.actionHandler(`${options.section_name}.dismiss`)}>{`\u00d7`}</a>
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
                background: ${css.colors.background};
                padding: 2rem 5%;
                box-shadow: rgba(82,89,101,.25) 0px -2px 8px 3px;
                position: fixed;
                // overflow: auto;
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
            .flex {
                height: 100%;
            }
            .wrapper {
                flex-grow: 1;
                // padding-left:10px;
                position: relative;
                overflow: hidden;
            }
            @media screen and (max-width: 719px) {
                .wrapper {
                    flex-direction: column;
                }
            }
        `}</style>
    </div>
)