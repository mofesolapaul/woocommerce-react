import React from 'react';
import css from '../../styles/vars';
import {View} from './';
import { uid } from '../constants';
import {bindToThis} from '../constants';

class ExtrasPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dressing: '',
            extras: {}
        };

        // bind
        bindToThis(this, 'actionHandler');
        bindToThis(this, 'setDressing');
        bindToThis(this, 'setExtras');
        bindToThis(this, 'updateExtras');
        bindToThis(this, 'dismiss');
        bindToThis(this, 'extrasTotal');
        bindToThis(this, 'extrasList');
    }

    actionHandler(type, data) {
        switch (type) {
            default:
                this.props.actionHandler && this.props.actionHandler(type, this.props.product);
                break;
        }
    }

    setDressing(dressing) {
        this.setState({dressing});
    }

    setExtras(data) {
        const _xtras = {...this.state.extras};
        if (!!_xtras[data.label]) delete _xtras[data.label];
        else _xtras[data.label] = data.xtra;
        this.setState({extras: _xtras});
    }

    updateExtras(data) {
        // build payload
        this.props.product.extras = {
            category: data.category,
            dressing: this.state.dressing,
            extras: this.state.extras
        }
        // pass it up, cos only containers should interact with the store directly
        this.actionHandler("extras.update", this.props.product);
    }

    dismiss() {
        this.setState({dressing: '', extras: {}});
        this.actionHandler("extras.dismiss");
    }

    extrasTotal() {
        const {product} = this.props;
        const x = product.extras.extras;
        let sum = 0;
        Object.keys(x).forEach(function (k) {
            sum += x[k].price;
        });
        return sum;
    }

    extrasList() {
        const {product} = this.props;
        const dressing = (this.state.dressing || product.extras.dressing || '');
        const extras = !!Object.keys(this.state.extras).length? this.state.extras : product.extras.extras;
        return (dressing? dressing+', ':'') + Object.keys(extras).join(', ');
    }

    render() {
        const {data, actionHandler, product} = this.props;
        return <View>
            <div className="extras-curtain">
                <div className="extras-modal">
                    <h3>
                        <span className="">Extras ({data.cat})</span>
                        <a className="close" onClick={this.dismiss}>{`\u00d7`}</a>
                    </h3>
                    {!!product.extras && <div className="well">
                        <h4 className="ttl">Your selection (N{this.extrasTotal()}):</h4>
                        &nbsp;{this.extrasList()}
                    </div>}
                    <form>
                        {/* For extras with dressing (dressing is free) */}
                        {!!data.info && <div className="group padded full-width">
                            <label className="label">{data.info}</label>
                            <select
                                name="extras_dressing"
                                data-index="0" id="extras_dressing"
                                defaultValue={data.dressing[0]}
                                className="field"
                                onChange={e => this.setDressing(e.target.value)}>
                                {data.dressing.map((x,i) => <option key={i} value={x}>{x}</option>)}
                            </select>
                        </div>}
                        <div className="group padded full-width">
                            <label className="label">{data.extra_info}</label>
                            <div>
                                {data.extras.map(x => <div className={`group ${x.long && 'full-width'}`} key={btoa(x.name)}>
                                    <input id={btoa(x.name)} type="checkbox" value={x.name} name="extras[]"
                                        onChange={e => this.setExtras(
                                            {
                                                checked: e.target.checked,
                                                xtra: x,
                                                label: x.name,
                                            }
                                        )} />
                                    <label htmlFor={btoa(x.name)}>{`${x.name} (N${x.price})`}</label>
                                </div>)}
                            </div>
                        </div>
                        <div className="group full-width text-center">
                            <a className="btn sleek-btn" onClick={e => this.updateExtras({category: data.cat})}>Add extras</a>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
            .title {
                color: ${css.colors.fallleaf}
            }
            .padded {
                padding-top: 1rem;
                padding-top: 1rem;
            }
            .extras-curtain {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255,255,255,.3);
                z-index: 1000;
            }
            .extras-modal {
                background: ${css.colors.desertbone};
                position: absolute;
                overflow-y: auto;
                width: 90%;
                max-width: 360px;
                margin: auto;
                left: 0;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                padding: 1rem;
                border-radius: 4px;
                filter: drop-shadow(0px 4px 6px rgba(0,0,0,.25));
            }
            .well {
                padding: .5rem;
                background: rgba(0,0,0,.1);
                border-radius: 4px;
            }
            .ttl {
                margin: 0;
                display: inline-block;
            }
            `}</style>
        </View>
    }
}

export default ExtrasPopup;