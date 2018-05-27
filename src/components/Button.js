export const ButtonPane = props => <div className="show-more-pane">
    {props.children}
    <style jsx>{`
        .show-more-pane {
            margin: 2rem 0 1rem;
            text-align: center;
        }
    `}</style>
</div>;

// show more
export default (props) =>
    <a onClick={!!props.finished? null:props.clickHandler} className={`btn sleek-btn ${!!props.finished? 'dead':''}`}>
        {!!props.finished? "Yup, that's all!" : (props.label || 'Show more')}
    </a>