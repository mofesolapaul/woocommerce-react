import css from '../../styles/vars';
import {View} from './';
import { uid } from '../constants';

export default ({actionHandler, data}) => <View>
    <div className="extras-curtain">
        <div className="extras-modal">
            <h3>
                <span className="">Extras ({data.cat})</span>
                <a className="close" onClick={() => actionHandler(`extras.dismiss`)}>{`\u00d7`}</a>
            </h3>
            <form>
                <div className="group padded full-width">
                    <label className="label">{data.info}</label>
                    <select
                        name="extras_dressing"
                        data-index="0" id="extras_dressing"
                        defaultValue={data.dressing[0]}
                        className="field"
                        onChange={e => this.actionHandler('extras.dressing', e.target)}>
                        {data.dressing.map(x => <option value={x}>{x}</option>)}
                    </select>
                </div>
                <div className="group padded full-width">
                    <label className="label">{data.extra_info}</label>
                    <div>
                        {data.extras.map(x => <div className="group" key={btoa(x.name)}>
                            <input id={btoa(x.name)} type="checkbox" value={x.name} name="extras[]" />
                            <label for={btoa(x.name)}>{`${x.name} (N${x.price})`}</label>
                        </div>)}
                    </div>
                </div>
                <div className="group full-width text-center">
                    <a className="btn sleek-btn">Add extras</a>
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
    `}</style>
</View>