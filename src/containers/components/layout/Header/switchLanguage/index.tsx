import {useAppSelector} from 'boot/configureStore';
import {TypeUser} from 'constants/system';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {fetchChangeTypeUser} from 'routers/redux/thunks';
import {formatter2} from 'utils/formatter';
import {LangType, State} from './propState';
import './styled.css';
import englishimg from 'assets/images/english.png';
import {useTranslation} from 'react-i18next';

const SwitchLanguageComponent = () => {
  const {i18n} = useTranslation();

  const [state, setState] = useState<State>({
    currentLang: {id: 'en', name: 'English'},
    listLang: [{id: 'vi', name: 'Tiếng Việt'}, {id: 'fre', name: 'French'}, {id: 'china', name: '简体中文'}],
  });

  useEffect(()=>{
    _getInforLangs(i18n.language);
  }, []);

  const _changeLanguage = (lang: string) => () => {
    _getInforLangs(lang);
    i18n.changeLanguage(lang);
  };

  const _getInforLangs = (lang: string)=>{
    let currentLang = {id: 'en', name: 'English'};
    const listLang: LangType[] = new Array();
    switch (lang) {
      case 'vi':
        currentLang = {id: 'vi', name: 'Tiếng Việt'};
        listLang.push({id: 'en', name: 'English'}, {id: 'fre', name: 'French'}, {id: 'china', name: '简体中文'});
        break;
      case 'fre':
        currentLang = {id: 'fre', name: 'French'};
        listLang.push({id: 'en', name: 'English'}, {id: 'vi', name: 'Tiếng Việt'}, {id: 'china', name: '简体中文'});
        break;
      case 'china':
        currentLang = {id: 'china', name: '简体中文'};
        listLang.push({id: 'en', name: 'English'}, {id: 'vi', name: 'Tiếng Việt'}, {id: 'fre', name: 'French'});
        break;
      default:
        currentLang = {id: 'en', name: 'English'};
        listLang.push({id: 'vi', name: 'Tiếng Việt'}, {id: 'fre', name: 'French'}, {id: 'china', name: '简体中文'});
        break;
    }
    setState({currentLang, listLang});
  }

  return (
    <Dropdown style={{marginTop: '-27px'}}>
      <Dropdown.Toggle variant="link" className="dropdown-toggle dropdown-toggle-lang" style={{marginTop: '-27px'}}>
        <img src={englishimg} />
        <p className="text-light mb-0">{state.currentLang.name}</p>
      </Dropdown.Toggle>

      <Dropdown.Menu className="border-lang">
        {state.listLang.length > 0 &&
          state.listLang.map((item: LangType, index: number) => (
            <Dropdown.Item key={`drop-down-lang-${index}`} className="dropdown-item" onClick={_changeLanguage(item.id)}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={englishimg} className="d-inline-block mr-3" />
                <span className="text-light d-inline-block">{item.name}</span>
              </div>
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default React.memo(SwitchLanguageComponent);
