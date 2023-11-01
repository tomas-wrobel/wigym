import {type FunctionComponent, useEffect, useState} from "react";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList} from '@ionic/react';
import {API} from "../api";
import {useLoggedIn} from "../api/auth";
import Login from "./Login";

type Message = {
    Text: string;
    Title: string;
    Sender: {
        Name: string;
    };
    SentDate: string;
};

const Noticeboard: FunctionComponent = () => {
    const isLoggedIn = useLoggedIn();
    const [messages, setMessages] = useState<Message[]>();

    useEffect(() => {
        if (isLoggedIn) {
            API.fetch("komens/messages/noticeboard", "POST").then(data => {
                setMessages(data.Messages);
            });    
        } else {
            setMessages(undefined);
        }
    }, [isLoggedIn]);

    return (
        <>
            {isLoggedIn ? messages?.map(({SentDate, Sender, Text, Title}, i) => (
                <IonCard key={i}>
                    <IonCardHeader>
                        <IonCardTitle>{Title}</IonCardTitle>
                        <IonCardSubtitle>{new Date(SentDate).toLocaleDateString("cs")} | {Sender.Name}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <div dangerouslySetInnerHTML={{__html: Text}} />
                    </IonCardContent>
                </IonCard>
            )) : <Login redirect="/feed" />}
        </>
    );
};

export default Noticeboard;