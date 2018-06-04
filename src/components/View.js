// Stateless wrapper for spitting out views

export default props => props.children
export const Hidden = props => <div style={{display: 'none'}}>{props.children}</div>