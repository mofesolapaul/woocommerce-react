// show more
export default ({clickHandler, finished}) => <div className="show-more-pane">
    <a onClick={finished? null:clickHandler} className={`btn sleek-btn ${finished? 'dead':''}`}>
        {!finished? 'Show more':"Yup, that's all!"}
    </a>
    <style jsx>{`
        .show-more-pane {
            margin-top: 2rem;
            text-align: center;
        }
    `}</style>
</div>