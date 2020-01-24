import React from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import {Route} from 'react-router-dom';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.util';

import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-a1857/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections))

        collectionRef.get().then(snapshot=> {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props)=><CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} />
                <Route path={`${match.path}/:collectionId`} render={(props)=><CollectionsPageWithSpinner isLoading={loading} {...props}/>}/>s
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);