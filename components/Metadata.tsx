import Head from "next/head";

interface MetaDataProps {
    title: string,
}

const MetaData = ({title}: MetaDataProps) => (
    <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="description" content="RecycleIT - Easing The Recycling Process"/>
        <meta name="author" content="Deyby Rodriguez"/>
        <meta name="robots" content="index, follow"/>
        <meta property="og:title" content="RecycleIT"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://recycleit.deybyr647.com"/>
        <meta property="og:image" content="https://recycleit.deybyr647.com/opengraph.png"/>
        <meta property="og:description" content="RecycleIT - An Easy Way To Recycling"/>
        <title>{title}</title>
    </Head>
);

export default MetaData;
