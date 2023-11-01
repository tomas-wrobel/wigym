import {type FunctionComponent, useEffect, useState, useRef, useCallback} from 'react';
import type {IonInfiniteScrollCustomEvent} from '@ionic/core';
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import Media from './Media';

export type Post = {
    id: number;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    guid: {
        rendered: string;
    };
    date: string;
    featured_media: number;
};

const Web: FunctionComponent = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const page = useRef(1);

    const generate = useCallback(
        async (e?: IonInfiniteScrollCustomEvent<void>) => {
            const response = await fetch(`https://wigym.cz/wp-json/wp/v2/posts?page=${page.current++}&per_page=4`);

            if (!response.ok) {
                return;
            }

            const data = await response.json();
            setPosts(posts => [...posts, ...data]);
            e?.target.complete();
        },
        []
    );

    useEffect(() => {generate();}, [generate]);

    return (
        <>
            {posts.map((post) => (
                <IonCard key={post.id}>
                    <Media id={post.featured_media} />
                    <IonCardHeader>
                        <IonCardTitle>
                            <span dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                        </IonCardTitle>
                        <IonCardSubtitle>{new Date(post.date).toLocaleDateString("cs")}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
                    </IonCardContent>
                    <IonButton href={post.guid.rendered} fill='clear'>
                        přečíst na wigym.cz
                    </IonButton>
                </IonCard>
            ))}
            <IonInfiniteScroll onIonInfinite={generate}>
                <IonInfiniteScrollContent />
            </IonInfiniteScroll>
        </>
    );
};

export default Web;
