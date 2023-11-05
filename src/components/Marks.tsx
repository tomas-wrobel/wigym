import {type FunctionComponent, useEffect, useState} from "react";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList} from '@ionic/react';
import {API} from "../api";

type Subject = {
    Marks: {
        Caption: string;
        MarkText: string;
        Weight: number;
    }[];
    AverageText: string;
    Subject: {
        Name: string;
    };
};

const Marks: FunctionComponent = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        API.fetch("marks").then(data => {
            setSubjects(data.Subjects);
        });
    });

    return (
        <>
            {subjects.map(({Subject, Marks, AverageText}) => (
                <IonCard key={Subject.Name}>
                    <IonCardHeader>
                        <IonCardTitle>{Subject.Name}</IonCardTitle>
                        <IonCardSubtitle>Průměr: {AverageText}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonList>
                            {Marks.map((mark, i) => (
                                <IonItem key={i}>
                                    <IonLabel>
                                        <h2>{mark.Caption}</h2>
                                        <p>Váha: {mark.Weight}</p>
                                    </IonLabel>
                                    <IonLabel style={{position: "absolute", right: "1em"}}>
                                        {mark.MarkText}
                                    </IonLabel>
                                </IonItem>
                            ))}
                        </IonList>
                    </IonCardContent>
                </IonCard>
            ))}
        </>
    );
};

export default Marks;