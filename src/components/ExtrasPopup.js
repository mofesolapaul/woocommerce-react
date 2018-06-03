import React from 'react';
import css from '../../styles/vars';
import {View} from './';
import { uid } from '../constants';
import {bindToThis, extrasList, getExtrasTotal} from '../constants';

class ExtrasPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dressing: '',
            extras: {},
        };

        // bind
        bindToThis(this, 'actionHandler');
        bindToThis(this, 'setDressing');
        bindToThis(this, 'setExtras');
        bindToThis(this, 'updateExtras');
        bindToThis(this, 'dismiss');
        bindToThis(this, 'isExtraSelected');
        bindToThis(this, 'hasExtras');
        bindToThis(this, 'hasDressing');
    }

    actionHandler(type, data) {
        switch (type) {
            default:
                this.props.actionHandler && this.props.actionHandler(type, this.props.product);
                break;
        }
    }

    componentWillMount() {
        if (this.hasExtras()) this.setState({extras: this.props.product.extras.extras});
        if (this.hasDressing()) this.setState({dressing: this.props.product.extras.dressing});
    }

    setDressing(dressing) {
        this.setState({dressing});
    }

    setExtras(data) {
        const _xtras = {...this.state.extras};
        if (!data.checked) delete _xtras[data.label];
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
        this.dismiss();
    }

    dismiss() {
        this.setState({dressing: '', extras: {}});
        this.actionHandler("extras.dismiss");
    }

    isExtraSelected(name) {
        return !!this.state.extras[name];
    }

    /**
     * Determine if the product has extras added already
     */
    hasExtras() {
        const {product} = this.props;
        return !!product.extras && !!Object.keys(product.extras.extras).length;
    }

    /**
     * Determine if the product has dressing added already
     */
    hasDressing() {
        const {product} = this.props;
        return !!product.extras && !!product.extras.dressing;
    }

    render() {
        const {data, actionHandler, product} = this.props;
        return <View>
            <div className="extras-curtain curtain" id="ec--" onClick={e => e.target.id == 'ec--' && actionHandler('extras-popup.dismiss')}>
                <div className="extras-modal modal">
                    <h3>
                        <span className="">Extras ({data.cat})</span>
                        <a className="close" onClick={this.dismiss}>{`\u00d7`}</a>
                    </h3>
                    {!!product.extras && <div className="well">
                        Your selection (N{getExtrasTotal(this.state.extras)}):
                        &nbsp;{extrasList(this.state.extras, this.state.dressing)}
                    </div>}
                    <form>
                        {/* For extras with dressing (dressing is free) */}
                        {!!data.info && <div className="group padded full-width">
                            <label className="label">{data.info}</label>
                            <select
                                name="extras_dressing"
                                data-index="0" id="extras_dressing"
                                defaultValue={this.state.dressing || data.dressing[0]}
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
                                        defaultChecked={this.isExtraSelected(x.name)}
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
                            <a className="btn sleek-btn" onClick={e => this.updateExtras({category: data.cat})}>{this.hasExtras()? 'Save':'Add'} extras</a>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
            .title {
                color: ${css.colors.primary}
            }
            .padded {
                padding-top: 1rem;
                padding-top: 1rem;
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