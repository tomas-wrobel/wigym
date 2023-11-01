import {type FunctionComponent, useEffect, useState} from 'react';

const Media: FunctionComponent<{id: number}> = ({id}) => {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        id && fetch(`https://wigym.cz/wp-json/wp/v2/media/${id}`)
            .then((response) => response.json())
            .then((data) => data.guid && setSrc(data.guid.rendered));
    }, [id]);

    if (!src) {
        return null;
    }

    return <img src={src} alt="" />;
};

export default Media;