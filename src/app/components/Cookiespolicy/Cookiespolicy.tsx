import React from 'react';
import './Cookiespolicy.scss';
import { MouseEventHandler } from 'react';

interface CookiePolicyProps {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseOver: () => void;
    modalVisible: MouseEventHandler<HTMLButtonElement>;
}

const Cookiespolicy: React.FC<CookiePolicyProps> = ({onMouseEnter, onMouseLeave, onMouseOver, modalVisible}) => {
    return (
        <div className="cookiespolicy-container">
            <div 
                className="cookies-policy"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
            >
                <h2>Wir schätzen Ihre Privatsphäre</h2>
                <p>Diese Website verwendet Cookies, um Ihre Nutzung der Website analysieren und verbessern zu können, ohne dass eine Identifikation der Besucher der Website möglich ist. Zudem werden Inhalte von Drittanbietern eingebunden, um Ihnen Inhalte, Karten, Videos und Social-Media-Sharing-Funktionen bereitzustellen. Dabei erfolgen Datenflüsse zu den Drittanbietern. Diese können ihren Sitz in Ländern haben, die kein der EU vergleichbares Datenschutzniveau aufweisen. Diese Anbieter können ebenfalls Cookies setzen, sofern Sie „Zustimmen“ anklicken. Sofern Sie dies nicht wünschen, klicken Sie bitte auf „Ablehnen“. Wenn Sie ablehnen, wird Ihr Website-Besuch nicht analysiert und die Inhalte der Drittanbieter werden nicht angezeigt. Sie können die Inhalte der Drittanbieter auch später einzeln freischalten. Über das auf der Website links unten eingeblendete Icon haben Sie jederzeit die Möglichkeit, Ihre Einwilligung zu widerrufen oder der Verwendung von Cookies zur Analyse zu widersprechen. Weitere Informationen finden Sie in unserer Datenschutzerklärung.</p>
                <div className='buttons'>
                    <button className='button decline'onClick={modalVisible}>Ablehnen</button>
                    <button className='button accept' onClick={modalVisible}>Zustimmen</button>
                </div>
            </div>
        </div>
    );
};
export default Cookiespolicy;