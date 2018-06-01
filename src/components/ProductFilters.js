import {View} from '.';
import {CATEGORIES} from '../constants';

export default props => <View>
    <div className="ProductFilters">
        <div className="pf--group">
            Showing
            <select className="pr--list">
                <option value="">Everything</option>
            </select>
        </div>
    </div>

    {/* style */}
    <style jsx>{`
        .ProductFilters {
            text-align: center;
            margin-bottom: 1rem;
        }
        .pf--group {
            text-transform: uppercase;
        }
    `}</style>
</View>