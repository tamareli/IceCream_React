import React from 'react';
import classes from '../css/AboutUs.module.css'
import BigLogo from '../components/Logo/BigLogo'
import { Link } from 'react-router-dom'
import Layout from '../hoc/Layout/Layout';

function AboutUs() {
  return (
    <Layout>
      <div className="col-md-3"></div>
      <div className={['col-md-6',classes.Container].join(' ')}>
        <h2>קצת עלינו</h2>
        <hr></hr>
        <p className={classes.Content}>
        רק חומרי הגלם המשובחים ביותר מקבלים אצלנו כניסה חופשית למטבח.<br /> מייצבים? מי גבינה? שומן צמחי? לא תודה! לא אצלנו.<br /> הג'לטו שלנו מבוסס על טהרת השמנת, החלב הטרי ומגוון חומרי גלם מיובאים היישר מאיטליה.<br /> את הטעמים האגדיים שלנו אנחנו יוצרים עם התוספות הכי הכי,<br /> כמו אגוזי לוז מפיאמונטה, פיסטוקים מעולים ,<br /> טרפלס שאנחנו מייצרים בעצמנו ושוקולד 100% אמיתי.<br />  בסורבה אנחנו עושים שימוש בפירות טריים או קפואים מאיכות מעולה ומשתמשים במים מינרליים איכותיים.<br /> היוגורט שלנו הוא יוגורט טבעי ואפילו על הרטבים לקישוט אנחנו לא מתפשרים במילימטר. <br />הקמנו את האתר הזה כדי שתוכלו לקבל את כל הטוב הזה.<br /><span className={classes.Span}>אז למה אתם מחכים? האתר שלנו לרשותכם. תהנו!</span>
        </p>
        <Link to='/'>
          <BigLogo />
        </Link>
      </div>
      <div className="col-md-3"></div>
    </Layout>
  );
}

export default AboutUs;
