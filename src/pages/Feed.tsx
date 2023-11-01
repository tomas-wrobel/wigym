import {type FunctionComponent, useState} from 'react';
import {IonContent, IonHeader, IonPage, IonSegment, IonSegmentButton, IonToolbar} from '@ionic/react';
import Web from '../components/Web';
import Noticeboard from '../components/Noticeboard';

const Feed: FunctionComponent = () => {
    const [tab, setTab] = useState("web");

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonSegment value={tab} onIonChange={e => setTab(e.detail.value as string)}>
                        <IonSegmentButton value="web">
                            Web školy
                        </IonSegmentButton>
                        <IonSegmentButton value="noticeboard">
                            Nástěnka
                        </IonSegmentButton>
                    </IonSegment>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {tab === "web" ? <Web /> : <Noticeboard />}
            </IonContent>
        </IonPage>
    );
};

export default Feed;
