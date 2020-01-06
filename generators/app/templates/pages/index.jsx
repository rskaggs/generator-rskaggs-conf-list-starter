import fetch from 'isomorphic-unfetch';
import moment from 'moment';

const conferenceFeed = 'http://localhost:3000/api/conf';

const HomePage = ({confList = [], poweredBy = ''}) => {
    
    return (
        <div>

            <h1>Front End Conference List 2020</h1>
            
            <ol style={{textAlign: 'left'}}>
                {confList.map((conf, i) => (
                    <li key={i}>
                        <h2>{conf.title}</h2>
                        <p>When {moment(conf.date, "ddd MMM DD YYYY kk:mm:ss [GMT]ZZ [(]zz[)]").format('MM-DD-YYYY [at] h:mm a')}</p>
                        <p>Where: {conf.location}</p>
                        <p>
                            <a href={conf.url}>Learn More</a>
                        </p>
                    </li>
                ))}
            </ol>

            <p>
                This list was created by a JSON Feed hosted at &nbsp;
                <a href={poweredBy}>{poweredBy}</a> 
            </p>

        </div>
    )
}

HomePage.getInitialProps = async () => {

    const res = await fetch(conferenceFeed);
    const data = await res.json();

    return {
        confList: data.conferences,
        poweredBy: data.source
    };
};

export default HomePage;