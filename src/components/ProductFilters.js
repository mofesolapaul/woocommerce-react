import {View} from '.';
import {CATEGORIES} from '../constants';
import css from '../../styles/vars';

export default ({visible}) => !!visible && <View>
    <div className="ProductFilters">
        <div className="pf--group">
            Showing
            <select className="pf--list">
                <option value="">Everything</option>
                {CATEGORIES.map((c,k) => <option key={k} value={c}>{c}</option>)}
            </select>
        </div>
    </div>

    {/* style */}
    <style jsx>{`
        .ProductFilters {
            text-align: center;
            margin-bottom: 1rem;
        }
        .pf--group, .pf--list {
            text-transform: uppercase;
        }
        .pf--list {
            -webkit-appearance: button;
            margin: 0 .4rem;
            position: relative;
            padding: 4px 1rem;
            font-weight: bold;
            cursor: pointer;
        }
        .pf--list::after {
            content: "\u2304";
            position: absolute;
            right: 2px;
            display: block;
        }
    `}</style>
</View>