import type {FunctionComponent} from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';

const NotFound: FunctionComponent = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Chyba!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Chyba!</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <p className='ion-padding'>Stránka nenalezena.</p>
            </IonContent>
        </IonPage>
    );
};

export default NotFound;
