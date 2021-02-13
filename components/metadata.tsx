import Head from "next/head";

interface MetaDataProps{
    title: string,
}

const MetaData = ({title}: MetaDataProps) => {
    return(
        <Head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="description" content="RecycleIT - An Easy Way To Recycling"/>
            <meta name="author" content="Deyby Rodriguez"/>
            <meta name="robots" content="index, follow"/>
            <meta property="og:title" content="RecycleIT"/>
            <meta property="og:type" content="website"/>
            <meta property="og:description" content="RecycleIT - An Easy Way To Recycling"/>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossOrigin="anonymous"
            />
            <title>{title}</title>
        </Head>
    );
};

export default MetaData;