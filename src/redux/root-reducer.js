import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persisConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user:userReducer,
    cart:cartReducer
})

export default persistReducer(persisConfig, rootReducer);