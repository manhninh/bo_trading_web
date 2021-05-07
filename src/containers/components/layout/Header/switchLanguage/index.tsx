import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import {LangType, State} from './propState';
import './styled.css';
import englishimg from 'assets/images/english.png';
import chinaimg from 'assets/images/china.png';
import vietnamimg from 'assets/images/vietnam.png';
import {useTranslation} from 'react-i18next';

const SwitchLanguageComponent = () => {
  const {i18n} = useTranslation();

  const [state, setState] = useState<State>({
    currentLang: {id: 'en', name: 'English', icon: englishimg},
    listLang: [
      {id: 'vi', name: 'Tiếng Việt', icon: vietnamimg},
      {id: 'china', name: '简体中文', icon: chinaimg},
    ],
  });

  useEffect(() => {
    _getInforLangs(i18n.language);
  }, []);

  const _changeLanguage = (lang: string) => () => {
    _getInforLangs(lang);
    i18n.changeLanguage(lang);
  };

  const _getInforLangs = (lang: string) => {
    let currentLang = {id: 'en', name: 'English', icon: englishimg};
    const listLang: LangType[] = new Array();
    switch (lang) {
      case 'vi':
        currentLang = {id: 'vi', name: 'Tiếng Việt', icon: vietnamimg};
        listLang.push({id: 'en', name: 'English', icon: englishimg}, {id: 'china', name: '简体中文', icon: chinaimg});
        break;
      case 'china':
        currentLang = {id: 'china', name: '简体中文', icon: chinaimg};
        listLang.push({id: 'en', name: 'English', icon: englishimg}, {id: 'vi', name: 'Tiếng Việt', icon: vietnamimg});
        break;
      default:
        currentLang = {id: 'en', name: 'English', icon: englishimg};
        listLang.push(
          {id: 'vi', name: 'Tiếng Việt', icon: vietnamimg},
          {id: 'china', name: '简体中文', icon: chinaimg},
        );
        break;
    }
    setState({currentLang, listLang});
  };

  return (
    <Dropdown style={{marginTop: '-27px'}}>
      <Dropdown.Toggle variant="link" className="dropdown-toggle dropdown-toggle-lang" style={{marginTop: '-27px'}}>
        <img src={state.currentLang.icon} />
        <p className="text-light mb-0">{state.currentLang.name}</p>
      </Dropdown.Toggle>
      <Dropdown.Menu className="border-lang">
        {state.listLang.length > 0 &&
          state.listLang.map((item: LangType, index: number) => (
            <Dropdown.Item key={`drop-down-lang-${index}`} className="dropdown-item" onClick={_changeLanguage(item.id)}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={item.icon} className="d-inline-block mr-3" />
                <span className="text-light d-inline-block">{item.name}</span>
              </div>
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default React.memo(SwitchLanguageComponent);
